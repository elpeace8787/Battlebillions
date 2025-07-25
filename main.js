function showPage(pageId) {
  document.querySelectorAll('.tab-page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');
}

// Fade behavior on scroll
const bottomBar = document.getElementById('bottomBar');
let scrollTimeout;

window.addEventListener('scroll', () => {
  bottomBar.style.opacity = '1';
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    bottomBar.style.opacity = '0.6';
  }, 1500);
});
