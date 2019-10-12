import View from './View.js'

const tag = '[TodoView]'

const TodoView = Object.create(View)

TodoView.setup = function (el) {
    this.init(el)
    this.inputEl = el.querySelector('[type=text]')
    this.tableEl = el.querySelector('#todoTable')
    this.modal = document.querySelector('.modal')
    this.overlay = this.modal.querySelector('.modal__overlay')
    return this
}

TodoView.render = function(data = []) {
    if(data.length) {
        this.tableEl.innerHTML = '<tr><th>날짜</th><th>제목</th><th>수정 / 삭제</th></tr>' + this.getTodoResultHtml(data)
    }
    else this.tableEl.innerHTML = ''
    this.bindEvents()
    this.show()
}

TodoView.getTodoResultHtml = function(data) {
    return data.reduce((html, item) => {
        html += this.getTodoItemHtml(item)
        return html
    }, '<tbody>') + '</tbody>'
}

TodoView.getTodoItemHtml = function(item) {
    let html = '<tr'
    if(item.complite) html += ' class="strikeout"'
    return `${html}><input type="hidden" value="${item.cnt}"><td>${item.date}</td>
        <td>${item.keyword}</td>
        <td><button>🔨</button>  /  <button>❎</button></td></tr>`
}

TodoView.dblClick = function(e) {
    e.preventDefault()
    this.emit('@dblclick', { input : e.target.parentElement.children[0].value})
}

TodoView.bindEvents = function () {
    this.on('submit', e => e.preventDefault())
    this.inputEl.addEventListener('keyup', e => this.onKeyup(e))
    Array.from(this.el.querySelectorAll('button')).forEach(el => {
        el.addEventListener('click', e => this.clickBtn(e))
    });
    Array.from(this.tableEl.querySelectorAll('tr')).forEach(el => {
        el.addEventListener('dblclick', e => this.dblClick(e))
    })
    this.overlay.addEventListener('click', e => this.closeModal(e))
}

TodoView.onKeyup = function (e, modyfiCnt) {
    const enter = 13
    if (e.keyCode !== enter) return
    if(e.currentTarget.id === 'modifyTodo') {
        const con = confirm('해당 할 일을 수정 하시겠습니까 ?')
        if(con) {
            this.emit('@modify', { input : e.currentTarget.value ,cnt : modyfiCnt.value })
            this.closeModal()
        }
    }
    else this.emit('@submit', { input: this.inputEl.value })
}

TodoView.clickBtn = function (e) {
    const input = e.target.parentElement.parentElement
    if(e.currentTarget.innerText === "❎") {
        const con = confirm('해당 할 일을 삭제 하시겠습니까 ?')
        if(con) this.emit('@remove', { input : input.children[0] })
    } else if(e.currentTarget.innerText === "🔨") {
        this.modal.querySelector('.modal__content').innerHTML = `<h2>수정할 내용을 입력후 엔터</h2>
            <div><input id="modifyTodo" type='text' placeholder='${input.children[2].innerText}'></div>`
        this.modal.classList.remove('hidden')
        const modifyTodo = this.modal.querySelector('#modifyTodo')
        modifyTodo.addEventListener('keyup', e => this.onKeyup(e, input.children[0]))
    }
}

TodoView.closeModal = function(e) {
    this.modal.classList.add('hidden')
}

TodoView.setValue = function () {
    this.inputEl.value = ''
}

export default TodoView