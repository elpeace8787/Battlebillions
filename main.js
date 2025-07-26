// Show / hide sections function
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

// Load leaderboard content from external file
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

// Chat system inside Battle dual screen
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

chatForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (message === '') return;

  addChatMessage('You', message);
  chatInput.value = '';

  // Simulate a reply for demo purposes
  setTimeout(() => {
    addChatMessage('Opponent', generateAutoReply());
  }, 1000);
});

function addChatMessage(user, message) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('chat-message');
  msgDiv.innerHTML = `<strong>${user}:</strong> ${escapeHTML(message)}`;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Simple auto reply generator for demo
function generateAutoReply() {
  const replies = [
    "Good move!",
    "I'm ready for the next round!",
    "Watch out!",
    "You're strong!",
    "Let's see what you've got!",
    "Nice strategy!",
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

// Basic HTML escape to avoid XSS
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function (match) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[match];
  });
}

// Battle Timer and Rounds Logic
let battleTime = 180; // seconds, e.g. 3 minutes
let currentRound = 1;
const totalRounds = 5;
const battleTimerElem = document.getElementById('battleTimer');
const roundsBoardElem = document.getElementById('roundsBoard');

function updateBattleTimer() {
  const minutes = String(Math.floor(battleTime / 60)).padStart(2, '0');
  const seconds = String(battleTime % 60).padStart(2, '0');
  battleTimerElem.textContent = `${minutes}:${seconds}`;
}

function updateRoundsBoard() {
  roundsBoardElem.textContent = `Round ${currentRound} of ${totalRounds}`;
}

function battleCountdown() {
  if (battleTime > 0) {
    battleTime--;
    updateBattleTimer();
  } else if (currentRound < totalRounds) {
    currentRound++;
    battleTime = 180;
    updateRoundsBoard();
    updateBattleTimer();
  } else {
    clearInterval(battleInterval);
    roundsBoardElem.textContent = 'Battle Ended';
    battleTimerElem.textContent = '00:00';
  }
}

updateBattleTimer();
updateRoundsBoard();
const battleInterval = setInterval(battleCountdown, 1000);

// Event Listeners for nav buttons
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
