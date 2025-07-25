// Function to show sections
function showSection(sectionId) {
  document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
}

// Event Listeners for Bottom Icons
document.getElementById('homeBtn').addEventListener('click', () => showSection('home'));
document.getElementById('battleBtn').addEventListener('click', () => showSection('battle'));
document.getElementById('leaderboardBtn').addEventListener('click', () => showSection('leaderboard'));
document.getElementById('walletBtn').addEventListener('click', () => showSection('wallet'));

// Event Listeners for Top Icons
document.getElementById('messagesBtn').addEventListener('click', () => showSection('messages'));
document.getElementById('settingsBtn').addEventListener('click', () => showSection('settings'));

// Logout Button
document.getElementById('logoutBtn').addEventListener('click', () => {
  alert('Logging out...');
  window.location.href = 'index.html';
});
