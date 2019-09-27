const clock = document.querySelector('#clock');
const KEY = '7817175-59009f7cca8be8133837e7e46';
const APIKEY = 'https://pixabay.com/api/?key=' + KEY + '&q=blue+black+cats&image_type=photo';
const body = document.querySelector('body');
const input = document.querySelector('#input');
const form = document.querySelector('form');
const listBox = document.querySelector('#listBox');
const toDos = [];
let number = 0;

function setTimer() {
    getImages()
    setInterval(getImages, 3000);
}

function oneToTwenty(){
    console.log(number)
    number++
    if(number===20){
        number=0
    }
}

function getImages() {
    oneToTwenty()
    fetch(APIKEY)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            body.style.backgroundImage = `url(${json.hits[number].largeImageURL})`;
            body.style.backgroundSize = 'cover';
            console.log(json)
        }).catch((err) => {
            body.style.background = 'black'
            console.log(err)
        });
}

function getTime() {
    const date = new Date();
    const minuts = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    clock.innerText = `${hours < 10 ? `0${hours}` : hours} : ${minuts < 10 ? `0${minuts}` : minuts} : ${seconds < 10 ? `0${seconds}` : seconds}`;
}

function saveLocal(e) {
    e.preventDefault();
    const txt = input.value; // 입력한 값
    toDos.push(txt)
    setLocal(toDos)
    appendTxt(txt)
    input.value = ''
}

function setLocal(toDos) {
    localStorage.setItem('toDo', JSON.stringify(toDos));
}

function showList() {
    const history = localStorage.getItem('toDo');
    JSON.parse(history).forEach((e,i) => {
        appendTxt(e,i)
        toDos.push(e)
    });
}

function appendTxt(txt,idx) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    listBox.appendChild(li)
    li.id='num'+idx
    li.ondblclick =  () => {done(idx)}
    // li.onclick = () =>{del(idx)}
    li.appendChild(span);
    span.innerText = txt;
}

function done(idx) {
    const txt = listBox.querySelector('#num'+idx).querySelector('span')
    txt.style.textDecoration = (txt.style.textDecoration === 'line-through')?'':'line-through'

}

function del(idx){
    console.log(idx)
}

function init() {
    setTimer(); // TODO 시간마다 이미지가 바뀐다
    getTime();
    setInterval(getTime, 1000);
    form.addEventListener('submit', saveLocal)
    showList()
    oneToTwenty()
}

init();
