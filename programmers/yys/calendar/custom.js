/* 스크립트에 필요한 변수 미리 선언*/
const currentDayDOM = document.getElementById("cur-day"),
  currentMonthDOM = document.getElementById("cur-month"),
  calenderMonthDOM = document.getElementById("cal-month"),
  currentDateDOM = document.getElementById("cur-date"),
  calenderYearDOM = document.getElementById("cal-year"),
  currentYearDOM = document.getElementById("current-year"),
  noteDateInPopup = document.getElementById("noteDate"),
  saveBtnInPopup = document.getElementById("add-post-it"),
  deleteBtnInPopup = document.getElementById("delete-button"),
  noteContentInput = document.querySelector(".note-content"),
  noteTitleInput = document.querySelector(".note-title"),
  verb = document.querySelector(".verb"),
  modal = document.querySelector(".modal"),
  colorModal = document.getElementById("fav-color"),
  popup = document.querySelector(".popup"),
  noteModal = document.getElementById("make-note");

document.querySelector(
  "table"
).style.boxShadow = `0px 0px 149px -28px "#2FCCB9"`;
document.querySelector(".color").style.backgroundColor = `"#2FCCB9"`;
document.querySelector(".border-color").style.backgroundColor = `"#2FCCB9"`;
for (let i = 0; i < 7; i++) {
  document.querySelectorAll(".weekday")[i].style.backgroundColor = `"#2FCCB9"`;
}

/* 현재 날짜 계산 */
const now = new Date();
const todayDay = now.getDay(),
  todayDate = now.getDate(),
  todayMonth = now.getMonth(),
  todayYear = now.getFullYear();

/* 현재 날짜를 담은 객체 */
const state = {
  todayDay,
  todayDate,
  todayMonth,
  todayYear
};

/* 달력에 표현할 값들 변수에 담기 */
const daysStr = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat"
};
const daysIndex = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6
};
const monthsStr = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec"
};
const monthsIndex = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11
};

var notes;
let staticNotes = [];

/* 스케줄 추가하기... */

let notesFound = localStorage.getItem("notes");

if (!notesFound) {
  console.log("notes not Found");
  localStorage.setItem("notes", JSON.stringify(staticNotes));
  notes = staticNotes;
} else {
  notes = JSON.parse(notesFound);
}

currentDayDOM.innerHTML = daysStr[todayDay];
currentDateDOM.innerHTML = todayDate;
currentMonthDOM.innerHTML = monthsStr[state.todayMonth];
currentYearDOM.innerHTML = todayYear;
/* 현재 년도에 대한 월마다의 날짜, 요일, 달력에서 몇 번째 칸인지에 대한 값을 돌려받음*/
var currentFullYear = analyizYear(state.todayYear);
var currentFullMonth = currentFullYear.months[monthsStr[state.todayMonth]];

//캘린더 실행
showCalenderInfo();

