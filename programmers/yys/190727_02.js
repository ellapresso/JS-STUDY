//자연수 뒤집어 배열로 만들기
//https://programmers.co.kr/learn/courses/30/lessons/12932?language=javascript
function turnInToArray(n) {
  // 값을 넣을 배열
  const answer = [];
  // 인수를 조작하기 편하게 문자열로 변경
  const sNumber = n.toString();
  let turnNumber;
  // 뒤집어서 넣는 것이니까 맨 뒤부터 뽑아서 배열에 넣기
  for (var i = sNumber.length - 1, len = 0; i >= len; i--) {
    turnNumber = parseInt(sNumber.charAt(i));
    answer.push(turnNumber);
  }
  return answer;
}
