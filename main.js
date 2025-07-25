// Function to show a section
function showSection(sectionId) {
  document.querySelectorAll('.page-section').forEach(sec => {
    sec.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
}

// Event listeners for bottom nav
document.getElementById('homeBtn').addEventListener('click', () => showSection('home'));
document.getElementById('battleBtn').addEventListener('click', () => showSection('battle'));
document.getElementById('leaderboardBtn').addEventListener('click', () => showSection('leaderboard'));
document.getElementById('walletBtn').addEventListener('click', () => showSection('wallet'));

// Event listeners for top icons
document.getElementById('messagesBtn').addEventListener('click', () => showSection('messages'));
document.getElementById('settingsBtn').addEventListener('click', () => showSection('settings'));
document.getElementById('logoutBtn').addEventListener('click', () => {
  window.location.href = '../index.html';
});
