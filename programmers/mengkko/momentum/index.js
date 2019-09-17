const clock = document.getElementById('clock');
const weather = document.getElementById('weather');

/**
 * setInterval 함수를 통해 getTIme함수를 1초마다 실행합니다.
 * getWeather 함수를 실행합니다.
 */
function init() {
  setInterval(getTime, 1000);
  getWeather();
  getTodoList();
}
init();

/**
 * 시계형태로 데이터 포맷을 만든뒤 타겟 clock에 대입합니다.
 */
function getTime() {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const hh = setTime(date.getHours());
  const mm = setTime(date.getMinutes());
  const ss = setTime(date.getSeconds());
  clock.innerHTML = `${y}년 ${m}월 ${d}일 ${hh}:${mm}:${ss}`;
}

/**
 * @param {int} v - some number
 * @return {int} v 는 10보다 작으면 앞에 0을 더해 두자리수로 치환합니다.
 */
function setTime(v) {
  if (v < 10) {
    v = `0${v}`;
  }
  return v;
}

/**
 * fetch 함수를 통해 url로 http 통신을 합니다.
 * 데이터가 반환되면 promise를 반환하고 json()메소드를 이용해서 body 텍스트를 json으로 바꾼뒤 promise를 반환한다.
 * 다시 then함수를 이용해 받은 데이터(json)에서 main.temp (온도)값을 temper변수에 저장하고
 * icon 변수에 json['weather'][0].icon을 저장합니다. (날씨마다 아이콘 값이 변경됨)
 * html 변수에 span태그, img태그, span태그를 저장합니다. img태그에는 icon값이 마지막 span태그에는 온도 값이 들어갑니다.
 * weather.innerHTML에 html변수를 저장합니다.
 * weather의 스타일중 폰트사이즈를 30px로 조정합니다.
 */
function getWeather() {
  fetch(
      'http://api.openweathermap.org/data/2.5/weather?q=Seoul,kr&appid=d0dbed9f11d7097bfd43f5ceacc27023&units=metric'
  )
      .then((data) => data.json())
      .then((json) => {
        const temper = json.main.temp;
        const icon = json['weather'][0].icon;
        const html = `<span>현재 날씨는<span><br>
                      <img src='image/${icon}.svg'><br>
                      <span>서울의 온도는 섭씨 ${temper}도 입니다.<span>`;
        weather.innerHTML = html;
        weather.style.fontSize = '30px';
      });
}

function getTodoList() {
  const btn = document.querySelector('#addBtn');
  btn.addEventListener("click", e => {
    console.log("hi")
  })
}
