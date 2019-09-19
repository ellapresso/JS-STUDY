const clock = document.getElementById('clock');

function init() {
    setInterval(getTime, 1000);
}

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

function setTime(v) {
    if (v < 10) {
        v = `0${v}`;
    }
    return v;
}

export default {
    init,
};
