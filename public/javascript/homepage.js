// Create new date object and format it
const addDate = function() {
  const date = new Date().toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric" }); 

  document.getElementById("date").innerHTML = date;
}

// Get all the trophy cells
const trophyCells = document.querySelectorAll(".trophy-cell");

// Convert to array from node list
const trophyCellsArray = [...trophyCells];

// Add trophies to top 3 competitors
// This function assumes that the rows are all in the correct order
const addTrophies = function() {
  trophyCellsArray.forEach(cell => {
    const ranking = trophyCellsArray.indexOf(cell) + 1;

    switch (trophyCellsArray.indexOf(cell)) {
      case 0:
        cell.innerHTML = `<i class="bi bi-trophy-fill gold"></i>${ranking}`;
        break;
      case 1:
        cell.innerHTML = `<i class="bi bi-trophy-fill silver"></i>${ranking}`;
        break;
      case 2:
        cell.innerHTML = `<i class="bi bi-trophy-fill bronze"></i>${ranking}`;
        break;
      default:
        cell.innerHTML = ranking;
    }
  });
}

window.onload = function() {
  addDate();
  addTrophies();
}
