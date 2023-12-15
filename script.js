const key = "5c65cdcd1a97bb28eb7e15a342fcdb4c";
let lat;
let lon;
const temp = document.querySelector(".temp");
const weather = document.querySelector(".weather");
const iconDiv = document.querySelector(".weather-icon-div");
const city = document.querySelector(".city");
const weatherDescription = document.querySelector(".weatherDescription");
const humidity = document.querySelector(".humidity");
const feelsLike = document.querySelector(".feelsLike");
const wind = document.querySelector(".wind");
const footer = document.querySelector(".footer");
const refresh = document.querySelector(".refresh");

refresh.addEventListener("click", () => getLocation());

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    //   innerHTML = "Geolocation is not supported by this browser.";
    console.log("Geolocation is not supported by this browser.");
  }
};

const showPosition = (position) => {
  lat = `${position.coords.latitude}`;
  lon = `${position.coords.longitude}`;
  weatherData();
};
getLocation();

const weatherData = async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Http error! Status: ${response.status}`);
    }
    const data = await response.json();
    getWeatherInfo(data);
  } catch (err) {
    console.error("Error fetching weather data:", err);
  }
};

const getWeatherInfo = (data) => {
  temp.innerHTML = `${Math.round(data.main.temp)}<span class="degree">°</span>`;
  weather.textContent = data.weather[0].main;
  iconDiv.innerHTML = `<img class="weather-icon" alt="weather-icon" src= http://openweathermap.org/img/w/${data.weather[0].icon}.png>`;
  city.textContent = data.name;
  weatherDescription.textContent = data.weather[0].description;
  humidity.textContent = `${data.main.humidity}%`;
  feelsLike.textContent = `${Math.round(data.main.feels_like)}°`;
  wind.textContent = `${Math.round(data.wind.speed)} km/h`;
  console.log("reload works");
};
