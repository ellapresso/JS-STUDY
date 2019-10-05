const calendar = document.querySelector('#calendar');
const monthTitle = document.querySelector('#monthTitle');
const monthDays = document.querySelector('#monthDays')
const date = new Date()
const nowMonth = date.getMonth() + 1;
const nextMonth = date.getMonth() + 2;

function calendarTitle() {
    const div = document.createElement('div');
    monthTitle.appendChild(div);
    div.innerHTML = `<span>${nowMonth} 월</span>`
}

function drawDays() {
    date.setDate(1); // 해당 달의 1일을 설정해줌.
    const firstDay = date.getDay(); // 1일의 요일 불러옴.
    const lastDate = new Date(date.getFullYear(), nowMonth, 0)

    const tr = document.createElement('tr');
    const th = document.createElement('th');
    monthDays.appendChild(tr);
    tr.appendChild(th);

    //1일이 일요일이 아닐 경우 앞에 빈칸(혹은 전달 마지막날짜들)을 채워준다.
    if (firstDay !== 0) {

    }

}


calendarTitle();
drawDays();
