// Create new date object and format it
const date = new Date().toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric" }); 

document.getElementById("date").innerHTML = date;

const currentPage = location.href;
const navItems = document.getElementsByClassName('navbar-link');

for (let i = 0; i < navItems.length; i++) {
  if(navItems[i].href === currentPage) {
    navItems[i].classList.add("navbar-link-border");
  }
}