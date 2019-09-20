const KEY = '7817175-59009f7cca8be8133837e7e46';
const APIKEY = 'https://pixabay.com/api/?key=' + KEY + '&q=cat&image_type=photo';
const body = document.querySelector('body');
const num = 1; //TODO 일정시간마다 숫자 바뀌게

function getImages(num) {
	fetch(APIKEY)
		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
			body.style.backgroundImage = `url(${json.hits[num].largeImageURL})`;
			// body.style.backgroundRepeat = 'no-repeat';
			body.style.backgroundSize = 'cover';
		});
}

getImages(num);
