//declaring all the necessary variables
//cityName will hold the user input
let cityName ="";
//using the jQuery selector to reference id's from the html
let searchedCity = $("#searchCity");
let searchButton = $("#searchButton");
let clearButton = $("#clearHistory");
let currentCity = $("#currentCity");
let currentTemperature = $("#temperature");
let currentHumidity = $("#humidity");
let currentWindSpeed = $("#windSpeed");
//this array is going to the hold city names that the user inputted. 
//It will be useful holding this storage to do things like
//clearing the search histpry, 
let searchedCities = [];

function find(c){
    for (var i=0; i< searchedCities.length; i++) {
        
    }
}