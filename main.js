// ======= Main.js =======

// Keep track of current active section
let currentSection = 'home';

// Sample data for demonstration (you can replace with API calls)
const battles = [
  { id: 1, title: 'Fire Clash', user: 'ElPeace', description: 'Intense fiery battle!' },
  { id: 2, title: 'Ocean Siege', user: 'AquaKing', description: 'Battle on the high seas.' },
  { id: 3, title: 'Sky Warriors', user: 'CloudRider', description: 'Fight among the clouds.' },
  { id: 4, title: 'Desert Duel', user: 'SandStorm', description: 'Blazing desert fight.' }
];

const leaderboardData = [
  { rank: 1, player: 'ElPeace', level: 42, wins: 120 },
  { rank: 2, player: 'AquaKing', level: 39, wins: 110 },
  { rank: 3, player: 'CloudRider', level: 37, wins: 98 },
  { rank: 4, player: 'SandStorm', level: 34, wins: 85 }
];

// Messages data
const conversations = {
  Alex: [
    { type: 'received', text: 'Hey! Ready for the next battle?', time: '2h ago' },
    { type: 'sent', text: 'Almost there, just gearing up!', time: '1h 45m ago' }
  ],
  Jamie: [
    { type: 'received', text: 'Sent the coins, check your wallet.', time: 'Yesterday' }
  ]
};

let currentChatUser = 'Alex';

// Wallet balance
let walletBalance = 1000;

// --- Section Show / Hide ---
function showSection(sectionId) {
  if (sectionId === currentSection) return;

  document.querySelectorAll('.page-section').forEach(sec => {
    sec.classList.remove('active');
  });
  const section = document.getElementById(sectionId);
  if (section) section.classList.add('active');

  currentSection = sectionId;

  // Load dynamic content if needed
  if (sectionId === 'leaderboard') loadLeaderboardTable();
  if (sectionId === 'battle') loadBattleFeed();
  if (sectionId === 'messages') loadConversations();
}

