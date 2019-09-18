const form = document.querySelector('#todoForm');
const input = form.children[0];
const mainTable = document.querySelector('.table');

const TODOS_LS = 'toDos';

/**
 * 
 */
function init() {
    loadTodo();
    form.addEventListener('submit', addTodo);
}

/**
 * 
 */
function loadTodo() {
    const toDos = localStorage.getItem(TODOS_LS);
    // if(todos) {

    // }
}
/**
 * 
 * @param {*} e 
 */
function addTodo(e) {
    e.preventDefault();
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    td1.innerText = 1;
    td2.innerText = input.value;
    td3.innerText = 'delete';
    tr.append(td1, td2, td3);
    mainTable.append(tr);
    input.value = '';
}
export default {
    init,
};
