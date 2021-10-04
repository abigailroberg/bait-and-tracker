// Create new date object and format it
const date = new Date().toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric" }); 

document.getElementById("date").innerHTML = date;