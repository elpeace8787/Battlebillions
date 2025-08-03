// main.js
import { auth, provider, signInWithPopup, onAuthStateChanged, signOut } from './firebase.js';

// LOGIN BUTTON
const googleBtn = document.getElementById("googleLoginBtn");
if (googleBtn) {
  googleBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Logged in as:", user.displayName);
      window.location.href = "home.html";  // or "dashboard.html"
    } catch (error) {
      console.error("Login error:", error.message);
    }
  });
}

// LOGOUT HANDLER (for dashboard, settings, etc.)
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
}

// REDIRECT BLOCKED PAGES IF NOT LOGGED IN
const protectedPages = ["home.html", "dashboard.html", "battle.html"];
if (protectedPages.includes(window.location.pathname.split("/").pop())) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "login.html";
    }
  });
}
