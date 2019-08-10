function solution(x, n) {
    const list =[x]
    while(n>1){
        list.push(list[list.length-1]+x) // list의 마지막 배열에 x를 더한다.
        n--
    }
    return list;
}