const form = document.querySelector('#todoForm');
const input = form.children[0];
const mainTable = document.querySelector('.table');

const TODOS = 'toDos';
const toDos = [];

function compliteTodo(e) {
    if (e.path[1].className === 'strikeout') {
        e.path[1].className = '';
        toDos[e.path[1].id - 1].complite = false;
    } else {
        e.path[1].className = 'strikeout';
        toDos[e.path[1].id - 1].complite = true;
    }
    saveTodos();
}

function deleteTodo(e) {
    e.path[2].remove();
    toDos.pop([e.path[2].id - 1]);
    saveTodos();
}

function saveTodos() {
    localStorage.setItem(TODOS, JSON.stringify(toDos));
}

function loadTodo() {
    const loadTodos = localStorage.getItem(TODOS);
    if (loadTodos) {
        for ( const i of JSON.parse(loadTodos)) {
            makeTodo(i.value, i.complite);
        }
    }
}

function addTodo(e) {
    e.preventDefault();
    makeTodo(input.value);
}

function makeTodo(value, complite) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const btn = document.createElement('button');
    const count = toDos.length + 1;
    let bool = false;

    td1.innerText = count;
    td2.innerText = value;
    btn.innerText = '❎';
    btn.addEventListener('click', deleteTodo);
    td3.append(btn);
    tr.id = count;
    tr.append(td1, td2, td3);
    tr.addEventListener('dblclick', compliteTodo);
    if (complite) {
        tr.className = 'strikeout';
        bool = true;
    }
    mainTable.append(tr);
    input.value = '';

    const toDoObj = {
        value,
        id: count,
        complite: bool,
    };
    toDos.push(toDoObj);
    saveTodos();
}

function init() {
    loadTodo();
    form.addEventListener('submit', addTodo);
}

export default {
    init,
};
