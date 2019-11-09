const modal = document.querySelector('.modal');

(function () {
    const titleTxt = modal.querySelector('.modalDate');
    const txt = modal.querySelector('.modalTxt');
    monthDays.addEventListener('click', function (e) {
        titleTxt.innerText = `${nowMonth}월 ${e.target.innerText}일`;
        //TODO: 입력창 활성화 및 로컬스토리지에 저장
        txt.innerHTML =`<input type='text' id='modalInput' class='dayInput'placeholder='내용을 입력해주세요'/>`;
        modal.style.display = 'block';
    })
    listBox.addEventListener('click', function (e) {
        //TODO: 메모 수정 가능하게 활성
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
