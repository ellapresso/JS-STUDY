// 핸드폰번호 가리기
const solution1 = (phone_number) => {
    // 가려질 문자길이
    const len = phone_number.length - 4;
    // 가려질 문자만큼 * 반복
    let str = '*'.repeat(len);
    // 전화번호 뒷 4자리
    const numStr = phone_number.slice(len);
    return str+numStr
};

console.log(solution1("01033334444"))
console.log(solution1("0027"))


// 나누어 떨어지는 숫자 배열
const solution = (arr, divisor) => {
    // 나머지가 0인것만 필터 
    const result = arr.filter((v) => v % divisor === 0);
    //값이 없으면 [-1] 리턴, 있으면 오름차순으로 변경후 리턴
    return (result.length === 0) ? [-1] : result.sort((a, b) => a - b)
};

console.log(solution([5, 9, 7, 10], 5))
console.log(solution([2, 36, 1, 3], 1))
console.log(solution([3, 2, 6], 10))