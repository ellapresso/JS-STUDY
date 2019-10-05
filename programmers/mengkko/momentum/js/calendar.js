const calendar = document.getElementById("calendar");
const calendarYM = document.getElementById("calendarYM");
let today = new Date();

function makeCal() {
    buildCalendar(today)
    calendar.addEventListener('click', clickCalendar)
}

function clickCalendar(e) {
    if(e.target.innerText === ">") {
        today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        buildCalendar(today)
    } else if(e.target.innerText === "<") {
        today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        buildCalendar(today)
    } else if((e.target.innerText + 0) > 1){
        alert(e.target.innerText + '일을 클릭하셨습니다.')
    }
}

function buildCalendar(today) {
    const date = new Date();
    const doMonth = new Date(today.getFullYear(),today.getMonth(),1);
    const doMonthLastDate = new Date(today.getFullYear(),today.getMonth(),0);
    const lastDate = new Date(today.getFullYear(),today.getMonth()+1,0);
    const doMonthLastDay = doMonthLastDate.getDate()
    calendarYM.innerHTML = today.getFullYear() + "년 " + (today.getMonth() + 1) + "월"; 

    while (calendar.rows.length > 2) {
        calendar.deleteRow(calendar.rows.length-1);
    }

    let td = null;
    let tr = null;
    tr = calendar.insertRow();
    let cnt = 0;

    for (let i = doMonth.getDay(); i > 0; i--) {
        td = tr.insertCell();
        td.innerHTML = doMonthLastDay - (i - 1)
        td.style.color = '#ddd'
        if (cnt === 0) td.style.color = "#F79DC2"
        cnt = cnt + 1;
     }

    for (let i = 1; i <= lastDate.getDate(); i++) { 
        td = tr.insertCell();
        td.innerHTML = i;
        cnt = cnt + 1;
        if (cnt % 7 == 1) {
            td.style.color = "red"
            td.innerHTML = i
        }    
        if (cnt%7 == 0){
            td.style.color = "blue"
            td.innerHTML = i
            tr = calendar.insertRow();
        }
        if (today.getFullYear() === date.getFullYear()
            && today.getMonth() === date.getMonth()
            && i === date.getDate()) {
            td.style.backgroundColor = "#84c8f9";
        }
    }
    if(tr.childElementCount != 0) {
        let dayCnt = 1;
        let cnt = tr.childElementCount
        while(cnt < 7) {
            td = tr.insertCell()
            td.innerHTML = dayCnt
            td.style.color = '#ddd'
            dayCnt++
            cnt++
            if (cnt === 7) td.style.color = "skyblue"
        }
    }
}

function init() {
    makeCal()
}

export default {
    init,
};
