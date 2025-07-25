const bottomNav = document.querySelector('.bottom-nav');

let timer;
window.addEventListener('scroll', () => {
  bottomNav.classList.add('active');
  clearTimeout(timer);
  timer = setTimeout(() => bottomNav.classList.remove('active'), 2000);
});
