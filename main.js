// /js/main.js
import {
  auth,
  signInWithPopup,
  googleProvider,
  facebookProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from './firebase.js';

// Email Login Handler
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html";
    } catch (error) {
      showError(error.message);
    }
  });
}

// Signup Handler
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html";
    } catch (error) {
      showError(error.message);
    }
  });
}

// Social Login
document.querySelectorAll(".social-btn").forEach(btn => {
  btn.addEventListener("click", async () => {
    const provider = btn.dataset.provider === "google" ? googleProvider : facebookProvider;
    try {
      await signInWithPopup(auth, provider);
      window.location.href = "dashboard.html";
    } catch (err) {
      showError(err.message);
    }
  });
});

// Auto-Redirect Protection
const protectedPages = ["dashboard.html"];
if (protectedPages.includes(window.location.pathname.split("/").pop())) {
  onAuthStateChanged(auth, (user) => {
    if (!user) window.location.href = "login.html";
  });
}

// Helpers
function showError(message) {
  const errBox = document.getElementById("errorMessage");
  if (errBox) {
    errBox.innerText = message;
    errBox.style.display = 'block';
  }
        }
