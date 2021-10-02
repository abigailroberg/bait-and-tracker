// Create new date object and format it
const addDate = function() {
  const date = new Date().toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric" }); 

  document.getElementById("date").innerHTML = date;
}

// Add a line under a nav link to indicate the current page.Loop through all the navbar links and add the navbar-link-border class if its href matches with the current page
const addNavBorder = function() {
  const currentPage = location.href;
  const navItems = document.getElementsByClassName('navbar-link');
  
  for (let i = 0; i < navItems.length; i++) {
    if(navItems[i].href === currentPage) {
      navItems[i].classList.add("navbar-link-border");
    }
  }
}

window.onload = function() {
  addDate();
  addNavBorder();
}

