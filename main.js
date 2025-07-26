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

// Event Listeners for nav buttons
document.getElementById('homeBtn').addEventListener('click', () => showSection('home'));
