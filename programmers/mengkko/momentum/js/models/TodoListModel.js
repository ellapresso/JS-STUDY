export default {
    data : [],

    list() {
        const localData = JSON.parse(localStorage.getItem('toDos'))
        if(localData) this.data = localData
        this.data.sort(function(a, b) {
            return a.date > b.date ? -1 : a.date < b.date ? 1 : 0
        })
        localStorage.setItem('toDos', JSON.stringify(this.data))
        return Promise.resolve(this.data)
    },

    add(keyword = '') {
        keyword = keyword.trim()
        if (!keyword) return
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        if(month < 10) month = "0" + month
        if(day < 10) day = "0" + day
        const today = year + "-" + month + "-" + day
        const complite = false

        const cnt = this.data.length + ""
        this.data = [{keyword, date : today, cnt, complite}, ...this.data]
        localStorage.clear()
        localStorage.setItem('toDos', JSON.stringify(this.data))
    },

    remove(cnt) {
        if (!cnt) return
        this.data = this.data.filter(item => item.cnt !== cnt)
        localStorage.clear()
        localStorage.setItem('toDos', JSON.stringify(this.data))
    },

    search(date) {
        if (!date) return
        date = date.trim()
        return Promise.resolve(this.data.filter(item => item.date === date))
    },

    complite(cnt) {
        if (!cnt) return
        const idx = this.data.findIndex(function(el) {
            return el.cnt === cnt
        })
        this.data[idx].complite = this.data[idx].complite ? false : true
        localStorage.clear()
        localStorage.setItem('toDos', JSON.stringify(this.data))
    },

    modify(input, cnt) {
        if (!cnt) return
        const idx = this.data.findIndex(function(el) {
            return el.cnt === cnt
        })
        this.data[idx].keyword = input
        localStorage.clear()
        localStorage.setItem('toDos', JSON.stringify(this.data))
    }
}