function solution(n) {
    var a = String(n).split('')
    var l = a.length
    var b = []
    for (l = l - 1; l >= 0; l--) {
        b.push(+a.pop())
    }
    return b
}
