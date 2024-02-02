var fetchButton = document.getElementById("fetch-button")


fetch('https://api.themoviedb.org/3/movie/11?api_key=12126786fe2ba8d56422edd3325172f9')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

  fetch('http://www.omdbapi.com/?apikey=c236aea6&t=the+godfather')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

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
  
  fetchButton.addEventListener("click", function(){
    var title = document.querySelector("#title").value
    getAPI(title)
  })