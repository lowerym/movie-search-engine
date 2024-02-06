var fetchButton = document.getElementById("fetch-button");
var display = document.getElementById("display");


function getAPI(title){
  fetch ("http://www.omdbapi.com/?apikey=c236aea6&t="+ title)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data.Year);
    var display = document.getElementById("display")
    var movieTitle = data.Title
    var movieYear = data.Year
    display.append(movieTitle + " "+ movieYear)
    });
}

function getAPI2(title){
  fetch ("https://api.themoviedb.org/3/search/movie?query="+ title +"&api_key=12126786fe2ba8d56422edd3325172f9")
  .then (function (response){
    return response.json();
  })
  .then (function(data) {
    console.log(data);
    display.innerHTML= ""
    console.log(data.results[0].poster_path)
    var posterLink = data.results[0].poster_path
    var moviePoster = document.createElement("img")
    moviePoster.setAttribute("src", "https://image.tmdb.org/t/p/original" + posterLink)
    display.append(moviePoster)
  });
}

fetchButton.addEventListener("click", function(){
  var title = document.querySelector("#title").value
  getAPI(title)
  getAPI2(title)
})