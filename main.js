function showSection(sectionId) {
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
}

// Navigation Events
document.getElementById('homeBtn').addEventListener('click', () => showSection('home'));
document.getElementById('profileBtn').addEventListener('click', () => showSection('profile'));
document.getElementById('messagesBtn').addEventListener('click', () => showSection('messages'));
document.getElementById('battleBtn').addEventListener('click', () => showSection('battle'));
document.getElementById('leaderboardBtn').addEventListener('click', () => showSection('leaderboard'));
document.getElementById('walletBtn').addEventListener('click', () => showSection('wallet'));
document.getElementById('settingsBtn').addEventListener('click', () => showSection('settings'));

// Logout (placeholder action)
document.getElementById('logoutBtn').addEventListener('click', () => {
  alert('Logged out successfully!');
});
