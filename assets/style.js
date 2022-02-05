// Elements ------------------------------------------------------------
let currentTime = moment();
let todayDate = currentTime.format("DD-MM-YY");
let day = moment().format("dddd");
let cityName;
let cityLat;
let cityLon;


loadHistory();
$("#search-bttn").click(save())


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
  let userCityList = JSON.parse(localStorage.getItem("cityList"));
  console.log(userCityList);
  $("#searchList").append(
    `<li><button class= "btn btn-outline citySearch" value=${new_data}> ${new_data} </button></li>`
  );
  getLongLat();
}

// Loads the search history on load --------------------------------------------------
function loadHistory() {
  if (localStorage.getItem("cityList") == null) {
    $("#input").val("Birmingham,GB");
    getLongLat();

  } else {
    let userCityList = JSON.parse(localStorage.getItem("cityList"));
    for (let i = 0; i < userCityList.length; i++) {
      // Adds the user's search to the search list
      $("#searchList").append(
        `<li><button>  ${userCityList[i]} </button></li>`
      );
    }
    $("#input").val("Birmingham,GB");
    getLongLat();
    }
}

// Gets the data to attain the city's latitude and long --------------------------------
async function getLongLat() {
  let cityName = $("#input").val();
  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric&cnt=40`;
  const response = await fetch(requestUrl);
  const data = await response.json();
  console.log(data);
  const lat = data.city.coord.lat;
  const lon = data.city.coord.lon;
  renderTodayWeather(data);
  getApi(lat, lon);
}

$(".citySearch").on("click", () => {
  console.log("clicked");
  getLongLat(this.event.target.value);
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
  $(".weather-card").html("")
  for (let i = 1; i < forecast; i++) {
    const forecastDate = new Date(data.daily[i].dt * 1000);
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let day = weekday[forecastDate.getDay()]
    const forecastDay = forecastDate.getDate();
    const forecastMonth = forecastDate.getMonth()+1;
    const forecastYear = forecastDate.getFullYear();
    const forecastDateText = forecastDay + "/" + forecastMonth + "/" + forecastYear;
    // Dynamically creates the card ------------------------------------------
    var output = `
    <div class="col-md6>
    <div class="card" style="width: 15rem">
        <div class="card-body">
        <img src="https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png" class="card-img-top" alt="weather icon" style="width:50%; height:50%">
      <h5 class="card-title">${day}</h5>
      <h5 class="card-title">${forecastDateText}</h5>
      <div class="card-text">
      <p><b>Temperature:</b> ${data.daily[i].temp.day}</p>
      <p><b> Humidity:</b> ${data.daily[i].humidity}</p>
      <p><b> Wind Speed:</b> ${data.daily[i].wind_speed}</p></div>
    </div>
  </div>
  </div>`;
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
