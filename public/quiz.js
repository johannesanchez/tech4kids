import { getFirestore, collection, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { logOut, protectRoute } from "./auth.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const db = getFirestore();
const auth = getAuth();

document.addEventListener("DOMContentLoaded", () => {
  // Protect the route
  protectRoute();

  const quizForm = document.getElementById("quizForm");
  const logoutBtn = document.getElementById("logout-btn");
  const redirectTarget = quizForm.getAttribute("data-redirect") || "home.html"; // Default redirect if not specified

  // Log out functionality
  logoutBtn.addEventListener("click", logOut);

  // Submit quiz
  quizForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get authenticated user details
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to submit a quiz!");
      return;
    }

    const username = user.displayName || "anonymous";
    const userId = user.uid;

    // Gather quiz data dynamically
    const formData = new FormData(quizForm); // Collect all form inputs
    const quizData = {};

    formData.forEach((value, key) => {
      // Handle multiple-choice questions (checkboxes)
      if (key.endsWith("[]")) {
        const cleanKey = key.slice(0, -2); // Remove "[]" from the name
        quizData[cleanKey] = quizData[cleanKey] || []; // Ensure it's an array
        quizData[cleanKey].push(value);
      } else {
        quizData[key] = value; // Handle single-choice or text input
      }
    });

    // Generate unique document ID
    const quizName = "quiz1"; // Replace with dynamic quiz name if applicable
    const timestamp = Date.now();
    const docId = `${username}-${quizName}-attempt-${timestamp}`;

    try {
      // Save to Firestore
      await setDoc(doc(collection(db, "quizAttempts"), docId), {
        quizData,
        submittedAt: serverTimestamp(),
        userId,
      });

      alert("Quiz submitted successfully!");
      window.location.href = redirectTarget;
      // quizForm.reset();
    } catch (error) {
      console.error("Error saving quiz data:", error);
      alert("Failed to submit quiz. Please try again.");
    }
  });
});
