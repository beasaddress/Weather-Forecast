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
const latitude = 37.7749;
const longitude = -122.4194;
//this function is going to display the five day forecast after getting the city name from the user
//input and getting the data from the API
function displayWeather(event){
    event.preventDefault();//using preventDefault to stop the browser from displaying the wrong forecast from previous entries
    if(searchedCity.val().trim()!==""){
        cityName=searchedCity.val().trim();//using val() to retrive the "value" or what was inside the user input field.using trim() to get rid
        //of "whitespace" like tabs, line breaks, or spaces or something from the user
        currentWeather(cityName); //now calling the function that grab the current weather from the api using the user input, we'll call it currentWeather
    }
}
function currentWeather(cityName){
    //was using the wrong URL before, changed it  seeing a lot of differing resources on how to properly format this url so im going to try this for now...
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + APIKey;
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
        $(currentCity).html(response.name + " " +date + "<img src="+iconUrl+">");

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
        //calling the forecast function and passing the city id obtained from the response
        
        forecast(response.coord.lon, response.coord.lat);
        
        if(response.cod===200){//checking to see if the API request was successful ,it status code is 200, code block will execute
            //assigning the searched city to "cityname" in the browers local sotrage
            searchedCities=JSON.parse(localStorage.getItem("cityname"));
            console.log(searchedCities);
            if(searchedCities==null){
                //checking to see if searchedCities array is null(doesnt have that specific cityname in it) if it is, the cityname will be pushed into the local storage/added to the list
                searchedCities=[];
                searchedCities.push(cityName.toUpperCase());
                localStorage.setItem("cityname",JSON.stringify(searchedCities));
                addToList(cityName);
            }
            else {
                //else statement so that if the cityName is already in the array, it wont be added again
                if(find(cityName) === -1){
                    searchedCities.push(cityName.toUpperCase());
                    localStorage.setItem("cityname",JSON.stringify(searchedCities));
                    addToList(cityName);                
                }
            }
        }

    });
}
//this function will be retrieving and displaying forecast info for the specified city
function forecast (lon, lat){
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
    //let lat = response.coord.lat;
    //let lon = response.coord.lon;
    $.ajax({
        url:forecastURL,
        method:"GET"
    }).then(function(response){
        console.log(response);
        for(i=0; i<5;i++){
            //taking the unix timestamp and converting to a string
            //this will calculate the index of the forecast entry for a specific day and will derive the desired index based on the loop iteration i
            //this assumes each each day has 8 forecast entries, i looked it up and OpenWeather has a granularity of 3 hour intervals meaning there are 8 entries for each day
           const date = new Date((response.list[((i+1)*8)-1].dt)*1000).toString(); 
           //this will hopefully grab the icon from the weather array of the forecast entry.
           const iconCode = response.list[((i+1)*8)-1].weather[0].icon;
            //the URL of the icon image is constructed by combining the code that fetches it from the response with the url
           const iconURL = "https://openweathermap.org/img/wn/" + iconCode + "10d@2x.png";
           const celcius = response.list[((i+1)*8)-1].main.temp;
           const fahrenheit = (((celcius-273.5)*1.80)+32).toFixed(2);
           const humidity = response.list[((i+1)*8)-1].main.humidity;
           const windSpeed = response.list[((i+1)*8)-1].wind.speed;
           const windMPH = (windSpeed*2.237).toFixed(1);

           //placing them inside elements
           $("#forecastDate"+i).html(date);
           $("#forecastIcon"+i).html("img src="+iconURL+">");
           $("#tempForecast"+i).html(fahrenheit+"&#8457");
           $("#humidityForecast"+i).html(humidity+"%");
           $("#windForecast"+i).html(windMPH+"MPH");

        }
    });
}

//adding a function that will add the searched cities to the list underneath the search 
//bar by taking "c" from local storage and placing inside the html elements
function addToList(c){
    //creating a new list item using jquery
    const listItem = $("<li"+c.toUpperCase()+"</li>");
    $(listItem).attr("class", "listGroup");
    //using data-value attribute to store the listItem as its uppcerase form inside the listGroup element
    $(listItem).attr("data-value",c.toUpperCase());
    $(".list-group").append(listItem);
}

//adding click handlers to see if application will work in browser
$("#searchButton").on("click",displayWeather);