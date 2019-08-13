function solution(n) {
    if (n < 1 || n > 8000000000) {
        return false
    }
    const items = String(n).split('')
    items.sort(function (a, b) {
        return b - a
    })
    return +items.join('');
}
