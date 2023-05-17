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
        currentWeather(cityName); //now calling the function that grab the current weather from the api using the user input, we'll call it currentWeather
    }
}
function currentWeather(cityName){
    //url taken from openweatherapp. seeing a lot of differing resources on how to properly format this url so im going to try this for now...
    const apiUrl = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}" + cityName + "&appid=" + APIKey;
    //making the call to jquery
    $.ajax({
        url:apiUrl,
        method: "GET"
    }).then(function(response){
        //now to parse the response so that we only city name, date, and the corresponding icon
        console.log(response);
        const weatherIcon = response.weather[0].icon;
        const iconUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "10d@2x.png";
        //using the date format from mozilla docs
        const date = new Date(8.64e15).toString();  
        //parsing for date, icon, and city
        $(currentCity).html(response.name + "("+date+")" + "<img src="+iconUrl+">");

        //assuming i'll need to convert to farenheit since OpenWeatherMap has everything in celciuis on their site..
        const fahrenheit = (response.main.temp - 273.15) * 1.80 + 32;
        $(currentTemperature).html((fahrenheit).toFixed(2) + "&#8457");
        //using jquery to select the currentTemp element from the HTML, using the toFixed method
        //to convert const fahrenehit to a string value with 2 decimal places.
        //also using the HTML entity code for Fahrenheit symbol for UX.
        $(currentHumidity).html(response.main.humidity+"%");
        //setting up to convert windspeed to MPH
        const wspeed = response.wind.speed;
        //using toFixed here as well tp keep the decimal to just one
        const windMPH = (wspeed*2.237).toFixed(1);
        $(currentWindSpeed).html(windMPH + "MPH");

    })
}

function forecast (cityid){
    
}