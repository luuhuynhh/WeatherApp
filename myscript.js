let _card = document.querySelector(".card");
let _search = document.querySelector(".search");
let _searchBar = document.querySelector(".search-bar");
let _searchBtn = document.querySelector("button");

let _weather = document.querySelector(".weather");
let _city = document.querySelector(".city");
let _temp = document.querySelector(".temp");
let _img = document.querySelector("img");
let _description = document.querySelector(".decription");
let _humidity = document.querySelector(".humidity");
let _windSpeed = document.querySelector(".wind-speed");

// enter search listener
_searchBar.addEventListener('keyup', e =>{
    if(e.key == 'Enter' && _searchBar.value != ""){
        requestApi(_searchBar.value);
        //getLocation(_searchBar.value);
    }
})

const apiKey = "f6bf77dbe2ee76b4f17aa176d7088aba";

function requestApi(city){
    let api =`https://api.openweathermap.org/data/2.5/weather?q=${city},CA&appid=${apiKey}`;
    fetch(api).then(res => console.log(res.json()));
}

function getLocation(city){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else{
        alert("Your browser not support geolocation api")
    }
}

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    fetchData(api);
}

function fetchData(api){
    fetch(api).then(respone => respone.json()).then(result => weatherDetails(result));
}

function onError(error)
{
    console.log(error);
}
function weatherDetails(info){
    const city = info.name;
    const country = info.sys.country;
    const {description, id} = info.weather[0];
    const {humidity, temp} = info.main;
    _city.innerHTML = city + ", " + country;
    _description.innerHTML = description;
    _temp.innerHTML = temp;
    _humidity.innerHTML = `${humidity}%`;
    _img.alt = id;
}