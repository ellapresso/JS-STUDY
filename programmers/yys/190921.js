/* 시간 초과 부분은 해결하지 못했습니다 ㅠㅠㅠㅠ */
/*
    소수 찾기
    https://programmers.co.kr/learn/courses/30/lessons/12921?language=javascript
*/
function solution(n) {
  let arr = [];
  let answer = [];
  let i = n;
  while (i > 1) {
    arr.push(i);
    i--;
  }
  arr.forEach(v => {
    for (i = 2; i < v; i++) {
      if (v % i === 0) {
        return false;
      }
    }
    answer.push(v);
  });
  return answer.length;
}
