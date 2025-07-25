const sections = document.querySelectorAll('.page-section');
const navButtons = document.querySelectorAll('.nav-btn');
const topButtons = document.querySelectorAll('.top-btn');

// Switch between sections
function switchSection(target) {
  sections.forEach(section => section.classList.add('hidden'));
  document.getElementById(target).classList.remove('hidden');

  navButtons.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-target="${target}"]`)?.classList.add('active');
}

// Bottom nav
navButtons.forEach(btn => {
  btn.addEventListener('click', () => switchSection(btn.getAttribute('data-target')));
});

// Top icons
topButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    if (target) switchSection(target);
  });
});

// Fade bar on scroll
const bottomNav = document.querySelector('.bottom-nav');
let scrollTimeout;
window.addEventListener('scroll', () => {
  bottomNav.classList.add('fade');
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    bottomNav.classList.remove('fade');
  }, 800);
});

// Messages page behavior
document.querySelectorAll('.chat-user').forEach(user => {
  user.addEventListener('click', () => {
    document.querySelectorAll('.chat-user').forEach(u => u.classList.remove('active'));
    user.classList.add('active');

    const chatId = user.getAttribute('data-chat');
    document.querySelectorAll('.chat-messages').forEach(chat => chat.classList.add('hidden'));
    document.getElementById(chatId).classList.remove('hidden');

    document.querySelector('.chat-username').textContent = user.querySelector('span').textContent;
  });
});

document.getElementById('messageForm').addEventListener('submit', e => {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const msg = input.value.trim();
  if (msg) {
    const activeChat = document.querySelector('.chat-user.active').getAttribute('data-chat');
    const chatBox = document.getElementById(activeChat);
    const newMsg = document.createElement('div');
    newMsg.classList.add('message', 'sent');
    newMsg.textContent = msg;
    chatBox.appendChild(newMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
    input.value = '';
  }
});
