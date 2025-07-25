// Select all sidebar links
const sidebarLinks = document.querySelectorAll('.sidebar a');

// Add click event to each link
sidebarLinks.forEach(link => {
  link.addEventListener('click', function () {
    // Remove 'active' class from all links
    sidebarLinks.forEach(link => link.classList.remove('active'));

    // Add 'active' class to the clicked link
    this.classList.add('active');
  });
});

// Highlight the current page based on URL
const currentPage = window.location.pathname.split('/').pop();
sidebarLinks.forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});
