import todo from './todo.js';
import clock from './clock.js';
import weather from './weather.js';

/**
 * 각 모듈의 init을 실행홥니다.
 */
function init() {
    clock.init();
    weather.init();
    todo.init();
}

document.addEventListener('DOMContentLoaded', () => {
    init();
});
