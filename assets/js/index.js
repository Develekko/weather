let dataLocation;
let dataCurrent;
let dataForecast;
let TimeNow = setInterval(myTimer ,1000);
let generalWeather = document.querySelector('.general-weather');
let weatherInfo = document.querySelector('.weatherInfo');
let forecastWeather = document.querySelector('#forecast .row');
let windSpeed = document.querySelector('#windSpeed');
let currentTime = document.querySelector('#time')
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
    currentTime.classList.remove("animate__animated","animate__fadeInDown","animate__delay-1s");
    document.querySelector('#time').style.setProperty("--timeframe", "unset");
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
    currentTime.classList.add("animate__animated","animate__fadeInDown","animate__delay-1s");
    weatherCondition();
    let term  = `
    <img class="img-fluid weatherIcon animate__animated animate__fadeIn animate__delay-1s" src="${dataCurrent.condition.icon}" alt="">
    <h2 class="h1 weatherText animate__animated animate__fadeIn animate__delay-2s">${dataCurrent.condition.text}</h2>
    <h5 class="weatherLocation animate__animated animate__fadeIn animate__delay-3s">${dataLocation.name} , ${dataLocation.country} </h5>
    <h2 temp="C" class="h1 d-inline animate__animated animate__fadeIn animate__delay-4s temperature">${dataCurrent.temp_c} °<span class="animate__animated animate__bounce tempTxt d-inline-block animate__delay-5s">C</span></button></h2>
    <h5 class="animate__animated animate__fadeIn animate__delay-5s">${days[d.getDay()]}</h5>
    <h5 class="animate__animated animate__fadeIn animate__delay-6s">${d.getDate() +" "+ monthNames[d.getMonth()]}</h5>
    `
    let term2 = `
    <div class="container-fluid">
    <div class="row">
    <div class="col-6 col-md-12">

    <div class="container">
    <div class="row mt-3 animate__animated animate__fadeInRight animate__delay-1s">
    <div class=" col-2 col-xl-2 offset-xl-3 col-xxl-2 offset-xxl-4 col-sm-2 offset-sm-1 p-0 ">
        <i class="bi bi-moisture"></i>
        </div>
        <div class="col-10 col-xl-7 col-xxl-6 col-sm-9  p-0 ps-2">
            <div class="weather-details-caption">
                <p class="m-0">Humidity</p>
                <h2 class="humidityAlert">${dataCurrent.humidity} %</h2>
            </div>
        </div>
    </div>
    </div>
    </div>

    <div class="col-6 col-md-12">
    <div class="container-fluid">
    <div class="row mt-3 animate__animated animate__fadeInRight animate__delay-2s">

    <div class=" col-2 col-xl-2 offset-xl-3 col-xxl-2 offset-xxl-4 col-sm-2 offset-sm-1 p-0 ">
        <i class="bi bi-clouds"></i>
        </div>
        <div class="col-10 col-xl-7 col-xxl-6 col-sm-9  p-0 ps-2">
            <div class="weather-details-caption">
                <p class="m-0">Air pressure</p>
                <h2>${dataCurrent.pressure_mb} PS</h2>
            </div>
        </div>
        </div>
    </div>
    </div>


  <div class="col-6 col-md-12">
  <div class="container-fluid">
    <div class="row mt-3 animate__animated animate__fadeInRight animate__delay-4s">

        <div class=" col-2 col-xl-2 offset-xl-3 col-xxl-2 offset-xxl-4 col-sm-2 offset-sm-1 p-0 ">
        <i class="bi bi-cloud-drizzle"></i>
        </div>
        <div class="col-10 col-xl-7 col-xxl-6 col-sm-9  p-0 ps-2">
            <div class="weather-details-caption ">
                <p class="m-0">Chance of Rain</p>
                <h2>${dataForecast[0].day.daily_chance_of_rain} %</h2>
            </div>
        </div>
        </div>
    </div>
    </div>



  <div class="col-6 col-md-12">
  <div class="container-fluid">
    <div class="row mt-3 animate__animated animate__fadeInRight animate__delay-6s">
    <div class=" col-2 col-xl-2 offset-xl-3 col-xxl-2 offset-xxl-4 col-sm-2 offset-sm-1 p-0 ">
        <i class="bi bi-wind"></i>
        </div>
        <div class="col-10 col-xl-7 col-xxl-6 col-sm-9  p-0 ps-2">
            <div class="weather-details-caption">
                <p class="m-0">Wind Speed</p>
                <h2 id="windSpeed">${dataCurrent.wind_kph} <span class="h4">km/h</span></h2>
            </div>
        </div>
        </div>
        </div>
        </div>

</div>
</div>
    </div>
    `
    generalWeather.innerHTML = term;
    weatherInfo.innerHTML = term2;

    let temp = document.querySelector(".temperature")
    temp.addEventListener("click",function(){
        if(temp.getAttribute("temp")== "C")
        {
            temp.innerHTML = `${dataCurrent.temp_f} °F`;
            temp.setAttribute("temp","F");
            temp.classList.remove("animate__fadeIn","animate__animated","animate__delay-4s");
        }
        else
        {
            temp.classList.add("animate__fadeIn","animate__animated");
            temp.innerHTML = `${dataCurrent.temp_c} °C`;
            temp.setAttribute("temp","C");
        }
    })
}
function displayForecast(dataForecast)
{
    let term = '';
    for (let i = 1; i < dataForecast.length; i++) {
        term += `
        <div class="col-md-4 mt-3 d-flex animate__animated animate__fadeIn animate__delay-${i+2}s">
        <div class="square-flip">
        <div class='square'>
        <div class="square-container">
            <h2 class="h1 forcastDay">${daysShort[new Date(dataForecast[i].date).getDay()]}</h2>
            <img class="img-fluid forcastIcon" src="${dataForecast[i].day.condition.icon}">
            <h2 class="forcastText">${dataForecast[i].day.condition.text}</h2>
            <h2 class="forcastTemp">${dataForecast[i].day.avgtemp_c} °C</h2>
        </div>
        <div class="flip-overlay"></div>
        </div>
        <div class='square2'>
        <div class="square-container2">
        <h2 class="h3 forcastTempMax"><i class="bi bi-thermometer-high"></i> ${dataForecast[i].day.maxtemp_c}°C</h2>
        <h2 class=" my-2 h5 forcastTempMin"><i class="bi bi-thermometer-low text-info"></i> ${dataForecast[i].day.mintemp_c}°C</h2>
        <h2 class="h3 forcastMois"><i class="bi bi-moisture"></i> ${dataForecast[i].day.avghumidity} %</h2>
        <h2 class="my-2 h3 forcastWind"><i class="bi bi-wind text-white"></i> ${dataForecast[i].day.maxwind_kph}km/h</h2>
        <h2 class="h3 forcastRain"> <i class="bi bi-cloud-drizzle"></i> ${dataForecast[i].day.daily_chance_of_rain} %</h2>
        <h2 class="mt-1 h3 forcastUv">${dataForecast[i].day.uv} UV</h2>
        </div>
        <div class="flip-overlay"></div>
        </div>
        </div>
        </div>
        `
    }
    forecastWeather.innerHTML = term;
    weatherAlert(dataForecast);
}
function weatherCondition()
{
    if(dataCurrent.is_day == 0)
    {
        document.querySelector('#time').style.setProperty("--background", "url(../images/night.png)");
        document.querySelector('#time').style.setProperty("--timeframe", "timelogo");
    }
    else
    {
        document.querySelector('#time').style.setProperty("--background", "url(../images/light.webp)");
        document.querySelector('#time').style.setProperty("--timeframe", "timelogo");
    }

    if(dataCurrent.condition.text.includes("Clear"))
    {
         document.querySelector('#bodyImage').style.background = 'url("assets/images/clear.jpg") center center / cover'
    }
    else if (dataCurrent.condition.text.includes("Sunny"))
    {
        document.querySelector('#bodyImage').style.background = 'url("assets/images/sunny.jpg") center center / cover'
    }
    else if (dataCurrent.condition.text.includes("loudy"))
    {
        document.querySelector('#bodyImage').style.background = 'url("assets/images/cloud.jpg") center center / cover'
    }
    else if (dataCurrent.condition.text.includes("Overcast"))
    {
        document.querySelector('#bodyImage').style.background = 'url("assets/images/overCast.jpg") center center / cover'
    }
    else if (dataCurrent.condition.text.includes("Mist"))
    {
        document.querySelector('#bodyImage').style.background = 'url("assets/images/mist.jpg") center center / cover'
    }
    else if (dataCurrent.condition.text.includes("hunder"))
    {
        document.querySelector('#bodyImage').style.background = 'url("assets/images/thunder.jpg") center center / cover'
    }
    else if (dataCurrent.condition.text.includes("rain")||dataCurrent.condition.text.includes("drizzle"))
    {
        document.querySelector('#bodyImage').style.background = 'url("assets/images/rain.jpg") center center / cover'
    }
    else if (dataCurrent.condition.text.includes("snow")||dataCurrent.condition.text.includes("sleet")||dataCurrent.condition.text.includes("Blizzard")||dataCurrent.condition.text.includes("pellets"))
    {
        document.querySelector('#bodyImage').style.background = 'url("assets/images/snow.jpg") center center / cover'
    }
    else if (dataCurrent.condition.text.includes("fog")|| dataCurrent.condition.text.includes("Fog"))
    {
        document.querySelector('#bodyImage').style.background = 'url("assets/images/fog.jpg") center center / cover'
    }
}
function myTimer() 
{
    currentTime.innerHTML = new Date().toLocaleTimeString( 'en-US', { timeZone: `${dataLocation.tz_id}` });

}
function weatherAlert()
{
    for (let i = 1; i < dataForecast.length; i++) {
        let windClass = Array.from(document.querySelectorAll('.forcastWind'));
        let uvClass = Array.from(document.querySelectorAll('.forcastUv'));

                // wind Speed Conditions 
        if(dataForecast[i].day.maxwind_kph < 1)
        {
            windClass[i-1].style.color = "#43B91E";
        }
        else if(dataForecast[i].day.maxwind_kph < 6)
        {
            windClass[i-1].style.color = "#66FFFF";
        }
        else if(dataForecast[i].day.maxwind_kph < 12)
        {
            windClass[i-1].style.color = "#00FFFF";
        }
        else if(dataForecast[i].day.maxwind_kph < 20)
        {
            windClass[i-1].style.color = "#00FF99";
        }
        else if(dataForecast[i].day.maxwind_kph < 29)
        {
            windClass[i-1].style.color = "#66FF66";
        }
        else if(dataForecast[i].day.maxwind_kph < 39)
        {
            windClass[i-1].style.color = "#99FF32";
        }
        else if(dataForecast[i].day.maxwind_kph < 50)
        {
            windClass[i-1].style.color = "#CDFF32";
        }
        else if(dataForecast[i].day.maxwind_kph < 62)
        {
            windClass[i-1].style.color = "#FFFF00";
        }
        else if(dataForecast[i].day.maxwind_kph < 75)
        {
            windClass[i-1].style.color = "#FFC100";
        }
        else if(dataForecast[i].day.maxwind_kph < 89)
        {
            windClass[i-1].style.color = "#FF9900";
        }
        else if(dataForecast[i].day.maxwind_kph < 103)
        {
            windClass[i-1].style.color = "#FF6600";
        }
        else if(dataForecast[i].day.maxwind_kph < 118)
        {
            windClass[i-1].style.color = "#FF3200";
        }
        else
        {
            windClass[i-1].style.color = "#FF0000";
        }
        // UV Conditions 
        if(dataForecast[i].day.uv < 3)
        {
            uvClass[i-1].style.color = "#43B91E"
        }
        else if(dataForecast[i].day.uv < 6)
        {
            uvClass[i-1].style.color = "#FCC721"
        }
        else if(dataForecast[i].day.uv < 8)
        {
            uvClass[i-1].style.color = "#FB741B"
        }
        else if(dataForecast[i].day.uv < 11)
        {
            uvClass[i-1].style.color = "#F81116"
        }
        else
        {
            uvClass[i-1].style.color = "#000"
        }
    }

}



