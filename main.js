// Get all navigation buttons
const homeBtn = document.getElementById("homeBtn");
const messagesBtn = document.getElementById("messagesBtn");
const battleBtn = document.getElementById("battleBtn");
const leaderboardBtn = document.getElementById("leaderboardBtn");
const walletBtn = document.getElementById("walletBtn");
const settingsBtn = document.getElementById("settingsBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Get all page sections
const sections = document.querySelectorAll(".page-section");

// Function to show a section and hide others
function showSection(sectionId) {
  sections.forEach(section => {
    section.classList.remove("active");
  });
  document.getElementById(sectionId).classList.add("active");
}

// Event Listeners
homeBtn.addEventListener("click", () => showSection("home"));
messagesBtn.addEventListener("click", () => showSection("messages"));
battleBtn.addEventListener("click", () => showSection("battle"));
leaderboardBtn.addEventListener("click", () => showSection("leaderboard"));
walletBtn.addEventListener("click", () => showSection("wallet"));
settingsBtn.addEventListener("click", () => showSection("settings"));
logoutBtn.addEventListener("click", () => {
  alert("You have been logged out.");
  // Add redirect if needed: window.location.href = "index.html";
});

// Fade bottom bar on scroll
const bottomBar = document.querySelector(".bottom-bar");
let fadeTimeout;

function showBottomBar() {
  bottomBar.style.opacity = "1";
  clearTimeout(fadeTimeout);
  fadeTimeout = setTimeout(() => {
    bottomBar.style.opacity = "0.3";
  }, 2000);
}

// Initial fade
bottomBar.style.opacity = "0.3";
document.addEventListener("scroll", showBottomBar);
document.addEventListener("click", showBottomBar);
