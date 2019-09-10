const clock = document.getElementById('clock');
const weather = document.getElementById('weather');

function init() {
  setInterval(getTime, 1000);
  getWeather();
}
init();

function getTime() {
  const date = new Date();
  const h = setTime(date.getHours());
  const m = setTime(date.getMinutes());
  const s = setTime(date.getSeconds());
  clock.innerHTML = `${h}:${m}:${s}`;
}
function setTime(v) {
  if (v < 10) {
    v = `0${v}`;
  }
  return v;
}

function getWeather() {
  fetch(
      'http://api.openweathermap.org/data/2.5/weather?q=Seoul,kr&appid=d0dbed9f11d7097bfd43f5ceacc27023&units=metric'
  )
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        const temper = json.main.temp;
        console.log(json);
        const html = `<span>현재 날씨는<span>
                      <img src='./image/${json['weather'][0].icon}.svg'>
                      <span>서울의 온도는 섭씨 ${temper}도 입니다.<span>`;
        weather.innerHTML = html;
        weather.style.color = 'black';
        weather.style.fontSize = '30px';
      });
}