// analyizYear(year) 모든 달의 길이, 1일과 마지막 날의 index 값을 돌려줌
function analyizYear(year) {
  let counter = 0;
  const currentYear = {
    year: year,
    is_leap: false,
    months: {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11
    }
  };
  /* 12보다 작을 동안 */
  while (counter < 12) {
    Object.keys(currentYear.months).forEach(month => {
      /* 상단에 설정한 햇수가 year */
      /* month는 객체의 키, (값이 x) */
      currentYear.months[month] = analyizMonth(month, year);
    });
    counter++;
  }
  if (currentYear.months["Feb"].days_length === 29) {
    /* 윤달 여부 체크 */
    currentYear.is_leap = true;
  }
  return currentYear;
}
// analyizMonth(문자열 달:'Dec', year)
function analyizMonth(month, year) {
  const testDays = 31;
  let counter = 0;

  const monthObj = {
    year: year,
    month: month,
    month_idx: monthsIndex[month],
    first_day: "",
    first_day_index: null,
    days_length: 0,
    last_day_index: null
  };
  // 1. 31보다 작을 동안
  while (counter < testDays) {
    counter++;
    const dateTest = `${counter} ${month} ${year}`;
    // console.log("analyizMonth", dateTest);
    // 일자와 달 년도를 넣어서 .toDateString(); 메소드를 사용하면 => ["Fri", "Mar", "29", "2019"] 반환
    const dateArr = new Date(dateTest).toDateString().split(" ");
    /* console.log("analyizMonth", dateArr); */
    if (dateArr[1] === month) {
      /* 2. 현재 구하고자 하는 달(초기 입력달)과 Date객체가 돌려 준 월의 값이 같을 경우에만 */

      if (counter === 1) {
        /* 1일이 무슨 요일인지 */
        monthObj.first_day = dateArr[0];
        /* 얻은 요일 값으로 상단에 미리 정의해 둔 객체 내 daysIndex도 설정 */
        monthObj.first_day_index = daysIndex[dateArr[0]];
      }
      /* 돌려 받은 횟수만큼 카운트 => 각 달마다 몇 일이 있는지 확인 가능, 28or29, 30, 31 */
      monthObj.days_length++;
      /* Date 객체가 돌려주는 값만큼 계속 값이 바뀜 => 결국 마지막으로 돌려받은 (마지막 일자)가 해당 값이 될 것 */
      monthObj.last_day = dateArr[0];
      monthObj.last_day_index = daysIndex[dateArr[0]];
    } else {
      console.log("while문 안 analyizMonth", monthObj);
      return monthObj;
    }
  }
  console.log("while문 밖 analyizMonth", monthObj);
  return monthObj;
}

//현재 보여지는 달에 대한 마지막 일자를 구해줌
function makePrevMonthArr(firstDayIndex) {
  let prevMonthIdx;
  let prevMonthDays;
  if (state.todayMonth === 0) {
    prevMonthDays = analyizMonth("Dec", state.todayYear - 1).days_length;
  } else {
    prevMonthIdx = monthsIndex[currentFullMonth.month] - 1;
    prevMonthDays = currentFullYear.months[monthsStr[prevMonthIdx]].days_length;
  }
  let result = [];
  for (let i = 1; i <= firstDayIndex; i++) {
    const day = prevMonthDays - firstDayIndex + i;
    result.push({ day, state: "prevMonth" });
  }

  return result;
  //**** previous version of this code was returning just days without state
  //**** like [1,2,3] instead of day and its state like [{day:1,"prevMonth"}]
  // return Array.from(
  // 	{ length: firstDayIndex },
  // 	(_, i) => prevMonthDays - firstDayIndex + i
  // );
}
// this will print an array of with days of prev month and next month crosponds to the calender table
function calcMonthCalendar() {
  // Create array: [1, 2, 3, ..., 30, 31]
  const currMonth = Array.from(
    { length: currentFullMonth.days_length },
    (_, i) => ({ day: i + 1, state: "currMonth" })
  );

  const nextMonth = Array.from(
    { length: currentFullMonth.days_length },
    (_, i) => ({ day: i + 1, state: "nextMonth" })
  );

  // Create a flat array with leading zeros and trailing last week:
  // [0, 0, 0, 0, 1, 2, 3, ..., 30, 31, 1, 2, 3, 4, 5, 6, 7]
  const flatResultArr = [
    ...makePrevMonthArr(currentFullMonth.first_day_index),
    ...currMonth,
    ...nextMonth // this includes extra numbers that will be trimmed
  ].slice(0, 7 * 6); // 7 days/week * 6 weeks

  // Chunk the flat array into slices of 7:
  const resultArr = [];
  for (let i = 0; i < 7; i++) {
    resultArr.push(flatResultArr.slice(i * 7, (i + 1) * 7));
  }
  return resultArr;
}