// --- Leaderboard Table ---
function loadLeaderboardTable(filter = '') {
  const tbody = document.querySelector('#leaderboardTable tbody');
  tbody.innerHTML = '';
  const filteredData = leaderboardData.filter(player =>
    player.player.toLowerCase().includes(filter.toLowerCase())
  );
  filteredData.forEach(player => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${player.rank}</td><td>${player.player}</td><td>${player.level}</td><td>${player.wins}</td>`;
    tbody.appendChild(tr);
  });
}

// --- Battle Feed ---
function loadBattleFeed(filter = '') {
  const container = document.getElementById('battleFeed');
  container.innerHTML = '';
  const filteredBattles = battles.filter(b =>
    b.title.toLowerCase().includes(filter.toLowerCase()) || b.user.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredBattles.length === 0) {
    container.innerHTML = '<p>No battles found.</p>';
    return;
  }

  filteredBattles.forEach(battle => {
    const div = document.createElement('div');
    div.className = 'battle-item';
    div.innerHTML = `<h3>${battle.title}</h3><p><strong>By:</strong> ${battle.user}</p><p>${battle.description}</p>`;
    container.appendChild(div);
  });
}

// --- Messages System ---
function loadConversations(filter = '') {
  const convList = document.getElementById('conversationList');
  convList.innerHTML = '';
  const filteredUsers = Object.keys(conversations).filter(user =>
    user.toLowerCase().includes(filter.toLowerCase())
  );
  filteredUsers.forEach((user, idx) => {
    const convDiv = document.createElement('div');
    convDiv.className = 'conversation';
    if (user === currentChatUser) convDiv.classList.add('active');
    convDiv.dataset.user = user;
    convDiv.innerHTML = `
      <img src="profile.png" alt="${user}" class="conversation-avatar" />
      <div class="conversation-info">
        <h4>${user}</h4>
        <p>${conversations[user][conversations[user].length - 1].text}</p>
        <span class="time">${conversations[user][conversations[user].length - 1].time}</span>
      </div>`;
    convList.appendChild(convDiv);

    convDiv.addEventListener('click', () => {
      currentChatUser = user;
      document.querySelectorAll('.conversation').forEach(c => c.classList.remove('active'));
      convDiv.classList.add('active');
      renderChatMessages();
    });
  });

  renderChatMessages();
}

function renderChatMessages() {
  const chatMessagesDiv = document.getElementById('chatMessages');
  chatMessagesDiv.innerHTML = '';
  const msgs = conversations[currentChatUser] || [];
  msgs.forEach(m => {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message ' + m.type;
    msgDiv.textContent = m.text;
    chatMessagesDiv.appendChild(msgDiv);
  });
  document.getElementById('chatUser').textContent = currentChatUser;
}

// Send message
function sendMessage() {
  const input = document.getElementById('messageInput');
  const text = input.value.trim();
  if (!text) return;

  if (!conversations[currentChatUser]) conversations[currentChatUser] = [];
  conversations[currentChatUser].push({ type: 'sent', text, time: 'Just now' });

  input.value = '';
  renderChatMessages();
  loadConversations(); // Update conversation list preview
}

// --- Wallet Donate ---
function donate() {
  const user = document.getElementById('donationUser').value.trim();
  const amount = parseInt(document.getElementById('donationAmount').value);

  const msgDiv = document.getElementById('donationMsg');
  msgDiv.textContent = '';

  if (!user) {
    msgDiv.textContent = 'Please enter a recipient username.';
    msgDiv.style.color = 'red';
    return;
  }
  if (!amount || amount <= 0) {
    msgDiv.textContent = 'Enter a valid donation amount.';
    msgDiv.style.color = 'red';
    return;
  }
  if (amount > walletBalance) {
    msgDiv.textContent = 'Insufficient balance.';
    msgDiv.style.color = 'red';
    return;
  }

  walletBalance -= amount;
  document.getElementById('walletBalance').textContent = walletBalance + ' BB';
  msgDiv.textContent = `Successfully donated ${amount} BB to ${user}!`;
  msgDiv.style.color = 'limegreen';

  // Clear inputs
  document.getElementById('donationUser').value = '';
  document.getElementById('donationAmount').value = '';
}

// --- Settings ---
function saveSettings() {
  const username = document.getElementById('settingUsername').value.trim();
  const emailNotif = document.getElementById('emailNotifications').checked;
  const darkMode = document.getElementById('darkModeToggle').checked;

  if (!username) {
    alert('Username cannot be empty.');
    return;
  }

  // Update username display
  document.getElementById('username').textContent = username;

  // You could save these preferences to server/localStorage here

  alert('Settings saved!');

  // Dark Mode toggle
  if (darkMode) {
    document.body.style.backgroundColor = '#121212';
    document.body.style.color = '#fff';
  } else {
    document.body.style.backgroundColor = '#fff';
    document.body.style.color = '#000';
  }
}

// --- Bottom Bar Fade ---
const bottomBar = document.querySelector('.bottom-bar');
let fadeTimeout;
function showBottomBar() {
  bottomBar.style.opacity = '1';
  if (fadeTimeout) clearTimeout(fadeTimeout);
  fadeTimeout = setTimeout(() => {
    bottomBar.style.opacity = '0.3';
  }, 2000);
}
window.addEventListener('scroll', showBottomBar);
window.addEventListener('mousemove', showBottomBar);
window.addEventListener('touchstart', showBottomBar);
showBottomBar();

// --- Event Listeners ---
document.getElementById('homeBtn').addEventListener('click', () => showSection('home'));
document.getElementById('profileBtnTop').addEventListener('click', () => showSection('profile'));
document.getElementById('messagesBtn').addEventListener('click', () => showSection('messages'));
document.getElementById('battleBtn').addEventListener('click', () => showSection('battle'));
document.getElementById('leaderboardBtn').addEventListener('click', () => showSection('leaderboard'));
document.getElementById('walletBtn').addEventListener('click', () => showSection('wallet'));
document.getElementById('settingsBtn').addEventListener('click', () => showSection('settings'));

document.getElementById('logoutBtn').addEventListener('click', () => {
  alert('Logged out successfully!');
});

document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});

document.getElementById('donateBtn').addEventListener('click', donate);

document.getElementById('saveSettingsBtn').addEventListener('click', saveSettings);

// Search filtering
document.getElementById('battleSearch').addEventListener('input', e => {
  loadBattleFeed(e.target.value);
});
document.getElementById('leaderboardSearch').addEventListener('input', e => {
  loadLeaderboardTable(e.target.value);
});
document.getElementById('messageSearch').addEventListener('input', e => {
  loadConversations(e.target.value);
});

// Initialize defaults
showSection('home');
loadBattleFeed();
loadLeaderboardTable();
loadConversations();
