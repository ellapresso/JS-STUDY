import View from './View.js'

const tag = '[ClockView]'

const ClockView = Object.create(View)

ClockView.setup = function (el) {
    this.init(el)
    setInterval(this.getTime.bind(this), 1000)
}

ClockView.getTime = function() {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const hh = this.setTime(date.getHours());
    const mm = this.setTime(date.getMinutes());
    const ss = this.setTime(date.getSeconds());
    this.el.innerHTML = `${y}년 ${m}월 ${d}일 ${hh}:${mm}:${ss}`;
}

ClockView.setTime = function(v) {
    if (v < 10) {
        v = `0${v}`;
    }
    return v;
}

export default ClockView