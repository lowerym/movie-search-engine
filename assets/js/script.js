var fetchButton = document.getElementById("fetch-button");
var advancedFetchButton = document.getElementById("advanced-fetch-button");
var display = document.getElementById("display");
var advancedSearch = document.getElementById("advancedSearchModal");
var advancedButton = document.getElementById("advanced-button");
var advancedClose = document.getElementsByClassName("close")[0];
var displayAdvanced = document.getElementById("displayModal");
var autocomplete = document.getElementById("title");
var resultsHTML = document.getElementById("results");

advancedButton.addEventListener("click", function(){
  advancedSearch.style.display = "block";
});

advancedClose.addEventListener("click", function(){
  advancedSearch.style.display = "none";
  displayModalPoster.innerHTML = "";
  displayModalInfo.innerHTML = "";
});

window.addEventListener("click", function(event){
  if (event.target == advancedSearch) {
    advancedSearch.style.display = "none";
    displayModalPoster.innerHTML = "";
    displayModalInfo.innerHTML = "";
  }
});

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

  function getAPIadvanced(name){
    fetch ("http://www.omdbapi.com/?apikey=c236aea6&t="+ name)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var displayModalInfo = document.getElementById("displayModalInfo");
      var movieTitle = data.Title;
      var movieYear = data.Year;
      var movieDirector = data.Director;
      var movieWriter = data.Writer;
      var movieCast = data.Actors;
      var movieSynopsis = data.Plot;
      var html = "<h2 class='text-2xl font-bold'>" + movieTitle + " " + "(" + movieYear + ")</h2><br/><h3 class='text-xl font-semibold'>Directed by:</h3><p>" + movieDirector + "</p><br/><h3 class='text-xl font-semibold'>Written by:</h3><p>" + movieWriter + "</p><br/><h3 class='text-xl font-semibold'>Starring:</h3><p>" + movieCast + "</p><br/><h3 class='text-xl font-semibold'>Synopsis:</h3><p>" + movieSynopsis + "</p>";
      displayModalInfo.innerHTML = html;
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
    displayPoster.innerHTML = ""
    console.log(data.results[0].poster_path)
    var posterLink = data.results[0].poster_path
    var moviePoster = document.createElement("img")
    moviePoster.setAttribute("src", "https://image.tmdb.org/t/p/original" + posterLink)
    displayPoster.append(moviePoster);
  });

  }

  function getAPI2advanced(name){
    fetch ("https://api.themoviedb.org/3/search/movie?query="+ name +"&api_key=12126786fe2ba8d56422edd3325172f9")
    .then (function (response){
      return response.json();
    })
    .then (function(data) {
    console.log(data);
    console.log(data.video);
    var displayModalPoster = document.getElementById("displayModalPoster");
    displayModalPoster.innerHTML = ""
    console.log(data.results[0].poster_path)
    var posterLink = data.results[0].poster_path
    var moviePoster = document.createElement("img")
    moviePoster.setAttribute("src", "https://image.tmdb.org/t/p/original" + posterLink)
    displayModalPoster.append(moviePoster);
  });

  }

  fetchButton.addEventListener("click", function(){
    var title = document.querySelector("#title").value.toLowerCase();
    if (topMovies.find((element) => element == title )){
      getAPI(title);
      getAPI2(title);
      display.classList.remove("hidden");
    } else {
      console.log("please try again");
    }
  })

  advancedFetchButton.addEventListener("click", function(){
    var name = document.querySelector("#name").value.toLowerCase();
    if (topMovies.find((element) => element == name)) {
      getAPIadvanced(name);
      getAPI2advanced(name);
      displayAdvanced.classList.remove("hidden");
    } else {
      console.log("Please try again");
    }
  })

  function omdbActor(title){
    fetch ("https://api.themoviedb.org/3/search/person?query=" + title +"&include_adult=false&language=en-US&page=1&api_key=12126786fe2ba8d56422edd3325172f9")
    .then (function (response){
      return response.json();
    })
    .then (function(data){
      for(var i = 0; i <data.results[0].known_for.length; i++){
        console.log(data.results[0].known_for[i].title);
        var actorSearch = data.results[0].known_for[i].title.toLowerCase();
        if (topMovies.find((element) => element == actorSearch)){
          getAPI(actorSearch);
          getAPI2(actorSearch);
          display.classList.remove("hidden");
      }}
    })
    }

    autocomplete.oninput = function () {
      let results = [];
      var userInput = this.value;
      resultsHTML.innerHTML = "";
      if (userInput.length > 0) {
        results = getResults(userInput);
        resultsHTML.style.display = "block";
        for (i = 0; i < results.length; i++) {
          resultsHTML.innerHTML += "<li>" + results[i] + "</li>";
        }
      }
    };

    function getResults(input) {
      const results = [];
      for (i = 0; i < topMovies.length; i++) {
        if (input === topMovies[i].slice(0, input.length)) {
          results.push(topMovies[i]);
        }
      }
      return results;
    }

    resultsHTML.onclick = function (event) {
      var setValue = event.target.innerText;
      autocomplete.value = setValue;
      this.innerHTML = "";
    };
    // lines 145 to 171 leveraged from https://dev.to/michaelburrows/create-an-autocomplete-textbox-using-vanilla-javascript-37n0
  var topMovies = ["citizen kane",
 "casablanca",
 "the godfather",
 "gone with the wind",
 "lawrence of arabia",
 "the wizard of oz",
 "the graduate",
 "on the waterfront",
 "schindler's list",
 "singin' in the rain",
 "its a wonderful life",
 "sunset blvd.",
 "the bridge on the river kwai",
 "some like it hot",
 "star wars",
 "all about eve",
 "the african queen",
 "psycho",
 "chinatown",
 "one flew over the cuckoo's nest",
  "the grapes of wrath",
"2001: a space odyssey",
"the maltese falcon",
"raging bull",
"e.t.: the extra-terrestrial",
"dr. strangelove",
"bonnie and clyde",
"apocalpyse now",
"mr. smith goes to washington",
"the treasure of the sierra madre",
"annie hall",
"the godfather part 2",
"high noon",
"to kill a mockingbird",
"it happened one night",
"midnight cowboy",
"the best years of our lives",
"double indemnity",
"doctor zhivago",
"north by northwest",
"west side story",
"rear window",
"king kong",
"the birth of a nation",
"a streetcar named desire",
"a clockwork orange",
"taxi driver",
"jaws",
"butch cassidy and the sundance kid",
"the philadelphia story",
"from here to eternity",
"amadeus",
"all quiet on the western front",
"the sound of music",
"mash",
"the third man",
"fantasia",
"rebel without a cause",
"raiders of the lost ark",
"veritgo",
"tootsie",
"stagecoach",
"close encounters of the third kind",
"the silence of the lambs",
"network",
"the manchurian candidate",
"an american in paris",
"shane",
"the french connection",
"forrest gump",
"ben-hur",
"wuthering heights",
"the gold rush",
"dances with wolves",
"city lights",
"american graffiti",
"rocky",
"the deer hunter",
"the wild bunch",
"modern times",
"giant",
"platoon",
"fargo",
"duck soup",
"mutiny on the bounty",
"frankenstein",
"easy rider",
"patton",
"the jazz singer",
"my fair lady",
"a place in the sun",
"the apartment",
"goodfellas",
"pulp fiction",
"the searchers",
"bringing up the baby",
"unforgiven",
"guess who's coming to dinner",
"yankee doodle dandy",
]
