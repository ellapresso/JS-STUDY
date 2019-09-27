const clock = document.querySelector('#clock');
const KEY = '7817175-59009f7cca8be8133837e7e46';
const APIKEY = 'https://pixabay.com/api/?key=' + KEY + '&q=blue+gray+cats&image_type=photo';
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
    const final = toDos.filter(x=>x!==undefined)
    localStorage.setItem('toDo', JSON.stringify(final));
}

function showList() {
    const history = localStorage.getItem('toDo');
    JSON.parse(history).forEach((e,i) => {
            appendTxt(e,i)
            toDos.push(e)
    });
}

function appendTxt(txt,idx) {
    const div = document.createElement("div");
    const span = document.createElement("span");
    listBox.appendChild(div)
    div.id='num'+idx
    div.ondblclick = () => {done(idx)}
    div.appendChild(span);
    span.innerHTML = `<span>${txt}</span> <span id='del`+idx+`'>↩︎</span>`;
    div.querySelector('#del'+idx).onclick= () =>{del(idx)}
}

function done(idx) {
    const txt = listBox.querySelector('#num'+idx).querySelector('span')
    txt.style.textDecoration = (txt.style.textDecoration === 'line-through')?'':'line-through'
}

function del(idx){
    delete toDos[idx]
    setLocal(toDos)
    listBox.removeChild(listBox.querySelector('#num'+idx))
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
