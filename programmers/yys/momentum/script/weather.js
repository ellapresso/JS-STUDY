const API_KEY = "5cade099fdf6ae90a6b98f749162b377";
const COORDS = "coords";
const weather = document.querySelector(".js-weather");

/* 날씨 API */
function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("ss", json);
      const html = `지금 계신 ${json.name}의 날씨는 <em>${
        json["weather"][0].main
      }</em> 이고, 
      기온은 <em>${parseInt(json.main.temp)}℃</em>입니다.`;

      weather.innerHTML = html;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem("coords", JSON.stringify(coordsObj));
}

/* 현재 위치 가져오기 */
function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("can't access location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);

  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
