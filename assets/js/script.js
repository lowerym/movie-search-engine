var fetchButton = document.getElementById("fetch-button");
var display = document.getElementById("display");


function getAPI(title){
  fetch ("http://www.omdbapi.com/?apikey=c236aea6&t="+ title)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var displayInfo = document.getElementById("displayInfo");
    var movieTitle = data.Title;
    var movieYear = data.Year;
    var movieDirector = data.Director;
    var movieWriter = data.Writer;
    var movieCast = data.Actors;
    var movieSynopsis = data.Plot;
    var html = "<h2 class='text-2xl font-bold'>" + movieTitle + " " + "(" + movieYear + ")</h2><br/><h3 class='text-xl font-semibold'>Directed by:</h3><p>" + movieDirector + "</p><br/><h3 class='text-xl font-semibold'>Written by:</h3><p>" + movieWriter + "</p><br/><h3 class='text-xl font-semibold'>Starring:</h3><p>" + movieCast + "</p><br/><h3 class='text-xl font-semibold'>Synopsis:</h3><p>" + movieSynopsis + "</p>";
    displayInfo.innerHTML = html;
    });
}

function getAPI2(title){
  fetch ("https://api.themoviedb.org/3/search/movie?query="+ title +"&api_key=12126786fe2ba8d56422edd3325172f9")
  .then (function (response){
    return response.json();
  })
  .then (function(data) {
    console.log(data);
    console.log(data.video);
    var displayPoster = document.getElementById("displayPoster");
    console.log(data.results[0].poster_path)
    var posterLink = data.results[0].poster_path
    var moviePoster = document.createElement("img")
    moviePoster.setAttribute("src", "https://image.tmdb.org/t/p/original" + posterLink)
    displayPoster.append(moviePoster);
  });
}

fetchButton.addEventListener("click", function(){
  event.preventDefault();
  var title = document.querySelector("#title").value
  getAPI(title)
  getAPI2(title)
  display.classList.remove('hidden');
})
