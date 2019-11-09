class Calendar {
  constructor() {
    this.focusMonth = new Date()
    this.today = new Date()
    this.calendarTitle = ''
    this.dayKr = ['일',' 월', '화', '수', '목', '금', '토']

    this.btnContainer  = document.getElementsByClassName('btnContainer')[0]
    this.monthCalendar  = document.getElementsByClassName('monthCalendar')[0]
    this.monthCalendarBox  = document.getElementsByClassName('monthCalendarBox')[0]
    this.currentMonth = document.getElementsByClassName('currentMonth')[0]
    this.prevMonthBtn = document.getElementsByClassName('prevMonthBtn')[0]
    this.nextMonthBtn = document.getElementsByClassName('nextMonthBtn')[0]

    this.init()
  }

  // 초기 세팅
  init() {
    this.renderMonthCalendar()
  }

  // 오늘
  getToday() {
    this.focusMonth = new Date()
  }

  // 이전 달 이동
  prevMonth(){
    this.focusMonth = new Date(this.focusMonth.getFullYear(), this.focusMonth.getMonth() - 1, this.focusMonth.getDate());
    this.renderMonthCalendar()
  }

  // 다음 달 이동
  nextMonth(){
    this.focusMonth = new Date(this.focusMonth.getFullYear(), this.focusMonth.getMonth() + 1, this.focusMonth.getDate());
    this.renderMonthCalendar()
  }

  // 달력 그리기
  renderMonthCalendar(){
    const year = this.focusMonth.getFullYear();
    const month = this.focusMonth.getMonth();
    const calendarTitle = `${year}년 ${month +1}월`
    this.currentMonth.textContent = calendarTitle

    // 해당달의 첫날 / 요일
    const firstDate = new Date(year, month ,1)
    const firstDay = firstDate.getDay()
    // 해당달의 마지막날
    const lastDate = new Date(year,month+1,0)

    // 전달의 마지막날
    let prevLastDate = new Date(year, month ,0).getDate()
    let prevDate = (prevLastDate - firstDay ) +1
    // 다음달의 첫날
    let nextfirstDate = new Date(year, month +1 ,1).getDate()

    // 이번달 몇주 인지 
    const days = (firstDay === 0)? 7:firstDay
    let totalWeek = Math.ceil((days + lastDate.getDate()) / 7)
    if(days === 7) totalWeek = totalWeek -1

    this.renderCalendar(year,month, firstDay, lastDate, totalWeek, prevDate, nextfirstDate)

  }

  renderCalendar(year,month, firstDay, lastDate, totalWeek, prevDate, nextfirstDate ){
    let day = 1
    let html = ''

    for (let index = 1; index <= totalWeek; index++) {
      let row =` `
      html +=`<tr>`

      for (let i = 1; i <= 7; i++) {
        // 이번달 첫주는 첫요일 부터 시작
        if((firstDay < i || index > 1) && day <=  lastDate.getDate()){
          // 오늘 날짜 표시
          if ( this.today.getFullYear() == year && this.today.getMonth() == month && this.today.getDate() == day) {
            row+= `<td class="today"><p>${day}</p><ul></ul></td>`
          } else {
            row+= `<td><p>${day}</p><ul></ul></td>`
          }
          day++
        } else if( index === 1) {
          row+= `<td class="blur">${prevDate ++}</td>`

        } else if( index === totalWeek) {
          row+= `<td class="blur">${nextfirstDate ++}</td>`
        }
      }
      html += row+ `<tr>`
    }

    this.monthCalendarBox.innerHTML = html
  }


  onChangeMode({target}) {
    const className = target.className.split(' ')[0]
    const calendarTarget = document.getElementsByClassName(`${className}Calendar`)[0]

    for (const node of this.btnContainer.childNodes) {
      if(node.nodeName === 'SPAN'){
        const nodeClassName = node.className.split(' ')[0] 
        const calendar = document.getElementsByClassName(`${nodeClassName}Calendar`)[0]
        if(node.nodeName === 'SPAN' && nodeClassName !== className){
          node.classList.remove('on');
          calendar.classList.remove('display')
        } else {
          node.classList.add('on');
          calendarTarget.classList.add('display')
        }
      }
    }


  }

}

(()=>{
  const calendar = new Calendar()

  calendar.btnContainer.addEventListener('click',(e)=>{
    calendar.onChangeMode(e)
  });

  calendar.prevMonthBtn.addEventListener('click',(e)=>{
    calendar.prevMonth()
  });

  calendar. nextMonthBtn.addEventListener('click',(e)=>{
    calendar.nextMonth()
  });

})()

