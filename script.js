// const api_key="ac85da8c26a8562b4fca20bf5c7c7b52";
const api_key="Enter Your API key";
let unit="c";
let tempC,tempF;

let weather_report= document.querySelector(".weather_report");

let search_btn=document.querySelector("#search");
search_btn.onclick= async ()=>{
    const city = document.querySelector("#city").value;
    if (!city){return;}
    unit="c";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
    const response= await fetch(url);
    const data = await response.json();
    if(data.cod=="404"){
        weather_report.innerHTML=`<h2 id='error'>Weather data unavailable<br/>
        Please enter a valid city name</h2>`;
    }
    
    tempC=data.main.temp;
    tempF=((tempC*9)/5) + 32;
    
    weather_report.innerHTML=`
    <h2>${data.name}, ${data.sys.country}</h2>
    <h3>${data.weather[0].description}</h3>
    <h1 id="temp">${tempC}°C</h1>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
    <button id="switch">Switch to °F</button>`;

    let Switch=document.querySelector("#switch");
    Switch.onclick= ()=>{
        let temp=document.querySelector("#temp");
        if(unit=="c"){
            temp.innerText=tempF.toFixed(2)+"°F";
            unit="f";
            Switch.innerText="Switch to °C";
        }else if(unit=="f"){
            unit="c";
            temp.innerText=tempC+"°C";
            Switch.innerText="Switch to °F";
        }
    }
};

