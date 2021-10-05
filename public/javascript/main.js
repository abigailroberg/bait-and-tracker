// Add a line under a nav link to indicate the current page. Loop through all the navbar links and add the navbar-link-border class if its path matches with the current page
const addNavBorder = function() {
  const currentPage = window.location.pathname;
  const navItems = document.querySelectorAll('.navbar-link');

  navItems.forEach(item => {
    if (item.pathname === currentPage) {

      item.classList.add('navbar-link-border');
    }
  });
}


addNavBorder();


