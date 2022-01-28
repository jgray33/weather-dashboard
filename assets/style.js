const search = document.getElementById("search")

let city = search.value




// Time ---------------------
let currentTime = moment();
let todayDate = currentTime.format("DD-MM-YY")
let tomorrowDate = moment().add(1, "days").format("DD-MM-YY")
let dateAddTwo = moment().add(2, "days").format("DD-MM-YY")

console.log(dateAddTwo)



$("#today").text(todayDate)
$("#tomorrow").text(tomorrowDate)
$("#dateAddTwo").text(dateAddTwo)
// $("0temp").text(data.temp)

$




// Saves the city the user has input into local storage ----------------------
let saveValue = () => {
    localStorage.setItem("City", search.value)
}

let userCity = localStorage.getItem("City")
console.log(userCity)

let cityName = "Birmingham"


// Fetching data from weather API ---------------------------------------
async function getApi() {
    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric`
    const response = await fetch(requestUrl)
    const data = await response.json()
    $("#0descript").text(data.weather[0].description)
    $("#0temp").text(data.main.temp)
    $("#0humid").text(data.main.humidity)
    $("#0ws").text(data.wind.speed)
    console.log(data)
    let iconcode = (data.weather[0].icon)
    let iconUrl = `http://openweathermap.org/img/w/${iconcode}.png`
    $("#wicon").attr("src", iconUrl)
    }

getApi()




// To do
// Turn the local storage into an array that is then displayed under the search 
// Pull the information from the API into the weather boxes
// on click or enter of search, the user is interpolated into the api web address 
// how to get the five day 
// Get the text input from the search and save it to local storage 