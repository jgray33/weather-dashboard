// Elements ------------------------------------------------------------
let currentTime = moment();
let todayDate = currentTime.format("DD-MM-YY");
let day = moment().format("dddd");
let cityName;
let cityLat;
let cityLon;

$(document).on("click", "#citySearch", () => {
  console.log(this.event.target.value, "this is the city i want");
});

loadHistory();

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
  $("#searchList").append(`<li><button id='citySearch' value=${new_data} > ${new_data} </button></li>`);
  getLongLat();
}

// Loads the search history on load ----------------------------------------
function loadHistory() {
  let userCityList = JSON.parse(localStorage.getItem("cityList"));
  for (let i = 0; i < userCityList.length; i++) {
    $("#searchList").append(
      `<li><button onclick=getLongLat()>  ${userCityList[i]} </button></li>`
    );
  }
}

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

// Load today's ----------------------------------------------------
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

async function getApi(cityLat, cityLon) {
  let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&appid=f7709e138c9db02bf881e5c64600209b&units=metric`;
  const response = await fetch(requestUrl);
  const data = await response.json();
  console.log(data, "forecast");

  const forecast = 6;
  // Render cards ---------------------------------------------
  for (let i = 1; i < forecast; i++) {
    const forecastDate = new Date(data.daily[i].dt * 1000);
    const forecastDay = forecastDate.getDate();
    const forecastMonth = forecastDate.getMonth();
    const forecastYear = forecastDate.getFullYear();
    const forecastDateText =
      forecastDay + "/" + forecastMonth + "/" + forecastYear;
    var output = `
    <div class="col-md6>
    <div class="card" style="width: 18rem;">
    <img src="https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${forecastDate}</h5>
      <div class="card-text">
      <p>Temperature: ${data.daily[i].temp.day}</p>
      <p> Humidity: ${data.daily[i].humidity}</p>
      <p> Wind Speed: ${data.daily[i].wind_speed}</p></div>
    </div>
  </div>
  </div>`;

    $(".weather-card").append(output);
  }
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
