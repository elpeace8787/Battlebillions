document.addEventListener("DOMContentLoaded", () => {
  const bottomBar = document.getElementById("bottomBar");
  const content = document.getElementById("content");
  const navIcons = document.querySelectorAll(".nav-icon");
  
  // Pages content map - update content for each page
  const pages = {
    home: {
      title: "Home",
      content: "<p>This is your home dashboard overview.</p>"
    },
    messages: {
      title: "Messages",
      content: "<p>Your messages will show here.</p>"
    },
    profile: {
      title: "Profile",
      content: "<p>Manage your user profile here.</p>"
    },
    battle: {
      title: "Battle",
      content: "<p>Start or join battles here.</p>"
    },
    leaderboard: {
      title: "Leaderboard",
      content: "<p>Check rankings and top players here.</p>"
    },
    wallet: {
      title: "Wallet",
      content: "<p>Manage your wallet and transactions here.</p>"
    }
  };

  // Initially show home page content
  updateContent("home");

  navIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      // Update content based on clicked icon's data-page attribute
      const page = icon.getAttribute("data-page");
      updateContent(page);
    });
  });

  function updateContent(page) {
    if (pages[page]) {
      content.innerHTML = `
        <h2>${pages[page].title}</h2>
        ${pages[page].content}
      `;
      // Highlight active icon
      navIcons.forEach(i => i.classList.toggle("active", i.getAttribute("data-page") === page));
    }
  }

  // Fade bottom bar logic:
  let fadeTimeout;

  function fadeOutBar() {
    bottomBar.classList.add("faded");
  }

  function fadeInBar() {
    bottomBar.classList.remove("faded");
    clearTimeout(fadeTimeout);
    fadeTimeout = setTimeout(fadeOutBar, 2000);
  }

  // Start faded
  fadeOutBar();

  // Fade in on scroll or touch
  window.addEventListener("scroll", fadeInBar);
  window.addEventListener("touchstart", fadeInBar);

  // Also fade in on bottom bar tap
  bottomBar.addEventListener("mouseenter", fadeInBar);
  bottomBar.addEventListener("mouseleave", fadeOutBar);
});
