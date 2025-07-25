document.addEventListener("DOMContentLoaded", () => {
  const chatItems = document.querySelectorAll(".chat");
  const chatThread = document.getElementById("chatThread");
  const sendMessageForm = document.getElementById("sendMessageForm");
  const messageInput = document.getElementById("messageInput");

  // Switch chat threads
  chatItems.forEach(item => {
    item.addEventListener("click", () => {
      document.querySelector(".chat.active")?.classList.remove("active");
      item.classList.add("active");
      chatThread.innerHTML = `
        <div class="message received">
          <p>Chat with ${item.dataset.user} started...</p>
        </div>`;
    });
  });

  // Send new message
  sendMessageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
      const newMsg = document.createElement("div");
      newMsg.className = "message sent";
      newMsg.innerHTML = `<p>${message}</p>`;
      chatThread.appendChild(newMsg);
      chatThread.scrollTop = chatThread.scrollHeight;
      messageInput.value = "";
    }
  });
});
