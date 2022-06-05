// Elements -----------------------------------------------------------------------
let currentTime = moment();
let todayDate = currentTime.format("DD-MM-YY");
let day = moment().format("dddd");
let cityName;
let cityLat;
let cityLon;

// On opening of page, load the search history ------------------------------------
window.onload = function () {
  loadHistory();
  $("#input").val("Birmingham, GB");
  getLongLat();
};

// Search on pressing Enter or on clicking search ----------------------------------
$("#search-bttn").click(save());

$("#input").keydown(function (event) {
  if (event.which == 13) {
    console.log("Clicked enter");
    const query = $("#input").val();
    if (query == "") {
      console.log("nothing entered");
      showModal();
    } else {
      save(query);
    }
  }
});

// Saving data into local storage as an array-------------------------------------
function save() {
  //Get the data from the user's search
  let new_data = $("input").val();
  if (localStorage.getItem("cityList") == null) {
    localStorage.setItem("cityList", "[]");
  }
  let old_list = JSON.parse(localStorage.getItem("cityList"));
  old_list.push(new_data);
  localStorage.setItem("cityList", JSON.stringify(old_list));
  loadHistory()
  }

// Loads the search history on load --------------------------------------------------
function loadHistory() {
  $("#searchList").html("")
  // Get the search history from local storage
  let userCityList = JSON.parse(localStorage.getItem("cityList"));
  // Filter out the empty searches
  let filteredList = userCityList.filter(e => e)
  let noRepeats = [...new Set(filteredList)]
    for (let i = 0; i < noRepeats.length; i++) {   
    // Adds the user's search to the search list
    $("#searchList").append(
      `<li class="searchList"><button class="button citySearch" value="${noRepeats[i]}"> <i class="fas fa-search"></i> ${noRepeats[i]}   </button></li>`
    );
  }
  getLongLat()
}


// Gets the data to attain the city's latitude and long --------------------------------
async function getLongLat() {
  let cityName = $("#input").val();
  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric&cnt=40`;
  const response = await fetch(requestUrl);
  const data = await response.json();
  const lat = data.city.coord.lat;
  const lon = data.city.coord.lon;
  renderTodayWeather(data);
  getApi(lat, lon);
}


// Search for city once clicked  ------------------------------------------------------
$(document).on("click", $("#citySearch"), (event) => {
  console.log("clicked", event.target.value);
  $("#input").val(event.target.value);
  getLongLat();
});


// Load today's weather data ----------------------------------------------------
async function renderTodayWeather(data) {
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

// Loads the forecast data and renders the cards -------------------------------------
async function getApi(cityLat, cityLon) {
  let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&appid=f7709e138c9db02bf881e5c64600209b&units=metric`;
  const response = await fetch(requestUrl);
  const data = await response.json();
  const forecast = 6;
  // Render cards ---------------------------------------------
  $(".weather-card").html("");
  for (let i = 1; i < forecast; i++) {
    const forecastDate = new Date(data.daily[i].dt * 1000);
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = weekday[forecastDate.getDay()];
    const forecastDay = forecastDate.getDate();
    const forecastMonth = forecastDate.getMonth() + 1;
    const forecastYear = forecastDate.getFullYear();
    const forecastDateText =
      forecastDay + "/" + forecastMonth + "/" + forecastYear;
    // Dynamically creates the card ------------------------------------------
    var output = `
    <div class="col rendered-cards"> 
    <div class="row"> 
    <div class="col rendered-date">
    <h5><b>${day}</b></h5>
    <p>${forecastDateText}<p>
    </div>
    <div class ="col">   
      <img class="weather-icon" src="https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png" alt="weather icon">
      </div>
    </div>
    <hr>
      <div class="row">
      <p><b>Temperature:</b> ${data.daily[i].temp.day} &#176C</p>
      <p><b> Humidity:</b> ${data.daily[i].humidity} %</p>
      <p><b> Wind Speed:</b> ${data.daily[i].wind_speed} MPH</p>
      </div>
    </div>

`;
    $(".weather-card").append(output);
  }
  // Change color depending on UVI---------------------------------
  let uvi = data.current.uvi;
  $("#UV").text(uvi);
  if (uvi <= 2) {
    $("#UV").addClass("favorable");
  } else if (uvi <= 5) {
    $("#UV").addClass("moderate");
  } else if (uvi > 5) {
    $("#UV").addClass("severe");
  }
}

function showModal() {
  console.log("modal to appear");
}

// Go through the search history and if it's the same as input don't add to local storage
// for (let i = 0; i < old_list.length; i++) {
//   if (new_data === old_list[i]) {
//     console.log("There's a repeat")
//     return
//   }
