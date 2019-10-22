const calendar = document.querySelector('#calendar');
const monthTitle = document.querySelector('#monthTitle');
const monthDays = document.querySelector('#monthDays')
const date = new Date()
const brforeMonth = date.getMonth();
const nowMonth = date.getMonth() + 1;
const nextMonth = date.getMonth() + 2;

function calendarTitle() {
    monthTitle.innerHTML = `<span>${nowMonth} 월</span>`
}

function drawDays() {
    date.setDate(1); // 해당 달의 1일을 설정해줌.
    const firstDay = date.getDay(); // 1일의 요일 불러옴.
    const lastDate = new Date(date.getFullYear(), nowMonth, 0)
    const beforeLastDate = new Date(date.getFullYear(), brforeMonth, 0)
    const bld = beforeLastDate.getDate()

    let tr = document.createElement('tr');
    monthDays.appendChild(tr);

    if (firstDay !== 0) { //첫번째 날 이전은 전달 데이터이다.
        for (let i = firstDay - 1; i >= 0; i--) {
            tr.innerHTML += `<th class='notThisMonth'>${bld-i}</th>`
        }
    }
    for (let i = 0; i < lastDate.getDate(); i++) {
        tr.innerHTML += `<th>${i+1}</th>`
        if ((firstDay + i + 1) % 7 === 0) {
            tr = monthDays.appendChild(document.createElement('tr'))
        }
    }
    const next = (lastDate.getDate() + firstDay) % 7
    for (let i = 0; i < 7 - next; i++) {
        tr.innerHTML += `<th class='notThisMonth'>${i+1}</th>`
    }
}

calendarTitle();
drawDays();
