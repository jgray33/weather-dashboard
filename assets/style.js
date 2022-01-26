const search = document.getElementById("search")

let city = search.value




// Saves the city the user has input into local storage ----------------------
let saveValue = () => {
    localStorage.setItem("City", search.value)
}

let cityName = "Birmingham"


function getApi() {
    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f7709e138c9db02bf881e5c64600209b&units=metric`
        fetch(requestUrl)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data)
    })}

getApi()

// async function attainApi() {
//     let requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=Birmingham&appid=f7709e138c9db02bf881e5c64600209b&units=metric"
//     const response = await fetch(requestUrl)
//     const data = await response.json()
//     console.log(data)
// }

// attainApi()



// To do
// Turn the local storage into an array that is then displayed under the search 
// Pull the information from the API into the weather boxes
// on click or enter of search, the user is interpolated into the api web address 
// how to get the five day 
// Get the text input from the search and save it to local storage 