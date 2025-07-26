// Function to show the correct section
function showSection(sectionId) {
  const sections = document.querySelectorAll('.page-section');
  sections.forEach(sec => sec.classList.remove('active'));

  const target = document.getElementById(sectionId);
  if (target) target.classList.add('active');
}

// Bottom navigation buttons
document.getElementById('homeBtn').addEventListener('click', () => showSection('home'));
document.getElementById('battleBtn').addEventListener('click', () => showSection('battle'));
document.getElementById('leaderboardBtn').addEventListener('click', () => showSection('leaderboard'));
document.getElementById('walletBtn').addEventListener('click', () => showSection('wallet'));
document.getElementById('settingsBtn').addEventListener('click', () => showSection('settings'));

// Top bar buttons
document.getElementById('messagesBtn').addEventListener('click', () => showSection('messages'));
document.getElementById('profileBtn').addEventListener('click', () => showSection('profile'));
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  alert('You have logged out!');
  // Add actual logout functionality here
});

// Faded bottom bar behavior
const bottomBar = document.querySelector('.bottom-bar');
let fadeTimeout;

function fadeBar() {
  bottomBar.style.opacity = 0.3;
}

function showBar() {
  bottomBar.style.opacity = 1;
  clearTimeout(fadeTimeout);
  fadeTimeout = setTimeout(fadeBar, 2500);
}

document.addEventListener('scroll', showBar);
document.addEventListener('mousemove', showBar);
document.addEventListener('touchstart', showBar);

// Start faded
fadeBar();
