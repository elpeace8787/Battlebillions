// main.js

document.addEventListener("DOMContentLoaded", () => { const buttons = document.querySelectorAll(".nav-btn"); const pages = document.querySelectorAll(".page");

function showPage(pageId) { pages.forEach(page => { page.classList.remove("active"); page.classList.add("hidden"); });

const targetPage = document.getElementById(pageId);
if (targetPage) {
  targetPage.classList.remove("hidden");
  targetPage.classList.add("active");
}

buttons.forEach(btn => btn.classList.remove("active"));
const activeBtn = document.querySelector(`.nav-btn[data-page='${pageId}']`);
if (activeBtn) {
  activeBtn.classList.add("active");
}

}

buttons.forEach(button => { button.addEventListener("click", () => { const targetPage = button.getAttribute("data-page"); showPage(targetPage); }); });

// Initial page load showPage("home"); });

                          
