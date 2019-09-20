const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greettings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  //form의 디폴트 이벤트 없애기 (엔터 누르면 submit되면서 새로고침)
  event.preventDefault();

  const currentValue = input.value;
  saveName(currentValue);
  paintGreeting(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `${text} 님 안녕하세요!`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);

  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
