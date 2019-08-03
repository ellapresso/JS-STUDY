//핸드폰 번호 가리기
//https://programmers.co.kr/learn/courses/30/lessons/12948
function solution(phone_number) {
  let answer = "";
  let origin = "";
  let after = "";

  for (var i = 0, leng = phone_number.length - 4; i < leng; i++) {
    // 별표 처리 몇 개 할 건지 (답이 8~20자에서 몇 자가 들어올지 모르니까..?)
    after = after + "*";
    //
    origin = origin + phone_number.charAt(i);
    console.log("222", after, origin);
  }

  /* 원래 문자열에서 바꿔주고자 하는 번호를 *** */
  answer = phone_number.replace(origin, after);

  return answer;
}
