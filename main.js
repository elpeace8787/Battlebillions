document.addEventListener("DOMContentLoaded", () => {
  const bottomBar = document.getElementById("bottomBar");
  const content = document.getElementById("content");
  const navIcons = bottomBar.querySelectorAll(".nav-icon");

  // Page content for demo, replace with your real page HTML or loading logic
  const pages = {
    home: `<h2>Home</h2><p>This is your home/profile page content.</p>`,
    battle: `<h2>Battle</h2><p>Prepare for battle! Your battles will appear here.</p>`,
    leaderboard: `<h2>Leaderboard</h2><p>Check out the top players here.</p>`,
    wallet: `<h2>Wallet</h2><p>Manage your wallet and funds here.</p>`
  };

  // Handle bottom bar fade/unfade on scroll
  let fadeTimeout;
  const fadeDuration = 1500; // ms

  function fadeOutBar() {
    bottomBar.classList.add("faded");
    bottomBar.style.pointerEvents = "none";
  }
  function fadeInBar() {
    bottomBar.classList.remove("faded");
    bottomBar.style.pointerEvents = "auto";
  }

  // Fade bottom bar initially after 3 seconds
  setTimeout(fadeOutBar, 3000);

  // On scroll fade in and out after delay
  let scrollTimer;
  window.addEventListener("scroll", () => {
    fadeInBar();

    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      fadeOutBar();
    }, fadeDuration);
  });

  // Handle icon clicks to load content without page reload
  navIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      const page = icon.getAttribute("data-page");
      if (page && pages[page]) {
        content.innerHTML = pages[page];
        // highlight selected icon (optional)
        navIcons.forEach(ic => ic.classList.remove("active"));
        icon.classList.add("active");
      }
    });
  });

  // Initially load home page
  content.innerHTML = pages.home;
  navIcons.forEach(ic => ic.classList.remove("active"));
  navIcons[0].classList.add("active");
});
