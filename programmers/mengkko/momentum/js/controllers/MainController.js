import ClockView from '../views/ClockView.js'
import WeatherView from '../views/WeatherView.js'
import WeatheView from '../views/WeatherView.js'
import TabView from '../views/TabView.js'
import TodoView from '../views/TodoView.js'
import CalendarView from '../views/CalendarView.js'

import TodoListModel from '../models/TodoListModel.js'

const tag = '[MainController]'

export default {
  init() {
    ClockView.setup(document.getElementById('clock'))
    
    WeatherView.setup(document.getElementById('weather'))

    TabView.setup(document.getElementById('tabs'))
      .on('@change', e => this.onChangeTab(e.detail.tabName))

    TodoView.setup(document.getElementById('todo'))
      .on("@submit", e => this.onSubmit(e.detail.input))
      .on("@remove", e => this.onRemoveTodo(e.detail.input))
      .on('@dblclick', e => this.onDblclickTodo(e.detail.input))
      .on('@modify', e => this.onModifyKeyword(e.detail.input, e.detail.cnt))

    CalendarView.setup(document.getElementById('calendar'))
      .on("@click", e => this.onClickDay(e.detail.input))

    this.selectedTab = 'Todo'
    this.renderView()
  },

  renderView() {
    TabView.setActiveTab(this.selectedTab);

    if (this.selectedTab === "Todo") {
      this.fetchTodoKeyword()
      CalendarView.hide()
    } else {
      this.fetchTodoKeyword()
      TodoView.hide()
    }
  },

  fetchTodoKeyword() {
    TodoListModel.list().then(data => {
      if(this.selectedTab === "Todo") TodoView.render(data)
      else CalendarView.render(data)
    })
  },

  submit(query) {
    TodoView.setValue()
    TodoListModel.add(query)
    this.renderView()
  },

  onChangeTab(tabName) {
    this.selectedTab = tabName
    this.renderView();
  },

  onSubmit(input) {
    console.log(tag, "onSubmit()", input);
    this.submit(input);
  },

  onRemoveTodo(input) {
    TodoListModel.remove(input.value)
    this.renderView();
  },

  onClickDay(input) {
    TodoListModel.search(input).then(data => {
      if(this.selectedTab === "Calendar") CalendarView.renderModal(data)
    })
  },

  onDblclickTodo(input) {
    TodoListModel.complite(input)
    this.renderView()
  },

  onModifyKeyword(input, cnt) {
    TodoListModel.modify(input, cnt)
    this.renderView()
  }
}