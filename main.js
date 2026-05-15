const apiKey = "ef68bece82022a35b1044f768d98b6f9";

const searchBtn =
document.getElementById("searchBtn");

const searchInput =
document.getElementById("searchInput");


// DATE

const today = new Date();

document.getElementById("date").innerHTML =
today.toDateString();


// SEARCH

searchBtn.addEventListener("click", () => {

  const city = searchInput.value;

  if(city !== ""){

    getWeather(city);

  }

});


// DEFAULT CITY

getWeather("Casablanca");


// FUNCTION

function getWeather(city){

  // CURRENT WEATHER

  fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )

  .then(res => res.json())

  .then(data => {

    document.getElementById("city").innerHTML =
    `${data.name}, ${data.sys.country}`;

    document.getElementById("temp").innerHTML =
    Math.round(data.main.temp);

    document.getElementById("feels").innerHTML =
    Math.round(data.main.feels_like);

    document.getElementById("condition").innerHTML =
    data.weather[0].main;

    document.getElementById("humidity").innerHTML =
    `${data.main.humidity}%`;

    document.getElementById("wind").innerHTML =
    `${data.wind.speed} km/h`;

    document.getElementById("pressure").innerHTML =
    `${data.main.pressure} hPa`;

    document.getElementById("icon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

  });


  // HOURLY

  fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  )

  .then(res => res.json())

  .then(data => {

    const hourly =
    document.getElementById("hourly");

    hourly.innerHTML = "";

    for(let i = 0; i < 6; i++){

      const item = data.list[i];

      const div =
      document.createElement("div");

      div.className = "hour";

      div.innerHTML = `

      <p>${item.dt_txt.slice(11,16)}</p>

      <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png">

      <span>${Math.round(item.main.temp)}°</span>

      `;

      hourly.appendChild(div);

    }

  });


  // DAYS

  const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
  ];

  const days =
  document.getElementById("days");

  days.innerHTML = "";

  for(let i = 0; i < 7; i++){

    const date = new Date();

    date.setDate(date.getDate() + i);

    const div =
    document.createElement("div");

    div.className = "day";

    div.innerHTML = `

      <span>${week[date.getDay()]}</span>

      <span>${20 + i}°</span>

    `;

    days.appendChild(div);

  }

}