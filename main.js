// Cache DOM elements
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

// Helper to load content dynamically
async function loadPage(page) {
  try {
    const res = await fetch(`${page}.html`);
    if (!res.ok) throw new Error(`Failed to load ${page}`);
    const html = await res.text();
    content.innerHTML = html;
  } catch (err) {
    content.innerHTML = `<p style="color:red; text-align:center;">${err.message}</p>`;
  }
}

// Icon click handlers
icons.homeIcon.addEventListener('click', () => loadPage('home'));
icons.battleIcon.addEventListener('click', () => loadPage('battle'));
icons.leaderboardIcon.addEventListener('click', () => loadPage('leaderboard'));
icons.walletIcon.addEventListener('click', () => loadPage('wallet'));
icons.messagesIcon.addEventListener('click', () => loadPage('messages'));
icons.settingsIcon.addEventListener('click', () => loadPage('settings'));
icons.logoutIcon.addEventListener('click', () => {
  // Example logout function, redirect to login or clear session
  window.location.href = 'index.html';
});

// Fade bottom nav on scroll
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY) {
    // Scroll down - hide bar
    bottomNav.classList.add('hidden');
  } else {
    // Scroll up - show bar
    bottomNav.classList.remove('hidden');
  }
  lastScrollY = window.scrollY;
});

// Load home page by default
loadPage('home');
