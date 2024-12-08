function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="emoji"/>`;

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}`;
  timeElement.innerHTML = formatDate(date);
  console.log(response.data);
  getForecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
function getForecast(city) {
  let apiKey = "2a9cba14de5ca8505328abf7tf796fof";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let days = ["Tue", "Wed", "Thurs", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class ="weather-forecast-day">
<div class ="weather-forecast-date">${day}</div>
<div class ="weather-forecast-icon">⛅</div>
<div class ="weather-forecast-temperatures">
  <div class ="weather-forecast-temperature"><strong>15º</strong></div> 
<div class ="weather-forecast-temperature">9º</div>
</div>
</div>`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function searchCity(city) {
  let apiKey = "2a9cba14de5ca8505328abf7tf796fof";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchFormInput");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#searchForm");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Madrid");
