// Show sections
function showSection(sectionId) {
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');

  // Load leaderboard content
  if (sectionId === 'leaderboard') {
    loadLeaderboard();
  }
}

// Load Leaderboard content dynamically
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

// Event Listeners for navigation
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

// Donation System
const donateButton = document.querySelector('#wallet .donate button');
if (donateButton) {
  donateButton.addEventListener('click', () => {
    const username = document.querySelector('#wallet .donate input[type="text"]').value;
    const amount = document.querySelector('#wallet .donate input[type="number"]').value;
    if (username && amount > 0) {
      alert(`You donated $${amount} to ${username}!`);
    } else {
      alert('Please enter a valid username and amount.');
    }
  });
}

// Fade Bar Behavior
const bottomBar = document.querySelector('.bottom-bar');
let fadeTimeout;

function showBottomBar() {
  bottomBar.style.opacity = '1';
  clearTimeout(fadeTimeout);
  fadeTimeout = setTimeout(() => {
    bottomBar.style.opacity = '0.5';
  }, 2000);
}

document.addEventListener('scroll', showBottomBar);
document.addEventListener('mousemove', showBottomBar);
document.addEventListener('touchstart', showBottomBar);
