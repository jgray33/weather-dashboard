const search = document.getElementById("search")

let city = search.value


// Time ---------------------
let currentTime = moment();
let currentTimeUnix = moment()


let todayDate = currentTime.format("DD-MM-YY")
let day = moment().format("dddd")
let tomorrowDate = moment().add(1, "days").format("DD-MM-YY")
let tomorrowDay = moment().add(1, "days").format("dddd")
let dateAddTwo = moment().add(2, "days").format("DD-MM-YY")
let dayAddTwo = moment().add(2,"days").format("dddd")

console.log(tomorrowDay)


$("#today").text(todayDate)
$("#tomorrow").text(tomorrowDate)
$("#tomorrowday").text(tomorrowDay)
$("#dateAddTwo").text(dateAddTwo)
$("#dayAddTwo").text(dayAddTwo)






// Saves the city the user has input into local storage ----------------------
let saveValue = () => {
    localStorage.setItem("City", search.value)
}

let userCity = localStorage.getItem("City")
console.log(userCity)

let cityName = "London"

let inputValue = document.querySelector(".inputValue")


// To do
// Turn the local storage into an array that is then displayed under the search 
// Pull the information from the API into the weather boxes
// on click or enter of search, the user is interpolated into the api web address 
// how to get the five day 
// Get the text input from the search and save it to local storage 


// Render #

async function getTodayWeather() {
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric&cnt=40`
    const response = await fetch(requestUrl)
    const data = await response.json()
    console.log(data.list[0].dt_txt)
    let iconcode = (data.list[0].weather[0].icon)
    let iconUrl = `http://openweathermap.org/img/w/${iconcode}.png`
    let weatherDescription = data.list[0].weather[0].description
    let temperature = (Math.floor(data.list[0].main.temp))
    let humidity = data.list[0].main.humidity
    let windSpeed = data.list[0].wind.speed
    $("#0wicon").attr("src", iconUrl)
    $("#0descript").text(weatherDescription)
    $("#0temp").text(temperature) 
    $("#0humid").text(humidity) 
    $("#0ws").text(windSpeed)
}
     
async function getTomorrowWeather() {
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric&cnt=40`
    const response = await fetch(requestUrl)
    const data = await response.json()
    console.log(data.list[8].dt_txt)
    let iconcode = (data.list[8].weather[0].icon)
    let iconUrl = `http://openweathermap.org/img/w/${iconcode}.png`
    let weatherDescription = data.list[8].weather[0].description
    let temperature = (Math.floor(data.list[8].main.temp))
    let humidity = data.list[8].main.humidity
    let windSpeed = data.list[8].wind.speed
    $("#1wicon").attr("src", iconUrl)
    $("#1descript").text(weatherDescription)
    $("#1temp").text(temperature) 
    $("#1humid").text(humidity) 
    $("#1ws").text(windSpeed)
}

async function getDayThreeWeather() {
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric&cnt=40`
    const response = await fetch(requestUrl)
    const data = await response.json()
    console.log(data.list[16].dt_txt)
    let iconcode = (data.list[16].weather[0].icon)
    let iconUrl = `http://openweathermap.org/img/w/${iconcode}.png`
    let weatherDescription = data.list[16].weather[0].description
    let temperature = (Math.floor(data.list[16].main.temp))
    let humidity = data.list[16].main.humidity
    let windSpeed = data.list[16].wind.speed
    $("#2wicon").attr("src", iconUrl)
    $("#2descript").text(weatherDescription)
    $("#2temp").text(temperature) 
    $("#2humid").text(humidity) 
    $("#2ws").text(windSpeed)
}

async function getDayFourWeather() {
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric&cnt=40`
    const response = await fetch(requestUrl)
    const data = await response.json()
    console.log(data.list[24].dt_txt)
    let iconcode = (data.list[24].weather[0].icon)
    let iconUrl = `http://openweathermap.org/img/w/${iconcode}.png`
    let weatherDescription = data.list[24].weather[0].description
    let temperature = (Math.floor(data.list[24].main.temp))
    let humidity = data.list[24].main.humidity
    let windSpeed = data.list[24].wind.speed
    $("#3wicon").attr("src", iconUrl)
    $("#3descript").text(weatherDescription)
    $("#3temp").text(temperature) 
    $("#3humid").text(humidity) 
    $("3ws").text(windSpeed)
}

async function getDayFiveWeather() {
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric&cnt=40`
    const response = await fetch(requestUrl)
    const data = await response.json()
    console.log(data.list[32].dt_txt)
    let iconcode = (data.list[32].weather[0].icon)
    let iconUrl = `http://openweathermap.org/img/w/${iconcode}.png`
    let weatherDescription = data.list[32].weather[0].description
    let temperature = (Math.floor(data.list[32].main.temp))
    let humidity = data.list[32].main.humidity
    let windSpeed = data.list[32].wind.speed
    $("#4wicon").attr("src", iconUrl)
    $("#4descript").text(weatherDescription)
    $("#4temp").text(temperature) 
    $("#4humid").text(humidity) 
    $("4ws").text(windSpeed)
}

async function getDaySixWeather() {
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric&cnt=50`
    const response = await fetch(requestUrl)
    const data = await response.json()
    console.log(data.list[40].dt_txt)
    let iconcode = (data.list[40].weather[0].icon)
    let iconUrl = `http://openweathermap.org/img/w/${iconcode}.png`
    let weatherDescription = data.list[40].weather[0].description
    let temperature = (Math.floor(data.list[40].main.temp))
    let humidity = data.list[40].main.humidity
    let windSpeed = data.list[40].wind.speed
    $("#5wicon").attr("src", iconUrl)
    $("#5descript").text(weatherDescription)
    $("#5temp").text(temperature) 
    $("#5humid").text(humidity) 
    $("5ws").text(windSpeed)
}



getTodayWeather()
getTomorrowWeather()
getDayThreeWeather()
getDayFourWeather()
getDayFiveWeather()
getDaySixWeather()



// // Retrieves API data in 24 hour periods ------------------------
// // Count is every three hours - we need every eight 
// countArray = [0,8,16,24,32]
// for (let i = 0; i < countArray.length; i++) {
//     getApi(countArray[i])    
// }

