function solution(n) {
  var answer =
    (n + "")
      // n => 문자열
      .split("")
      // 문자열 => 배열
      .sort()
      // 배열 => 오름차순 정렬
      .reverse()
      // 역정렬
      .join("") * 1;
  // 배열 => 문자열 => 숫자형
  return answer;
}
