const body = document.querySelector("body");

const IMG_NUMBER = 4;

function paintImage(imgNumber) {
  const image = new Image();
  //document.createElement("img")
  image.src = `./images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function generateRandom() {
  return Math.floor(Math.random() * 4);
}

function initBg() {
  const randomNumber = generateRandom();
  paintImage(randomNumber);
}

initBg();
