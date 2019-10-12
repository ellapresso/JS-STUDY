import View from './View.js'

const tag = '[CalendarView]'

const CalendarView = Object.create(View)

CalendarView.setup = function (el) {
    this.init(el)
    this.calendarMonth = document.getElementById('calendarMonth');
    this.calendarWeek = document.getElementById('calendarWeek');
    this.calendarYM = document.getElementById('calendarYM');
    this.modal = document.querySelector('.modal')
    this.overlay = this.modal.querySelector('.modal__overlay')
    //this.term = document.getElementsByClassName('term');
    this.bindEvent()
    this.today = new Date();

    return this
}

CalendarView.render = function(data = []) {
    this.data = data
    this.show()
    this.buildCalendar(this.today)
    // this.buildCalendarWeek(this.today,data)      주간 아직 구현 못함
    // for (const i of this.term) i.addEventListener('click', e => this.clickTerm(e));
}

CalendarView.renderModal = function(data = []) {
    this.today = new Date()
    if(data.length) {
        this.modal.querySelector('.modal__content').innerHTML = `<h1>${data[0].date}</h1>` + this.getModalResultHtml(data)
        this.modal.classList.remove('hidden')
    }
}

CalendarView.bindEvent = function() {
    this.calendarYM.parentElement.addEventListener('click', e => this.clickCalendar(e));
    this.overlay.addEventListener('click', e => this.closeModal(e))
}

CalendarView.getModalResultHtml = function(data) {
    return data.reduce((html, item) => {
        html += this.getTodoItemHtml(item)
        return html
    }, '<ul>') + '</ul>'
}

CalendarView.getTodoItemHtml = function(item) {
    let style = ''
    if(item.complite) style = 'text-decoration: line-through;'
    return `<li>
        <p style="${style}">${item.keyword}</p>
        </li>`
}

CalendarView.closeModal = function(e) {
    this.modal.classList.add('hidden')
}

CalendarView.clickTerm = function(e) {
    if (e.target.innerText === '주간') {
        calendarMonth.style.display = 'none';
        calendarWeek.style.display = '';
    } else {
        calendarMonth.style.display = '';
        calendarWeek.style.display = 'none';
    }
}
CalendarView.clickCalendar = function(e) {
    if (e.target.innerText === '>') {
        this.today = new Date(this.today.getFullYear(),
        this.today.getMonth() + 1, 
        this.today.getDate());
        this.buildCalendar(this.today);
    } else if (e.target.innerText === '<') {
        this.today = new Date(this.today.getFullYear(),
        this.today.getMonth() - 1,
        this.today.getDate());
        this.buildCalendar(this.today);
    } else if (e.target.children[1]) {
        this.emit('@click', { input : e.target.children[1].value })
    }
}

CalendarView.buildCalendarWeek = function(target) {
    const year = target.getFullYear();
    const month = target.getMonth();
    const day = target.getDay()
    const date = target.getDate() - day
    var StartDate = new Date();
    var EndDate = new Date();
    StartDate.setHours(0,0,0,0); EndDate.setHours(0,0,0,0);
    StartDate.setDate(target.getDate() - day);
    EndDate.setDate(target.getDate()- day + 6);

    calendarWeekYM.innerHTML = year +
        '년 ' + (month + 1) + '월';
}

CalendarView.calcDate = function(val) {
    if(val < 10) val = "0" + val
    return val
}

CalendarView.buildCalendar = function(today) {
    const date = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const doMonth = new Date(year, month, 1);
    const doMonthLastDate = new Date(year, month, 0);
    const lastDate = new Date(year, month + 1, 0);
    const doMonthLastDay = doMonthLastDate.getDate();
    let hidden = year + '-' + this.calcDate(month) + '-'
    this.calendarYM.innerHTML = year +
        '년 ' + (month + 1) + '월';

    while (this.calendarMonth.rows.length > 2) {
        this.calendarMonth.deleteRow(this.calendarMonth.rows.length-1);
    }
    let eventDays = []
    for(let i of this.data) eventDays.push(i.date)
    eventDays = eventDays.filter((item, pos, self) => {
        return self.indexOf(item) === pos
    })
    let td = null;
    let tr = null;
    let cnt = 0;
    tr = calendarMonth.insertRow();
    tr.addEventListener('click', e => this.clickCalendar(e));
    for (let i = doMonth.getDay(); i > 0; i--) {
        const day = doMonthLastDay - (i - 1)
        hidden = hidden + this.calcDate(day)
        td = tr.insertCell();
        td.innerHTML = day;
        if(eventDays.find( el => el === hidden)) td.innerHTML += '<br>✔'
        td.innerHTML += `<input type="hidden" value="${hidden}"></input>`
        td.style.color = '#ddd';
        td.style.verticalAlign = 'top';
        td.style.textAlign = 'left';
        if (cnt === 0) td.style.color = '#F79DC2';
        cnt = cnt + 1;
    }
    for (let i = 1; i <= lastDate.getDate(); i++) {
        td = tr.insertCell();
        td.style.verticalAlign = 'top';
        td.style.textAlign = 'left';
        td.innerHTML = i;
        cnt = cnt + 1;
        hidden = year + '-' + this.calcDate(month + 1) + '-'
        hidden = hidden + this.calcDate(i);
        if (cnt % 7 == 1) {
            td.style.color = 'red';
            td.innerHTML = i;
        }
        if (cnt%7 == 0) {
            td.style.color = 'blue';
            td.innerHTML = i;
            tr = calendarMonth.insertRow();
            tr.addEventListener('click', e => this.clickCalendar(e));
            tr.style.verticalAlign = 'top';
            tr.style.textAlign = 'left';
        }
        if (year === date.getFullYear() &&
        month === date.getMonth() &&
        i === date.getDate()) {
            td.style.backgroundColor = '#84c8f9';
        }
        if(eventDays.find( el => el === hidden)) td.innerHTML += '<br>✔'
        td.innerHTML += `<input type="hidden" value="${hidden}"></input>`
    }
    if (tr.childElementCount != 0) {
        hidden = year + '-' + this.calcDate(month + 2) + '-'
        let dayCnt = 1;
        let cnt = tr.childElementCount;
        while (cnt < 7) {
            hidden = hidden + this.calcDate(dayCnt)
            td = tr.insertCell();
            td.innerHTML = dayCnt;
            if(eventDays.find( el => el === hidden)) td.innerHTML += '<br>✔'
            td.innerHTML += `<input type="hidden" value="${hidden}"></input>`
            td.style.color = '#ddd';
            dayCnt++;
            cnt++;
            if (cnt === 7) td.style.color = 'skyblue';
        }
    }
}

export default CalendarView