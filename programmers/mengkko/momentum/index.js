import clock from './js/clock.js';
import weather from './js/weather.js';
import todo from './js/todo.js';
import calendar from './js/calendar.js';
/**
 * 각 모듈의 init을 실행홥니다.
 */
function init() {
    clock.init();
    weather.init();
    todo.init();
    calendar.init();
}

document.addEventListener('DOMContentLoaded', () => {
    init();
});
