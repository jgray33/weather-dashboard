
// Time ---------------------
let currentTime = moment();


let todayDate = currentTime.format("DD-MM-YY")
let day = moment().format("dddd")
let tomorrowDate = moment().add(1, "days").format("DD-MM-YY")
let tomorrowDay = moment().add(1, "days").format("dddd")
let dateAddTwo = moment().add(2, "days").format("DD-MM-YY")
let dayAddTwo = moment().add(2,"days").format("dddd")
let dateAddThree = moment().add(3,"days").format("DD-MM-YY")
let dayAddThree = moment().add(3, "days").format("dddd")
let dateAddFour = moment().add(4,"days").format("DD-MM-YY")
let dayAddFour = moment().add(4,"days").format("dddd")
let dateAddFive = moment().add(5,"days").format("DD-MM-YY")
let dayAddFive = moment().add(5,"days").format("dddd")



$("#today").text(todayDate)
$("#tomorrow").text(tomorrowDate)
$("#tomorrowday").text(tomorrowDay)
$("#dateAddTwo").text(dateAddTwo)
$("#dayAddTwo").text(dayAddTwo)
$("#dateAddThree").text(dateAddThree)
$("#dayAddThree").text(dayAddThree)
$("#dateAddFour").text(dateAddFour)
$("#dayAddFour").text(dayAddFour)
$("#dateAddFive").text(dateAddFive)
$("#dayAddFive").text(dayAddFive)








// Saves the city the user has input into local storage ----------------------
function saveValue() {
    let searchHistory = ["Birmingham", "Coventry"];
localStorage.setItem("City", JSON.stringify(searchHistory))
let cityData = $("search").val()

searchHistory= localStorage.getItem("City")
console.log(searchHistory)
}

        if (localStorage.getItem("city") == null){
        localStorage.setItem("city", "[]")

    // }
    // searchHistory = JSON.parse(localStorage.getItem("city"))
    //     let cityData = $("#search").val()
    //     searchHistory.push(cityData)
    //     localStorage.setItem("city", JSON.stringify(searchHistory))


//     searchHistory = localStorage.getItem("city")
// searchHistory.push(cityData)




  
}



let cityName = "London"



// To do
// Turn the local storage into an array that is then displayed under the search 
// Pull the information from the API into the weather boxes
// on click or enter of search, the user is interpolated into the api web address 
// how to get the five day 
// Get the text input from the search and save it to local storage 


// Get the lat long data and store in local storage 
async function getLongLat() {
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric&cnt=40`
    const response = await fetch(requestUrl)
    const data = await response.json()
    let lat = data.city.coord.lat
    let lon = data.city.coord.lon
    localStorage.setItem("lat", lat)
    localStorage.setItem("lon", lon)
    console.log(data)
    }
getLongLat()

let cityLat = localStorage.getItem("lat")
let cityLon = localStorage.getItem("lon")
console.log(cityLat)
console.log(cityLon)

// Using OneCall 
async function getUV() {
    let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&appid=f7709e138c9db02bf881e5c64600209b`
    const response = await fetch(requestUrl)
    const data = await response.json()
    console.log(data)
    let uvi = data.current.uvi
    $("#UV").text(uvi)
    if ( uvi <= 2) {
        $("#UV").addClass("favorable")
    } else if (uvi <= 5) {
        $("#UV").addClass("moderate")
    } else if (uvi > 5) {
        $("#UV").addClass("severe")
    console.log(data.current.uvi)
    }
}
    // Favorable = 0 - 2
    // Moderate = 3 - 5
    // Sever = 5 above  

getUV()

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
    $("#3ws").text(windSpeed)
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
    $("#4ws").text(windSpeed)
    console.log(windSpeed)
}


async function getDaySixWeather() {
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric&cnt=40`
    const response = await fetch(requestUrl)
    const data = await response.json()
    console.log(data.list[39].dt_txt)
    let iconcode = (data.list[39].weather[0].icon)
    let iconUrl = `http://openweathermap.org/img/w/${iconcode}.png`
    let weatherDescription = data.list[39].weather[0].description
    let temperature = (Math.floor(data.list[39].main.temp))
    let humidity = data.list[39].main.humidity
    let windSpeed = data.list[39].wind.speed
    $("#5wicon").attr("src", iconUrl)
    $("#5descript").text(weatherDescription)
    $("#5temp").text(temperature) 
    $("#5humid").text(humidity) 
    $("#5ws").text(windSpeed)
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



