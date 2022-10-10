let dataLocation;
let dataCurrent;
let dataForecast;
let TimeNow = setInterval(myTimer ,1000);
let generalWeather = document.querySelector('.general-weather');
let weatherInfo = document.querySelector('.weatherInfo');
let forecastWeather = document.querySelector('#forecast .row');
let windSpeed = document.querySelector('#windSpeed');
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const daysShort = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();




document.getElementById("search").addEventListener("input", e => {
    search(e.target.value)
    if(e.target.value == "")
    {
        search("auto:ip")
    }
});
search("auto:ip")


async function search(term) {
    let myHttp = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6165841cfada4e8a922213449220810&q=${term}&days=4&aqi=yes&alerts=no`);
    if (myHttp.ok && 400 != myHttp.status) {
        let Data = await myHttp.json();
        dataLocation = Data.location;
        dataCurrent = Data.current;
        dataForecast = Data.forecast.forecastday;
        displayCurrent();
        displayForecast(dataForecast); 
    }
}

function displayCurrent()
{
    weatherCondition();
    myTimer();
    let term  = `
    <img class="img-fluid weatherIcon animate__animated animate__fadeIn animate__delay-1s" src="${dataCurrent.condition.icon}" alt="">
    <h2 class="h1 animate__animated animate__fadeIn animate__delay-2s">${dataCurrent.condition.text}</h2>
    <h5 class="animate__animated animate__fadeIn animate__delay-3s">${dataLocation.name} , ${dataLocation.country} </h5>
    <h2 class="h1 animate__animated animate__fadeIn animate__delay-4s temperature">${dataCurrent.temp_c} °C</h2>
    <h5 class="animate__animated animate__fadeIn animate__delay-5s">${days[d.getDay()]}</h5>
    <h5 class="animate__animated animate__fadeIn animate__delay-6s">${d.getDate() +" "+ monthNames[d.getDate()]}</h5>
    `
    let term2 = `
    <div class="container-fluid">
    <div class="row mt-3 animate__animated animate__fadeInRight animate__delay-1s">
    <div class="offset-3 col-1 mt-2">
        <i class="bi bi-moisture"></i>
        </div>
        <div class="offset-1 col-6">
            <div class="weather-details-caption">
                <p class="m-0">Humidity</p>
                <h2>${dataCurrent.humidity} %</h2>
            </div>
        </div>
    </div>
    <div class="row mt-3 animate__animated animate__fadeInRight animate__delay-2s">
        <div class="offset-3 col-1 mt-2">
        <i class="bi bi-clouds"></i>
        </div>
        <div class="offset-1 col-6">
            <div class="weather-details-caption">
                <p class="m-0">Air pressure</p>
                <h2>${dataCurrent.pressure_mb} PS</h2>
            </div>
        </div>
    </div>
    <div class="row mt-3 animate__animated animate__fadeInRight animate__delay-4s">
        <div class="offset-3 col-1 mt-2">
        <i class="bi bi-cloud-drizzle"></i>
        </div>
        <div class="offset-1 col-6">
            <div class="weather-details-caption">
                <p class="m-0">Chance of Rain</p>
                <h2>${dataForecast[0].day.daily_chance_of_rain} %</h2>
            </div>
        </div>
    </div>
    <div class="row mt-3 animate__animated animate__fadeInRight animate__delay-6s">
        <div class="offset-3 col-1 mt-2">
        <i class="bi bi-wind"></i>
        </div>
        <div class="offset-1 col-6">
            <div class="weather-details-caption">
                <p class="m-0">Wind Speed</p>
                <h2 id="windSpeed" >${dataCurrent.wind_kph} <span class="h4">km/h</span></h2>
            </div>
        </div>
        </div>
</div>
    </div>
    `

    
    generalWeather.innerHTML = term
    weatherInfo.innerHTML = term2
}
function weatherCondition()
{
    if(dataCurrent.is_day == 0)
    {
         document.querySelector('#time').style.setProperty("--background", "url(../images/night.png)");
    }
    else
    {
        document.querySelector('#time').style.setProperty("--background", "url(../images/light.webp)");
    }

    if(dataCurrent.condition.text.includes("Clear"))
    {
         document.body.style.background = 'url("assets/images/clear.jpg") center center / cover fixed'
    }
    else if (dataCurrent.condition.text.includes("Sunny"))
    {
        document.body.style.background = 'url("assets/images/sunny.jpg") center center / cover fixed'
    }
    else if (dataCurrent.condition.text.includes("loudy"))
    {
        document.body.style.background = 'url("assets/images/cloud.jpg") center center / cover fixed'
    }
    else if (dataCurrent.condition.text.includes("Overcast"))
    {
        document.body.style.background = 'url("assets/images/overCast.jpg") center center / cover fixed'
    }
    else if (dataCurrent.condition.text.includes("Mist"))
    {
        document.body.style.background = 'url("assets/images/mist.jpg") center center / cover fixed'
    }
    else if (dataCurrent.condition.text.includes("hunder"))
    {
        document.body.style.background = 'url("assets/images/thunder.jpg") center center / cover fixed'
    }
    else if (dataCurrent.condition.text.includes("rain")||dataCurrent.condition.text.includes("drizzle"))
    {
        document.body.style.background = 'url("assets/images/rain.jpg") center center / cover fixed'
    }
    else if (dataCurrent.condition.text.includes("snow")||dataCurrent.condition.text.includes("sleet")||dataCurrent.condition.text.includes("Blizzard")||dataCurrent.condition.text.includes("pellets"))
    {
        document.body.style.background = 'url("assets/images/snow.jpg") center center / cover fixed'
    }
    else if (dataCurrent.condition.text.includes("fog")|| dataCurrent.condition.text.includes("Fog"))
    {
        document.body.style.background = 'url("assets/images/fog.jpg") center center / cover fixed'
    }
}
function myTimer() 
{
    const d = new Date();
    document.querySelector('#time').innerHTML = d.toLocaleTimeString();
}
function displayForecast(dataForecast)
{
    let term = '';
    for (let i = 1; i < dataForecast.length; i++) {
        term += `
        <div class="col-md-4 animate__animated animate__fadeIn animate__delay-${i+2}s">
        <div class="square-flip">
        <div class='square'>
        <div class="square-container">
            <h2 class="h1">${daysShort[new Date(dataForecast[i].date).getDay()]}</h2>
            <img class="img-fluid" src="${dataForecast[i].day.condition.icon}">
            <h2>${dataForecast[i].day.condition.text}</h2>
            <h2>${dataForecast[i].day.avgtemp_c} °C</h2>
        </div>
        <div class="flip-overlay"></div>
        </div>
        <div class='square2'>
        <div class="square-container2">
        <h2 class="h3"><i class="bi bi-thermometer-high"></i> ${dataForecast[i].day.maxtemp_c}°C</h2>
        <h2 class="h5 my-2 h3"><i class="bi bi-thermometer-low text-info"></i> ${dataForecast[i].day.mintemp_c}°C</h2>
        <h2 class="h3"><i class="bi bi-moisture"></i> ${dataForecast[i].day.avghumidity} %</h2>
        <h2 class="my-2 h3"><i class="bi bi-wind"></i> ${dataForecast[i].day.maxwind_kph}km/h</h2>
        <h2 class="h3"> <i class="bi bi-cloud-drizzle"></i> ${dataForecast[i].day.daily_chance_of_rain} %</h2>
        <h2 class="mt-1 h3">${dataForecast[i].day.uv} UV</h2>
        </div>
        <div class="flip-overlay"></div>
        </div>
        </div>
        </div>
        `
    }
    forecastWeather.innerHTML = term
}

