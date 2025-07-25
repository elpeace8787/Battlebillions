// Sidebar active state
const sidebarLinks = document.querySelectorAll('.sidebar a');

sidebarLinks.forEach(link => {
  link.addEventListener('click', function () {
    sidebarLinks.forEach(link => link.classList.remove('active'));
    this.classList.add('active');
  });
});

// Highlight the current page
const currentPage = window.location.pathname.split('/').pop();
sidebarLinks.forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});
