import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBp24YE8jcNTnwRkG7v6koJyELmEBwFFRg",
    authDomain: "tech4kids-9b9b2.firebaseapp.com",
    projectId: "tech4kids-9b9b2",
    storageBucket: "tech4kids-9b9b2.firebasestorage.app",
    messagingSenderId: "449324453437",
    appId: "1:449324453437:web:c5b3d7e09b16121d9ba454",
    measurementId: "G-PJ0C86ZVZP"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let isLoggingOut = false; // Flag to track logout state
const provider = new GoogleAuthProvider();


// Sign up or Log in with Google
export function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Successfully signed in
        alert(`Welcome, ${result.user.displayName}`);
        window.location.href = "home.html"; // Redirect to the home page
      })
      .catch((error) => {
        console.error("Sign-in error:", error);
        alert("Failed to sign in. Please try again.");
      });
  }


// Logout
export function logOut() {
    isLoggingOut = true; // Set the logout flag
    signOut(auth)
      .then(() => {
        // alert("You have been logged out.");
        window.location.href = "index.html"; // Redirect to the landing page
      })
      .catch((error) => {
        console.error("Logout error:", error);
        alert("Failed to log out. Please try again.");
      });
  }

// Protect Routes
export function protectRoute() {
    onAuthStateChanged(auth, (user) => {
      if (!user && !isLoggingOut) {
        alert("You need to log in to view this page.");
        window.location.href = "index.html"; // Redirect to login page
      }
    });
  }
