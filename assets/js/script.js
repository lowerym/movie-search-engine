var fetchButton = document.getElementById("fetch-button");
var advancedFetchButton = document.getElementById("advanced-fetch-button");
var display = document.getElementById("display");
var advancedSearch = document.getElementById("advancedSearchModal");
var advancedButton = document.getElementById("advanced-button");
var advancedClose = document.getElementsByClassName("close")[0];
var displayAdvanced = document.getElementById("displayModal");
var autocomplete = document.getElementById("title");
var resultsHTML = document.getElementById("results");
var searchSelect = document.getElementById("searchSelect");
var dropdownBtn = document.getElementById("dropdownNavbarLink");
const recentSearch = document.getElementById("recentSearch");
var storedMovies = JSON.parse(localStorage.getItem("storedMovies")) || [];

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


dropdownBtn.addEventListener("click", function(event){
  var dropdown = document.getElementById("dropdownNavbar");
  if(dropdown.classList.contains("hidden")){
    dropdown.classList.remove("hidden");
    dropdown.classList.add("block");
  } else if (dropdown.classList.contains("block")){
    dropdown.classList.remove("block");
    dropdown.classList.add("hidden");
  }
})
// the below function fetches info from our first api and uses it to display movie credit info such as actors, director, and writers
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
// this function is a modified version of the above function tailored to our advanced search function
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
// this function fetches data from our 2nd api to find and display the associated movie poster
    function getAPI2(title){
      fetch ("https://api.themoviedb.org/3/search/movie?query="+ title +"&api_key=12126786fe2ba8d56422edd3325172f9")
      .then (function (response){
        return response.json();
      })
      .then (function(data) {
      console.log(data);
      var displayPoster = document.getElementById("displayPoster");
      displayPoster.innerHTML = ""
      console.log(data.results[0].poster_path)
      var posterLink = data.results[0].poster_path
      var moviePoster = document.createElement("img")
      moviePoster.setAttribute("src", "https://image.tmdb.org/t/p/original" + posterLink)
      displayPoster.append(moviePoster);
    });

    }
// again this function is a modified version of the above function tailored to our advanced search function
  function getAPI2advanced(name){
    fetch ("https://api.themoviedb.org/3/search/movie?query="+ name +"&api_key=12126786fe2ba8d56422edd3325172f9")
    .then (function (response){
      return response.json();
    })
    .then (function(data) {
    console.log(data);
    var displayModalPoster = document.getElementById("displayModalPoster");
    displayModalPoster.innerHTML = ""
    var posterLink = data.results[0].poster_path
    var moviePoster = document.createElement("img")
    moviePoster.setAttribute("src", "https://image.tmdb.org/t/p/original" + posterLink)
    displayModalPoster.append(moviePoster);
  });

  }
// this call is meant to display local storage info on initial page load.
  getAPIrecentSearch();
  // this corresponds to our basic search button and runs the associated functions to both store the search in local storage and display the movie info and poster on the screen
  fetchButton.addEventListener("click", function(){
    var title = document.querySelector("#title").value.toLowerCase();
    recentMovies.innerHTML=""
    storedMovies.push(title)
    localStorage.setItem("storedMovies", JSON.stringify(storedMovies))
    omdbActor(title)
    getAPIrecentSearch()
    if (topMovies.find((element) => element == title )){
      getAPI(title);
      getAPI2(title);
  
      display.classList.remove("hidden");
    } else {
      console.log("please try again");
    }
  })
// our advanced search button corresponds to our modal and runs the modified versions of the functions mentioned above to
//  pull up the corresponding movie while also correctly restricting the ability to search by, for example, actor with the actor
//  option but not director unless you chose the director option
  
advancedFetchButton.addEventListener("click", function(){
    var name = document.querySelector("#name").value.toLowerCase();
    if (searchSelect.value == "Actor") {
      omdbActorAdvanced(name);
    } else if (searchSelect.value == "Director") {
      omdbDirectorAdvanced(name);
    } else if (searchSelect.value == "Writer") {
      omdbWriterAdvanced(name);
    }
    if (topMovies.find((element) => element == name)) {
      getAPIadvanced(name);
      getAPI2advanced(name);
      displayAdvanced.classList.remove("hidden");
    } else {
      console.log("Please try again");
    }
  })

