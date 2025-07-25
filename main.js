function showPage(pageId) {
  document.querySelectorAll('.tab-page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');
}
