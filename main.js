function showSection(sectionId) {
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
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

// Messaging system simulation
document.getElementById('sendMessage').addEventListener('click', () => {
  const input = document.getElementById('messageInput');
  const text = input.value.trim();
  if (text) {
    const msgList = document.getElementById('messagesList');
    const newMsg = document.createElement('div');
    newMsg.classList.add('message-item');
    newMsg.textContent = "You: " + text;
    msgList.appendChild(newMsg);
    input.value = '';
    msgList.scrollTop = msgList.scrollHeight;
  }
});
