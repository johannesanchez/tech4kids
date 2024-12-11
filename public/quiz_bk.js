import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
// import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

import { logOut, protectRoute } from "./auth.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const db = getFirestore();
const auth = getAuth();

// // Firebase Auth Setup
// const logoutBtn = document.getElementById("logout-btn");
// const authStatus = document.getElementById("auth-status");

document.getElementById("quizForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
        alert("Please login to submit the quiz.");
        return;
    }

    const answers = {
        q1: document.getElementById("q1").value,
        userId: user.uid,
        submittedAt: new Date(),
    };

    try {
        await addDoc(collection(db, "quizAnswers"), answers);
        alert("Quiz submitted!");
    } catch (error) {
        console.error("Error submitting quiz:", error);
    }
});



document.addEventListener("DOMContentLoaded", () => {
    protectRoute(); // Protect the page
  
    const auth = getAuth();
    const authStatus = document.getElementById("auth-status");
    const logoutBtn = document.getElementById("logout-btn");
  
    // Set up logout button
    logoutBtn.addEventListener("click", logOut);
  
    // // Show the authenticated user's name
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     authStatus.textContent = `Logged in as ${user.displayName}`;
    //   }
    // });
  });
