function showSection(sectionId) {
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');

  // Load external leaderboard content when Leaderboard is opened
  if (sectionId === 'leaderboard') {
    loadLeaderboard();
  }
}

function loadLeaderboard() {
  fetch('leaderboard.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('leaderboardContent').innerHTML = data;
    })
    .catch(error => {
      console.error('Error loading leaderboard:', error);
      document.getElementById('leaderboardContent').innerHTML = '<p>Failed to load leaderboard.</p>';
    });
}

// Event Listeners
document.getElementById('homeBtn').addEventListener('click', () => showSection('home'));
document.getElementById('profileBtn').addEventListener('click', () => showSection('profile'));
document.getElementById('messagesBtn').addEventListener('click', () => showSection('messages'));
document.getElementById('battleBtn').addEventListener('click', () => showSection('battle'));
document.getElementById('leaderboardBtn').addEventListener('click', () => showSection('leaderboard'));
document.getElementById('walletBtn').addEventListener('click', () => showSection('wallet'));
document.getElementById('settingsBtn').addEventListener('click', () => showSection('settings'));

document.getElementById('logoutBtn').addEventListener('click', () => {
  alert('Logged out successfully!');
});
