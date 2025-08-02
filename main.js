// main.js

document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("main-content");
  const navButtons = document.querySelectorAll(".nav-btn");

  // Load the page content and CSS dynamically
  async function loadPage(page) {
    try {
      // Fetch HTML content for the page
      const res = await fetch(`pages/${page}.html`);
      if (!res.ok) throw new Error(`Failed to load pages/${page}.html`);
      const html = await res.text();
      content.innerHTML = html;

      // Remove previously loaded page CSS
      const prevStyle = document.getElementById("page-style");
      if (prevStyle) prevStyle.remove();

      // Dynamically inject the CSS for the page
      const cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.href = `css/${page}.css`;
      cssLink.id = "page-style";
      document.head.appendChild(cssLink);

    } catch (error) {
      console.error(error);
      content.innerHTML = `<p style="color:red;">Error loading the page: ${page}</p>`;
    }
  }

  // Setup nav buttons click handlers
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      navButtons.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      // Load the page matching the clicked button's data-page attribute
      const page = btn.dataset.page;
      loadPage(page);
    });
  });

  // Load default page on initial load
  loadPage("home");
});
