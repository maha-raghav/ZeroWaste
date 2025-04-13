// script.js

document.getElementById("searchButton").addEventListener("click", function () {
  const location = document.getElementById("locationSearch").value;
  const foodType = document.getElementById("foodTypeFilter").value;

  console.log("Search triggered with location:", location, "and food type:", foodType);
  // Add functionality here to dynamically load food listings based on the search criteria.
});