function solution(arr, div) {
    let rs = arr.filter(e => (e % div == 0))
    rs = (rs.length == 0) ? [-1] : rs
    return rs.sort((a, b) => {
        return a - b
    })
}
