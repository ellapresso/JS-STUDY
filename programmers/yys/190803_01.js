//핸드폰 번호 가리기
//https://programmers.co.kr/learn/courses/30/lessons/12948
function solution(phone_number) {
  var answer = "";
  var origin = "";
  var after = "";

  for (var i = 0, leng = phone_number.length - 4; i < leng; i++) {
    after = after + "*";
    origin = origin + phone_number.charAt(i);
  }

  answer = phone_number.replace(origin, after);

  return answer;
}
