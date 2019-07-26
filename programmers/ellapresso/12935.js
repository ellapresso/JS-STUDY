function solution(arr) {
    var a = 0
    arr.forEach((e, i) => {
        a = (arr[a] < arr[i]) ? a : i
    });
    var asd = arr.splice(a, 1)
    arr = (arr.length == 0) ? [-1] : arr
    return arr;
}