// print each cell its day number and color
function printMonthCalendarInDOM() {
  const monthArr = calcMonthCalendar();

  let currentMonthStarted = false;
  let currentMonthEnd = true;
  for (let i = 0; i < 6; i++) {
    let currentWeek = monthArr[i];
    //
    const week = document.querySelector("#table-body").children[i];
    for (let j = 0; j < 7; j++) {
      week.children[j].style.backgroundColor = "white";
      week.children[j].style.opacity = 1;
      // console.log(currentWeek[j].day);
      if (currentWeek[j].day === 1) {
        currentMonthStarted = true;
      }
      if (
        currentMonthEnd &&
        currentMonthStarted &&
        currentWeek[j].day === todayDate &&
        currentFullMonth.month_idx === todayMonth &&
        currentFullYear.year === todayYear
      ) {
        let todayFullDate =
          state.todayYear +
          " " +
          (state.todayMonth + 1) +
          " " +
          state.todayDate;
        let isTodayHasNotes = notes.filter(note => note.date === todayFullDate);
        let viewNote = "";
        if (isTodayHasNotes.length > 0) {
          viewNote = `
							
							<br>
							<div style="width:max-content;">
							<img
                src="https://img.icons8.com/color/48/000000/note.png"
                alt="sticky-note" class="sticky-note"
              />
							</div>
							<span class="tooltip"> ${isTodayHasNotes[0].title}</span>
						
							`;
          week.children[j].classList.add("tooltip-container");
        }
        // week.children[j].innerHTML = viewNote;
        // week.children[j].id = notesFound.id;

        week.children[
          j
        ].innerHTML = `<span class="day">${currentWeek[j].day}<img  id="todayLogo" src='https://img.icons8.com/material-rounded/48/000000/checked.png'  /></span> ${viewNote}`;
        // week.children[j].innerHTML = currentWeek[j].day;
        week.children[j].id = "current-day";
        week.children[j].classList.add("currMonth");
        week.children[j].style.backgroundColor = "#e1e1e1";
        currentMonthStarted = false;
        currentMonthEnd = false;
      } else {
        week.children[j].style.cursor = "";
        week.children[j].style.backgroundColor = "white"; //.style.backgroundColor = "white";
        week.children[j].style.color = "black";
        week.children[j].innerHTML = currentWeek[j].day;
        week.children[j].removeAttribute("id");
        if (currentWeek[j].state !== "currMonth") {
          week.children[j].style.backgroundColor = "#2FCCB9";
          week.children[j].style.opacity = 0.6;
          week.children[j].style.color = "rgba(255, 255, 255,0.4)";
          week.children[j].style.cursor = "default";
          week.children[j].classList.remove("currMonth");
          week.children[j].classList.remove("tooltip-container");
        }
        if (currentWeek[j].state == "currMonth") {
          //exp 2019 10 24
          week.children[j].classList.add("currMonth");
          let currentFullDate =
            currentFullMonth.year +
            " " +
            (currentFullMonth.month_idx + 1) +
            " " +
            currentWeek[j].day;
          let notesFound = notes.filter(
            note => note.date === currentFullDate
          )[0];
          if (notesFound) {
            let viewNote = `
						<td>
						<span class="day">${currentWeek[j].day}</span>
						<br>
						<div style="width:max-content;">
						<img
                src="https://img.icons8.com/color/48/000000/note.png"
                alt="sticky-note" class="sticky-note"
              />
						</div>
						<span class="tooltip"> ${notesFound.title}</span>
					</td>
						`;
            week.children[j].innerHTML = viewNote;
            week.children[j].classList.add("tooltip-container");
            week.children[j].id = notesFound.id;
          } else {
            week.children[j].classList.remove("tooltip-container");
          }
        }
      }
      // console.log("xZx: ", currentWeek[j]);
    }
  }
}

/* 달력 월 이동 */
/* 다음 달 */
function nextMonth() {
  /* 현재 월에서 1을 더함 */
  state.todayMonth += 1;
  if (state.todayMonth == 12) {
    /* 현재 달력이 12월일 경우,,, 다음 해..*/
    state.todayYear += 1;
    currentFullYear = analyizYear(state.todayYear);
    state.todayMonth = 0;
  }
  currentFullMonth = currentFullYear.months[monthsStr[state.todayMonth]];
  showCalenderInfo();
}
/* 이전달 */
function prevMonth() {
  state.todayMonth -= 1;
  if (state.todayMonth == 0) {
    state.todayYear -= 1;
    currentFullYear = analyizYear(state.todayYear);
    state.todayMonth = 11;
  }
  currentFullMonth = currentFullYear.months[monthsStr[state.todayMonth]];
  showCalenderInfo();
}
document.querySelector(".btn_next_month").addEventListener("click", nextMonth);
document.querySelector(".btn_prev_month").addEventListener("click", prevMonth);

