// Time ---------------------
let currentTime = moment();
let todayDate = currentTime.format("DD-MM-YY");
let day = moment().format("dddd");
let cityName;

$("#today").text(todayDate);

// Loads default data as Birmingham, GB -------------------------------------
$(document).ready(function windowLoad() {
  cityName = "Birmingham,GB";
  localStorage.setItem("lat", 52.4814);
  localStorage.setItem("lon", -1.8998);
  getTodayWeather();
  getUV();
});


// Saves the city the user has input into local storage ----------------------
$("#searchForCity").click(searchForCity);
function searchForCity(e) {
  e.preventDefault();
  cityName = $("#search:text").val();
  localStorage.setItem("UserSearch", cityName);
  getTodayWeather();
  getUV();
  $("#searchList").append(`<p> ${cityName}</p>`);
}


// Get the lat long data and store in local storage ------------------
async function getTodayWeather() {
  cityName =$("#search").val()
  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric&cnt=40`;
  const response = await fetch(requestUrl);
  const data = await response.json();
  localStorage.setItem("lat", data.city.coord.lat);
  localStorage.setItem("lon", data.city.coord.lon);
  //   Render the data into the html ----------------------------------
  $("#cityName").text(data.city.name + ", " + data.city.country);
  console.log(data);
  let iconcode = data.list[0].weather[0].icon;
  let iconUrl = `http://openweathermap.org/img/w/${iconcode}.png`;
  $("#wicon").attr("src", iconUrl);
  $("#temp").text(Math.floor(data.list[0].main.temp));
  $("#humid").text(data.list[0].main.humidity);
  $("#ws").text(data.list[0].wind.speed);
  $("#descript").text(data.list[0].weather[0].description.toUpperCase());
}

// Get UV data -----------------------------------------------------------------
async function getUV() {
  let cityLat = localStorage.getItem("lat");
  let cityLon = localStorage.getItem("lon");
  let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&appid=f7709e138c9db02bf881e5c64600209b`;
  const response = await fetch(requestUrl);
  const data = await response.json();
  console.log(data);
  let uvi = data.current.uvi;
  $("#UV").text(uvi);
  // Change color depending on UVI---------------------------------
  if (uvi <= 2) {
    $("#UV").addClass("favorable");
  } else if (uvi <= 5) {
    $("#UV").addClass("moderate");
  } else if (uvi > 5) {
    $("#UV").addClass("severe");
    }
}

getApi(1)

let weatherCards = $(".weather-card");
async function getApi(i) {
  let cityLat = localStorage.getItem("lat");
  let cityLon = localStorage.getItem("lon");
  let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&appid=f7709e138c9db02bf881e5c64600209b&units=metric`;
  const response = await fetch(requestUrl);
  const data = await response.json();
  console.log(data);
  
  // Render cards ---------------------------------------------
  for (let i = 1; i < weatherCards.length; i++) {
    console.log(weatherCards[i]);
    console.log(data)
    console.log(i);
    weatherCards[i].append(`Humidity: ${data.daily[i].humidity}`);
    weatherCards[i].append(`Date: ${data.daily[i].dt}`);
    weatherCards[i].append(`Temperature: ${data.daily[i].temp.day}`);
      }
}



// // // Rendering forecast --------------------------------------------

// // async function getTodayWeather() {
// //   let cityName = $("#search:text").val();
// //   let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric&cnt=40`;
// //   const response = await fetch(requestUrl);
// //   const data = await response.json();
// //   console.log(data.list[0].dt_txt);

// //   let iconcode = data.list[0].weather[0].icon;
// //   let iconUrl = `http://openweathermap.org/img/w/${iconcode}.png`;
// //   let weatherDescription = data.list[0].weather[0].description;
// //   let temperature = Math.floor(data.list[0].main.temp);
// //   let humidity = data.list[0].main.humidity;
// //   let windSpeed = data.list[0].wind.speed;
// //   $("#0wicon").attr("src", iconUrl);
// //   $("#0descript").text(weatherDescription);
// //   $("#0temp").text(temperature);
// //   $("#0humid").text(humidity);
// //   $("#0ws").text(windSpeed);
// // }

