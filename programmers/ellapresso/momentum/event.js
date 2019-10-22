const modal = document.querySelector('.modal');

(function () {
    const titleTxt = modal.querySelector('.modalDate');
    const txt = modal.querySelector('.modalTxt');
    monthDays.addEventListener('click', function (e) {
        titleTxt.innerText = `${nowMonth}월 ${e.target.innerText}일`;
        txt.innerHTML =`<input type='text' id='modalInput' class='dayInput'placeholder='내용을 입력해주세요'/>`;
        modal.style.display = 'block';
    })
    listBox.addEventListener('click', function (e) {
        if (e.target.id === '') {
            titleTxt.innerText = 'MEMO';
            txt.innerText = `${e.target.innerText}`;
            modal.style.display = 'block';
        }
    })

    modal.querySelector('.closeBtn').addEventListener('click',function(e){
        modal.style.display='none';
    });

})()
