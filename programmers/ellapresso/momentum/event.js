const modal = document.querySelector('.modal');

(function () {
    const titleTxt = modal.querySelector('.modalDate')
    const txt = modal.querySelector('.modalTxt')
    monthDays.addEventListener('click', function (e) {
        titleTxt.innerText = `${nowMonth}월 ${e.target.innerText}일`
        txt.innerText = `Here is toDo`
        modal.style.display = 'block'
    })
    listBox.addEventListener('click', function (e) {
        if (e.target.id === '') {
            titleTxt.innerText = 'MEMO'
            txt.innerText = `${e.target.innerText}`
            modal.style.display = 'block'
        }
    })
})()