// // async function getTomorrowWeather() {
// //   let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric&cnt=40`;
// //   const response = await fetch(requestUrl);
// //   const data = await response.json();
// //   console.log(data.list[8].dt_txt);
// //   let iconcode = data.list[8].weather[0].icon;
// //   let iconUrl = `http://openweathermap.org/img/w/${iconcode}.png`;
// //   let weatherDescription = data.list[8].weather[0].description;
// //   let temperature = Math.floor(data.list[8].main.temp);
// //   let humidity = data.list[8].main.humidity;
// //   let windSpeed = data.list[8].wind.speed;
// //   $("#1wicon").attr("src", iconUrl);
// //   $("#1descript").text(weatherDescription);
// //   $("#1temp").text(temperature);
// //   $("#1humid").text(humidity);
// //   $("#1ws").text(windSpeed);
// // }

// // async function getDayThreeWeather() {
// //   let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric&cnt=40`;
// //   const response = await fetch(requestUrl);
// //   const data = await response.json();
// //   console.log(data.list[16].dt_txt);
// //   let iconcode = data.list[16].weather[0].icon;
// //   let iconUrl = `http://openweathermap.org/img/w/${iconcode}.png`;
// //   let weatherDescription = data.list[16].weather[0].description;
// //   let temperature = Math.floor(data.list[16].main.temp);
// //   let humidity = data.list[16].main.humidity;
// //   let windSpeed = data.list[16].wind.speed;
// //   $("#2wicon").attr("src", iconUrl);
// //   $("#2descript").text(weatherDescription);
// //   $("#2temp").text(temperature);
// //   $("#2humid").text(humidity);
// //   $("#2ws").text(windSpeed);
// // }

// // async function getDayFourWeather() {
// //   let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric&cnt=40`;
// //   const response = await fetch(requestUrl);
// //   const data = await response.json();
// //   console.log(data.list[24].dt_txt);
// //   let iconcode = data.list[24].weather[0].icon;
// //   let iconUrl = `http://openweathermap.org/img/w/${iconcode}.png`;
// //   let weatherDescription = data.list[24].weather[0].description;
// //   let temperature = Math.floor(data.list[24].main.temp);
// //   let humidity = data.list[24].main.humidity;
// //   let windSpeed = data.list[24].wind.speed;
// //   $("#3wicon").attr("src", iconUrl);
// //   $("#3descript").text(weatherDescription);
// //   $("#3temp").text(temperature);
// //   $("#3humid").text(humidity);
// //   $("#3ws").text(windSpeed);
// // }

// // async function getDayFiveWeather() {
// //   let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric&cnt=40`;
// //   const response = await fetch(requestUrl);
// //   const data = await response.json();
// //   console.log(data.list[32].dt_txt);
// //   let iconcode = data.list[32].weather[0].icon;
// //   let iconUrl = `http://openweathermap.org/img/w/${iconcode}.png`;
// //   let weatherDescription = data.list[32].weather[0].description;
// //   let temperature = Math.floor(data.list[32].main.temp);
// //   let humidity = data.list[32].main.humidity;
// //   let windSpeed = data.list[32].wind.speed;
// //   $("#4wicon").attr("src", iconUrl);
// //   $("#4descript").text(weatherDescription);
// //   $("#4temp").text(temperature);
// //   $("#4humid").text(humidity);
// //   $("#4ws").text(windSpeed);
// //   console.log(windSpeed);
// // }

// // async function getDaySixWeather() {
// //   let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric&cnt=40`;
// //   const response = await fetch(requestUrl);
// //   const data = await response.json();
// //   console.log(data.list[39].dt_txt);
// //   let iconcode = data.list[39].weather[0].icon;
// //   let iconUrl = `http://openweathermap.org/img/w/${iconcode}.png`;
// //   let weatherDescription = data.list[39].weather[0].description;
// //   let temperature = Math.floor(data.list[39].main.temp);
// //   let humidity = data.list[39].main.humidity;
// //   let windSpeed = data.list[39].wind.speed;
// //   $("#5wicon").attr("src", iconUrl);
// //   $("#5descript").text(weatherDescription);
// //   $("#5temp").text(temperature);
// //   $("#5humid").text(humidity);
// //   $("#5ws").text(windSpeed);
// // }
