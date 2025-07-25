// Chat User Switching
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

// Sending a Message
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
