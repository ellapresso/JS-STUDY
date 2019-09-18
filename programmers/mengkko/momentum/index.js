import todo from './todo.js';
import clock from './clock.js'
import weather from './weather.js'

function init() {
  clock.init()
  weather.init()
  todo.init()
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})