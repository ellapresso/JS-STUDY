let input = document.querySelector('#input');
let form = document.querySelector('form');
const listBox = document.querySelector('#listBox');
const toDos = [];

function saveLocal(e) {
    e.preventDefault();
    const txt = input.value; // 입력한 값
    toDos.push(txt)
    setLocal(toDos)
    appendTxt(txt)
    input.value = ''
}

function setLocal(toDos) {
    const final = toDos.filter(x => x !== undefined)
    localStorage.setItem('toDo', JSON.stringify(final));
}

function showList() {
    const history = localStorage.getItem('toDo');
    JSON.parse(history).forEach((e, i) => {
        appendTxt(e, i)
        toDos.push(e)
    });
}

function appendTxt(txt, idx) {
    const div = document.createElement("div");
    const span = document.createElement("span");
    listBox.appendChild(div)
    div.id = 'num' + idx
    div.ondblclick = () => {
        done(idx)
    }
    div.appendChild(span);
    span.innerHTML = `<span>${txt}</span> <span id='del` + idx + `'>↩︎</span>`;
    div.querySelector('#del' + idx).onclick = () => {
        del(idx)
    }
}

function done(idx) {
    const txt = listBox.querySelector('#num' + idx).querySelector('span')
    txt.style.textDecoration = (txt.style.textDecoration === 'line-through') ? '' : 'line-through'
}

function del(idx) {
//TODO: 삭제 확인 모달 작성
    delete toDos[idx]
    setLocal(toDos)
    listBox.removeChild(listBox.querySelector('#num' + idx))
}

function init() {
    form.addEventListener('submit', saveLocal)
    showList()
}

init();
