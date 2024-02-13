var storedMovies = JSON.parse(localStorage.getItem("storedMovies")) || []



for(var i = 0; i < storedMovies.length; i++){
    
    fetch ("http://www.omdbapi.com/?apikey=c236aea6&t="+ storedMovies[i])
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
        
      var displayInfo = document.getElementById("displayInfo");
      var movieTitle = document.createElement("h2")
      movieTitle.textContent = data.Title;
      var movieYear = data.Year;
      var movieDirector = data.Director;
      var movieWriter = data.Writer;
      var movieCast = data.Actors;
      var movieSynopsis = data.Plot;
      var html = "<h2 class='text-2xl font-bold'>" + movieTitle + " " + "(" + movieYear + ")</h2><br/><h3 class='text-xl font-semibold'>Directed by:</h3><p>" + movieDirector + "</p><br/><h3 class='text-xl font-semibold'>Written by:</h3><p>" + movieWriter + "</p><br/><h3 class='text-xl font-semibold'>Starring:</h3><p>" + movieCast + "</p><br/><h3 class='text-xl font-semibold'>Synopsis:</h3><p>" + movieSynopsis + "</p>";
      document.querySelector("#recentMovies").append(movieTitle) ;
    });
  }