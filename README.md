# Movie Search Engine

## Description
Created by Asaad Ahmad and Matthew Lowery, this basic search engine is designed to search through the American Film Institute's Top 100 Movies of All Time. We used the Tailwind CSS framework for the application's look and the OMDB and Movie DB APIs to pull information for each of the films. Asaad assembled an array containing all 100 movies and created the functionalities to pull information gathered from the APIs to be referenced in the search results. Matthew built off the functionalities to pull the poster information from the OMDB and the film's information - actors, writers, directors, and synopsis - from The Movie DB. Asaad also created autocomplete and recent search functions using localStorage, while Matthew created a dropdown populated with the recent search function. Matthew created an advanced search function that displays a modal and allows the user to search for a movie by actor, writer, and director. We created separate functions for this modal so that the APIs worked with the array to display a certain movie based on the person searched and if that person was known for being in a movie from the array. For instance, if the user searches "Tom Hanks" and selects "actor," the modal will display a listing for Forrest Gump.

## Screenshot
![scrnli_2_13_2024_7-43-01 PM](https://github.com/lowerym/movie-search-engine/assets/146456080/c98cafaa-8ae4-41a0-ad87-97e2e2bb5d6f)

## Link to Live Application
[Click here to view the live application](https://lowerym.github.io/movie-search-engine/)