function showCalenderInfo() {
  calenderMonthDOM.innerHTML = monthsStr[state.todayMonth];
  calenderYearDOM.innerHTML = state.todayYear;
  printMonthCalendarInDOM();
}

// 직접 년도 입력 => 달력 변경
calenderYearDOM.addEventListener("input", e => {
  let numberPattern = /\d+/g;
  let year = parseInt(e.target.innerHTML.match(numberPattern).join(""));
  if (
    e.target.innerHTML.match(numberPattern).join("").length > 3 &&
    typeof year === "number"
  ) {
    currentFullYear = analyizYear(year);
    currentFullMonth = currentFullYear.months[monthsStr[state.todayMonth]];
    state.todayYear = year;
    showCalenderInfo();
  }
});

modal.addEventListener("click", e => {
  let ele = e.target.classList;

  if (ele[0] === "modal" || ele[0] === "fade-in") {
    closeModal();
  }
});

let isModalOpen = false;

function openModal(isNote = false) {
  isModalOpen = true;
  popup.classList.remove("fade-out");
  modal.style.display = "block";

  isNote
    ? (noteModal.style.display = "flex")
    : (colorModal.style.display = "flex");
  popup.classList.add("fade-in");
}

closeModal();
function closeModal() {
  isModalOpen = false;
  popup.classList.remove("fade-in");
  popup.classList.add("fade-out");
  modal.style.display = "none";
  noteModal.style.display = "none";
  colorModal.style.display = "none";
  deleteBtnInPopup.style.display = "inline";
  noteTitleInput.value = "";
  noteContentInput.value = "";
  document.getElementById("warning").innerHTML = "";
}

/* 노트 추가하기 */
document.body.addEventListener("click", e => {
  let noteDate;
  let noteId;
  let note;
  let verbWord;
  if (e.target.parentElement.parentElement.id == "table-body") {
    if (e.target.classList.contains("tooltip-container")) {
      verbWord = "Edit";
      // deleteBtnInPopup.style.display = "display";
      noteId = e.target.id;
      console.log("noteId:", noteId);
      if (noteId == "current-day") {
        noteDate =
          state.todayYear +
          " " +
          (state.todayMonth + 1) +
          " " +
          state.todayDate;
        note = notes.filter(n => n.date == noteDate);
      } else {
        note = notes.filter(n => n.id == noteId);
      }
      console.log("note:", note);
      noteDate = note[0].date;
      openModal(true);
      fillNotePopup(note[0]);
      addNote(noteDate.split(" ")[2], noteId);
    } else if (e.target.classList.contains("currMonth")) {
      noteId = e.target.id;
      noteDate = e.target.innerHTML;
      if (noteId == "current-day") {
        noteDate = state.todayDate;
      }
      console.log("Add New Note");
      verbWord = "Create";

      openModal(true);
      addNote(noteDate, noteId);
      deleteBtnInPopup.style.display = "none";
    } else {
      console.log("Not Applicable for previous and next month");
    }
    noteDateInPopup.innerHTML = noteDate;
    verb.innerHTML = verbWord;
  } else if (e.target.classList.contains("sticky-note")) {
    verbWord = "Edit";
    // deleteBtnInPopup.style.display = "display";

    console.log("edit note (sticky)");
    noteId = e.target.parentElement.parentElement.id;
    if (noteId == "current-day") {
      noteDate =
        state.todayYear + " " + (state.todayMonth + 1) + " " + state.todayDate;
      note = notes.filter(n => n.date == noteDate);
    } else {
      note = notes.filter(n => n.id == noteId);
    }
    // note = notes.filter(n => n.id == noteId);
    noteDate = note[0].date;
    console.log("note:", note);
    openModal(true);
    fillNotePopup(note[0]);
    noteDateInPopup.innerHTML = noteDate;
    verb.innerHTML = verbWord;

    console.log("xXx");
    addNote(noteDate.split(" ")[2], noteId);
  }
});

