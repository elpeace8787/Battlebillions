document.addEventListener("DOMContentLoaded", () => {
  const bottomBar = document.getElementById("bottomBar");
  const content = document.getElementById("content");
  const navIcons = bottomBar.querySelectorAll(".nav-icon");

  const pages = {
    home: `<h2>Home</h2><p>This is your home/profile page.</p>`,
    battle: `<h2>Battle</h2><p>Prepare for battle here!</p>`,
    leaderboard: `<h2>Leaderboard</h2><p>Top players will appear here.</p>`,
    wallet: `<h2>Wallet</h2><p>Manage your funds here.</p>`
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

  // Load page on icon click
  navIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      const page = icon.dataset.page;
      if (page && pages[page]) {
        content.innerHTML = pages[page];
        navIcons.forEach(i => i.classList.remove("active"));
        icon.classList.add("active");
      }
    });
  });

  // Default load home
  content.innerHTML = pages.home;
  navIcons[0].classList.add("active");
});
