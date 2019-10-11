const toDoForm = document.querySelector(".js-toDoForm"),
 toDoInput = toDoForm.querySelector("input"),
 toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function checkedToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    if(li.tagName == 'LI'){
        li.classList.toggle('clickedToDo')
    }

    console.log(event);
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintTodo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length +1;
    delBtn.innerText = "x";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.addEventListener("click", checkedToDo);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue);
    toDoInput.value = "";
  }

function loadToDos() {
    const loadedTodos = localStorage.getItem(TODOS_LS);
    if(loadedTodos !== null) {
        const parsedToDos = JSON.parse(loadedTodos);
        parsedToDos.forEach(function(toDo) {
            paintTodo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();