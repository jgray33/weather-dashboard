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

// Fetching data from weather API ---------------------------------------
// async function getApi() {
//     let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric&cnt=5`
//     const response = await fetch(requestUrl)
//     const data = await response.json()
//     // Today's weather
//     let iconcode = (data.list[0].weather[0].icon)
//     let iconUrl = `http://openweathermap.org/img/w/${iconcode}.png`
//     $("#wicon").attr("src", iconUrl)
//     $("#0descript").text(data.list[0].weather[0].description)
//     $("#0temp").text(Math.floor(data.list[0].main.temp))
//     console.log(data)
//     $("#0humid").text(data.list[0].main.humidity)
//     $("#0ws").text(data.list[0].wind.speed)
//        }
// getApi()

// // Day 1 weather
// async function getApi1() {
//     let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric&cnt=5`
//     const response = await fetch(requestUrl)
//     const data = await response.json()
//     let iconcode = (data.list[1].weather[0].icon)
//     let iconUrl = `http://openweathermap.org/img/w/${iconcode}.png`
//     $("#day1icon").attr("src", iconUrl)
//     $("#1descript").text(data.list[1].weather[0].description)
//     $("#1temp").text(Math.floor(data.list[1].main.temp))
//     console.log(data)
//     $("#1humid").text(data.list[1].main.humidity)
//     $("#1ws").text(data.list[1].wind.speed)
//        }

// getApi1()

// // Day 2 weather
// async function getApi2() {
//     let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric&cnt=5`
//     const response = await fetch(requestUrl)
//     const data = await response.json()
//     console.log(data.list[2].weather[0].icon)
//     let iconcode = (data.list[2].weather[0].icon)
//     let iconUrl = `http://openweathermap.org/img/w/${iconcode}.png`
//     $("#day2icon").attr("src", iconUrl)
//     $("#2descript").text(data.list[2].weather[0].description)
//     $("#2temp").text(Math.floor(data.list[2].main.temp))
    
//     $("#2humid").text(data.list[2].main.humidity)
//     $("#2ws").text(data.list[2].wind.speed)
//        }

// getApi2()














// To do
// Turn the local storage into an array that is then displayed under the search 
// Pull the information from the API into the weather boxes
// on click or enter of search, the user is interpolated into the api web address 
// how to get the five day 
// Get the text input from the search and save it to local storage 


// Render #

async function getApi(index) {
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric&cnt=40`
    const response = await fetch(requestUrl)
    const data = await response.json()
    console.log(data)
    let iconcode = (data.list[index].weather[0].icon)
    let iconUrl = `http://openweathermap.org/img/w/${iconcode}.png`
    $("#wicon").attr("src", iconUrl)
    $("#0descript").text(data.list[index].weather[0].description)
    $("#0temp").text(Math.floor(data.list[index].main.temp))
    $("#0humid").text(data.list[index].main.humidity)
    console.log(data.list[index])
    console.log(data.list[index].dt_txt)
    $("#0ws").text(data.list[index].wind.speed)
       }

// Retrieves API data in 24 hour periods ------------------------
// Count is every three hours - we need every eight 
countArray = [0,8,16,24,32]
for (let i = 0; i < countArray.length; i++) {
    getApi(countArray[i])    
}