function fillNotePopup(note) {
  noteTitleInput.value = note.title;
  noteContentInput.value = note.desc;
}

var getSelectedNoteDay;
var getSelectedNoteId;

function addNote(noteDateDay, noteDateId) {
  getSelectedNoteDay = noteDateDay;
  getSelectedNoteId = noteDateId;
}

saveBtnInPopup.addEventListener("click", () => {
  const noteDate =
    currentFullMonth.year +
    " " +
    (currentFullMonth.month_idx + 1) +
    " " +
    getSelectedNoteDay;
  let oldNote = notes.filter(note => note.date == noteDate)[0];
  if (oldNote) {
    notes = notes.filter(note => oldNote.id !== note.id);
  }

  const newNote = {
    id: Math.random(),
    title: noteTitleInput.value,
    desc: noteContentInput.value,
    date: noteDate
  };

  if (
    noteTitleInput.value.trim() !== "" &&
    noteTitleInput.value.trim() !== " " &&
    (noteContentInput.value.trim() !== "" &&
      noteContentInput.value.trim() !== " ")
  ) {
    console.log("newNote:", newNote);
    notes.push(newNote);
    closeModal(true);
    printMonthCalendarInDOM();
  } else {
    document.getElementById("warning").innerHTML = "Please fill all fields";
  }
});

// 입력한 노트 지우기
deleteBtnInPopup.addEventListener("click", () => {
  if (getSelectedNoteId == "current-day") {
    noteDate =
      state.todayYear + " " + (state.todayMonth + 1) + " " + state.todayDate;
    notes = notes.filter(note => note.date !== noteDate);
    document
      .getElementById("current-day")
      .classList.remove("tooltip-container");
  } else {
    notes = notes.filter(note => note.id !== parseFloat(getSelectedNoteId));
  }
  closeModal(true);
  printMonthCalendarInDOM();
});

// 사이드 타이머
let is24hours = true;
let intervalState;
function makeClockTikTok() {
  intervalState = setInterval(() => {
    let hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();
    // console.log("seconds:", seconds);
    let in12hours = 12;
    let dayState = "AM";

    if (hours > 0 && hours < 12) {
      in12hours = hours;
    } else if (hours !== 0) {
      if (hours === 12) {
        hours += 12;
      }
      in12hours = hours - 12;
      dayState = "PM";
    }

    if (is24hours) {
      hours = in12hours;
    }
    const timeTemplate = `
		<span>${hours > 9 ? hours : "0" + hours} </span>:
		<span>${minutes > 9 ? minutes : "0" + minutes} </span>:
		<span>${seconds > 9 ? seconds : "0" + seconds}</span>
		<span>${is24hours ? dayState : "AM"}</span>
		`;
    document.querySelector(".time").innerHTML = timeTemplate;
  }, 1000);
}
document
  .querySelector(".time")
  .addEventListener(
    "click",
    () => ((is24hours = !is24hours), makeClockTikTok())
  );

//to stop the calculating time if it is on orientation mode
var mql = window.matchMedia("(orientation: portrait)");
//if the user launched this app while on portrait mode
if (!mql.matches) {
  makeClockTikTok();
}

// Add a media query change listener
mql.addListener(function(m) {
  if (m.matches) {
    // Changed to portrait
    console.log("portrait mode");
    clearInterval(intervalState);
  } else {
    // Changed to landscape
    console.log("landscape mode");
    makeClockTikTok();
  }
});

//things i regret about this project:
//1- i didnt use a design pattern !
//2- i used date object as a string instead of date formate in notes
//3- as the feauters progress i end up with a spagheti code ! sorry :(
// FACT: it wouldn't be possible without the builtin date object "new Date()" thanks javascript !
