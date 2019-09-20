const KEY = '7817175-59009f7cca8be8133837e7e46';
const APIKEY = 'https://pixabay.com/api/?key=' + KEY + '&q=black+blue+cat&image_type=photo';
const body = document.querySelector('body');

function setTimer() {
    setTimeout(getImages, 5000);
    getImages()
}

function getImages() {
    fetch(APIKEY)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            body.style.backgroundImage = `url(${json.hits[11].largeImageURL})`;
            body.style.backgroundSize = 'cover';
        }).catch((err) => {
            body.style.background = 'black'
            console.log(err)
        });
}

setTimer()
