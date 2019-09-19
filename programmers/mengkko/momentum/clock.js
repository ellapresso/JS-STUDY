const clock = document.getElementById('clock');

/**
 * setInterval 함수를 통해 getTIme함수를 1초마다 실행합니다.
 */
function init() {
    setInterval(getTime, 1000);
}
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

export default {
    init,
};
