const MomentumCalendar = document.querySelector(".js-calendar")
const calBody = document.querySelector(".cal-body")

const initDate = {
  monList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  dayList: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  today: new Date(),
  monForChange: new Date().getMonth(),
  activeDate: new Date(),
  getFirstDay: (yy, mm) => new Date(yy, mm, 1),
  getLastDay: (yy, mm) => new Date(yy, mm + 1, 0),
  nextMonth: function() {
    let d = new Date();
    d.setDate(1);
    d.setMonth(++this.monForChange);
    this.activeDate = d;
    return d;
  },
  prevMonth: function () {
    let d = new Date();
    d.setDate(1);
    d.setMonth(--this.monForChange);
    this.activeDate = d;
    return d;
  },
  addZero: (num) => (num < 10) ? '0' + num : num,
  activeDTag: null,
  getIndex: function (node) {
    let index = 0;
    while (node = node.previousElementSibling) {
      index++;
    }
    return index;
  }
};

function setCalHead (month, fullYear) {
  document.querySelector('.cal-month').textContent = initDate.monList[month];
  document.querySelector('.cal-year').textContent = fullYear;
}


/**
* @param {date} fullDate
*/

function loadYYMM (fullDate) {
  let yy = fullDate.getFullYear();
  let mm = fullDate.getMonth();
  let firstDay = initDate.getFirstDay(yy, mm);
  let lastDay = initDate.getLastDay(yy, mm);
  let markToday; // for marking today date

  if (mm === initDate.today.getMonth() && yy === initDate.today.getFullYear()){
    markToday = initDate.today.getDate();
  }

  setCalHead(mm, yy);

  let trtd = '';
  let startCount;
  let countDay = 0;
  for (let i = 0; i < 6; i++) {
    trtd += '<tr>';
    for (let j = 0; j < 7; j ++) {
      if (i === 0 && !startCount && j === firstDay.getDay()){
        startCount = 1;
      }

      if(!startCount){
        trtd += '<td>'
      } else {
        let fullDate = yy + '.' + initDate.addZero(mm + 1) + '.' + initDate.addZero(countDay + 1);
        trtd += '<td class="day';
        trtd += (markToday && markToday === countDay + 1) ? ' today" ':'"';
        trtd += ' data-date="${countDay + 1}" data-fdate="&{fullDate}">';
      }
      trtd += (startCount) ? ++countDay : '';
      if(countDay === lastDay.getDate()){
        startCount = 0;
      }
      trtd += '</td>';
    }
    trtd += '</td>';
  }
  calBody.innerHTML = trtd;
}

function init(){    
    setCalHead(initDate.today.getMonth(), initDate.today.getFullYear());
    loadYYMM(initDate.today);
}

init();