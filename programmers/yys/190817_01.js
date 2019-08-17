/* 정수 내림 차순 배치 */
/* https://programmers.co.kr/learn/courses/30/lessons/12933 */
function solution(n) {
  var answer = "";
  var turnTostring = n + "";
  var turnToarray = turnTostring.split("");
  var sortedArray = turnToarray.sort((a, b) => {
    return b - a;
  });
  sortedArray.map(v => {
    answer += v;
  });

  return parseInt(answer);
}
