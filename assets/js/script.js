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
//creating a function that will search inside the storage for a city name
function find(c){
    for (var i=0; i< searchedCities.length; i++) {
        if(c.toUpperCase()===searchedCities[i]){
            return -1;
        }
    }
    return 1;
}
//api key
let APIKey = "d906d1b93882fa918015d052d274c520";
//this function is going to display the five day forecast after getting the city name from the user
//input and getting the data from the API
function displayWeather(event){
    event.preventDefault();//using preventDefault to stop the browser from displaying the wrong forecast from previous entries
    if(searchedCity.val().trim()!==""){
        city=searchedCity.val().trim();//using val() to retrive the "value" or what was inside the user input field.using trim() to get rid
        //of "whitespace" like tabs, line breaks, or spaces or something from the user
        currentWeather(city); //npw calling the function that grab the current weather from the api using the user input, we'll call it currentWeather
    }
}