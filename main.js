const content = document.getElementById('content');
const bottomNav = document.getElementById('bottomNav');

const icons = {
  homeIcon: document.getElementById('homeIcon'),
  battleIcon: document.getElementById('battleIcon'),
  leaderboardIcon: document.getElementById('leaderboardIcon'),
  walletIcon: document.getElementById('walletIcon'),
  messagesIcon: document.getElementById('messagesIcon'),
  settingsIcon: document.getElementById('settingsIcon'),
  logoutIcon: document.getElementById('logoutIcon'),
};

async function loadPage(page) {
  try {
    const res = await fetch(`${page}.html`);
    content.innerHTML = await res.text();
  } catch {
    content.innerHTML = `<p style="color:red;">Failed to load ${page}</p>`;
  }
}

icons.homeIcon.addEventListener('click', () => loadPage('home'));
icons.battleIcon.addEventListener('click', () => loadPage('battle'));
icons.leaderboardIcon.addEventListener('click', () => loadPage('leaderboard'));
icons.walletIcon.addEventListener('click', () => loadPage('wallet'));
icons.messagesIcon.addEventListener('click', () => loadPage('messages'));
icons.settingsIcon.addEventListener('click', () => loadPage('settings'));
icons.logoutIcon.addEventListener('click', () => window.location.href = 'index.html');

let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY) bottomNav.classList.add('hidden');
  else bottomNav.classList.remove('hidden');
  lastScrollY = window.scrollY;
});

loadPage('home');
