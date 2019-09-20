const toDoForm = document.querySelector(".js-toDoForm"),
  todoInput = toDoForm.querySelector("input"),
  todoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  todoList.removeChild(li);
  const cleanToDos = toDos.filter(cur => {
    return cur.id !== Number(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function paintToDo(text) {
  const newId = toDos.length + 1;
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();

  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "☑️";
  delBtn.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  span.innerText = text;

  li.id = newId;
  li.appendChild(delBtn);
  li.appendChild(span);
  todoList.appendChild(li);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = todoInput.value;
  if (currentValue.trim() !== "") paintToDo(currentValue);
  todoInput.value = "";
}

function loadToDos() {
  const loadedTodos = localStorage.getItem(TODOS_LS);

  if (loadedTodos !== null) {
    const parsedToDos = JSON.parse(loadedTodos);
    parsedToDos.forEach(cur => {
      paintToDo(cur.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
