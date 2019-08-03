//나누어 떨어지는 숫자 배열
//https://programmers.co.kr/learn/courses/30/lessons/12910

function solution(arr, divisor) {
  var answer = [];

  arr.map(v => {
    if (v % divisor === 0) {
      answer.push(v);
    }
  });

  if (answer.length === 0) return [-1];

  var sortingArray = answer.sort(function(a, b) {
    return a - b;
  });

  return sortingArray;
}
