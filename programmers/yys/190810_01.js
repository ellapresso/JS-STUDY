/*
https://programmers.co.kr/learn/courses/30/lessons/12954

*/
function solution(x, n) {
  let answer = [];
  let standard = x;
  for (let i = 1; i <= n; i++) {
    answer.push(standard);
    standard += x;
  }
  return answer;
}
