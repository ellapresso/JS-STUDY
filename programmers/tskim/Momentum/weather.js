const minTemp = document.querySelector(".clowtemp");
const maxTemp = document.querySelector(".chightemp");
const cTemp = document.querySelector(".ctemp");
const cIcon = document.querySelector(".cicon");

function init() {
    fetch('http://api.openweathermap.org/data/2.5/weather?id=1835848&APPID=4e2b0040843e17a4fac2bfdae37e0423&units=metric')
    .then(function(resp) { return resp.json() })
    .then(function(data) {
        var iconImg = document.createElement("img");
        iconImg.setAttribute('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png')

        cTemp.appendChild(document.createTextNode(data.main.temp));
        minTemp.appendChild(document.createTextNode(data.main.temp_min));
        maxTemp.appendChild(document.createTextNode(data.main.temp_max));
        cIcon.appendChild(iconImg);
    })
    .catch(function(){
    }); 
}

init();