// this was the initial and basic version of the person search function before we specialized it for the categories of actor director and writer
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
// this function is used in our advanced search to specifically search by director
    function omdbDirectorAdvanced(name){
      fetch ("https://api.themoviedb.org/3/search/person?query=" + name + "&include_adult=false&language=en-US&page=1&api_key=12126786fe2ba8d56422edd3325172f9")
      .then (function (response){
        return response.json();
      })
      .then (function(data){
        console.log(data);
        if(data.results[0].known_for_department == "Directing") {
          for(var i = 0; i <data.results[0].known_for.length; i++){
            console.log(data.results[0].known_for[i].title);
            var directorSearch = data.results[0].known_for[i].title.toLowerCase();
            if (topMovies.find((element) => element == directorSearch)){
              getAPIadvanced(directorSearch);
              getAPI2advanced(directorSearch);
              displayAdvanced.classList.remove("hidden");
          }}
        } else {
          console.log("Please try again");
        }
      })
      }
  
      // this function is used in our advanced search to specifically search by actor
    function omdbActorAdvanced(name){
      fetch ("https://api.themoviedb.org/3/search/person?query=" + name + "&include_adult=false&language=en-US&page=1&api_key=12126786fe2ba8d56422edd3325172f9")
      .then (function (response){
        return response.json();
      })
      .then (function(data){
        console.log(data);
        if(data.results[0].known_for_department == "Acting"){
          for(var i = 0; i < data.results[0].known_for.length; i++){
            console.log(data.results[0].known_for[i].title);
            var actorSearch = data.results[0].known_for[i].title.toLowerCase();
            if (topMovies.find((element) => element == actorSearch)){
              getAPIadvanced(actorSearch);
              getAPI2advanced(actorSearch);
              displayAdvanced.classList.remove("hidden");
          }}
        } else {
          console.log("Please try again");
        }
      })
      }

      // this function is used in our advanced search to specifically search by writer
      function omdbWriterAdvanced(name){
        fetch ("https://api.themoviedb.org/3/search/person?query=" + name + "&include_adult=false&language=en-US&page=1&api_key=12126786fe2ba8d56422edd3325172f9")
        .then (function (response){
          return response.json();
        })
        .then (function(data){
          console.log(data);
          if(data.results[0].known_for_department == "Writing"){
            for(var i = 0; i <data.results[0].known_for.length; i++){
              console.log(data.results[0].known_for[i].title);
              var writerSearch = data.results[0].known_for[i].title.toLowerCase();
              if (topMovies.find((element) => element == writerSearch)){
                getAPIadvanced(writerSearch);
                getAPI2advanced(writerSearch);
                displayAdvanced.classList.remove("hidden");
            }}
          } else {
            console.log("Please try again");
          }
        })
        }

      // the below three functions are used in tandem to create an autocomplete feature on our basic search page to make it easier to find a movie if you're unfamiliar with the AFI list
    autocomplete.oninput = function () {
      let results = [];
      var userInput = this.value;
      resultsHTML.innerHTML = "";
      if (userInput.length > 0) {
        results = getResults(userInput);
        resultsHTML.style.display = "block";
        for (i = 0; i < results.length; i++) {
          resultsHTML.innerHTML += "<li><button class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full mb-4 capitalize'>" + results[i] + "</button></li>";
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
    // above 3 functions leveraged from https://dev.to/michaelburrows/create-an-autocomplete-textbox-using-vanilla-javascript-37n0

    // this function pulls the data from the getAPIrecentSearches function and puts it into a dropdown box list that is interactable.
    for(var i = 0; i < storedMovies.length; i++){
      fetch ("http://www.omdbapi.com/?apikey=c236aea6&t="+ storedMovies[i])
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var movieTitle = document.createElement("li");
        movieTitle.textContent = data.Title;
        movieTitle.id = "recentSearch";
        movieTitle.className = "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer";
        document.querySelector("#recentMovies").append(movieTitle);
      });
    }
    // this event listner corresponds to our drop down box for recent searches
    if (recentSearch) {
      recentSearch.addEventListener("click", function(){
        display.classList.remove("hidden");
      })
    }

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
"e.t. the extra-terrestrial",
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
"m*a*s*h",
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

// this function is used in our recent search feature to store search data into local storage and be able to click that result to repull the corresponding movie data
recentMovies.createElement("button")
function getAPIrecentSearch () {
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
      var recentSearches= document.querySelector("#recentMovies").append(movieTitle) ;
      var recentSearchesButton = document.createElement("button")
        recentSearchesButton.textContent = "search"
        recentSearchesButton.setAttribute("value", storedMovies[i])
    
        recentSearchesButton.addEventListener("click",function(){
            getAPI(data.Title);
            getAPI2(data.Title);
            display.classList.remove("hidden");
          
    
        })
        
      recentMovies.append(recentSearchesButton);

    });
  }
}
