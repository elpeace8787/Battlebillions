const bottomNav = document.querySelector('.bottom-nav');
let scrollTimeout;

// Fade effect for bottom bar
window.addEventListener('scroll', () => {
  bottomNav.classList.add('fade');
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    bottomNav.classList.remove('fade');
  }, 800);
});

// Load content dynamically
const content = document.getElementById('content');
const buttons = document.querySelectorAll('[data-page]');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const page = btn.getAttribute('data-page');
    loadPage(page);
  });
});

function loadPage(page) {
  fetch(`${page}.html`)
    .then(res => res.text())
    .then(data => {
      content.innerHTML = data;
    })
    .catch(() => {
      content.innerHTML = `<h2>${page.toUpperCase()} Page</h2><p>Content not found.</p>`;
    });
}
