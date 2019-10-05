const KEY = '7817175-59009f7cca8be8133837e7e46';
const APIKEY = 'https://pixabay.com/api/?key=' + KEY + '&q=yellow+white+cat&image_type=photo';
const body = document.querySelector('body');
let number = 0;

function setTimer() {
    getImages()
    setInterval(getImages, 3000);
}

function oneToTwenty() {
    number++
    if (number === 20) {
        number = 0
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

oneToTwenty()
setTimer()
