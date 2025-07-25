const bottomNav = document.querySelector('.bottom-nav');
let scrollTimeout;

window.addEventListener('scroll', () => {
  bottomNav.classList.add('fade');
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    bottomNav.classList.remove('fade');
  }, 800);
});
