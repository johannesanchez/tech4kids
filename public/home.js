import { logOut, protectRoute } from "./auth.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    protectRoute(); // Protect the page
  
    const auth = getAuth();
    const authStatus = document.getElementById("auth-status");
    const logoutBtn = document.getElementById("logout-btn");
  
    // Set up logout button
    logoutBtn.addEventListener("click", logOut);
  
    // Show the authenticated user's name
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authStatus.textContent = `${user.displayName}`;
      }
    });
  });
