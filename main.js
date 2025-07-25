document.addEventListener("DOMContentLoaded", () => {
  const bottomBar = document.getElementById("bottomBar");
  const content = document.getElementById("content");
  const navIcons = bottomBar.querySelectorAll(".nav-icon");
  const topIcons = document.querySelectorAll(".icon-btn[data-page]");

  const pages = {
    home: `<h2>Home</h2><p>This is your home/profile page.</p>`,
    battle: `<h2>Battle</h2><p>Prepare for battle here!</p>`,
    leaderboard: `<h2>Leaderboard</h2><p>Top players will appear here.</p>`,
    wallet: `<h2>Wallet</h2><p>Manage your funds here.</p>`,
    messages: `<h2>Messages</h2><p>Check your messages here.</p>`,
    settings: `<h2>Settings</h2><p>Adjust your preferences here.</p>`
  };

  // Faded bar
  let fadeTimer;
  function fadeBar() {
    bottomBar.classList.add("faded");
  }
  function showBar() {
    bottomBar.classList.remove("faded");
    clearTimeout(fadeTimer);
    fadeTimer = setTimeout(fadeBar, 2000);
  }

  showBar();
  document.addEventListener("mousemove", showBar);
  document.addEventListener("scroll", showBar);
  document.addEventListener("touchstart", showBar);

  // Load page on bottom icon click
  navIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      const page = icon.dataset.page;
      if (page && pages[page]) {
        content.style.opacity = 0;
        setTimeout(() => {
          content.innerHTML = pages[page];
          content.style.opacity = 1;
          navIcons.forEach(i => i.classList.remove("active"));
          icon.classList.add("active");
        }, 200);
      }
    });
  });

  // Load page on top icon click (Messages / Settings)
  topIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      const page = icon.dataset.page;
      if (page && pages[page]) {
        content.style.opacity = 0;
        setTimeout(() => {
          content.innerHTML = pages[page];
          content.style.opacity = 1;
          navIcons.forEach(i => i.classList.remove("active"));
        }, 200);
      }
    });
  });

  // Default load home
  content.innerHTML = pages.home;
  navIcons[0].classList.add("active");
});
