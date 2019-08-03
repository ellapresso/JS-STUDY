//제일 작은 수 제거하기
//https://programmers.co.kr/learn/courses/30/lessons/12935
function solution(v) {
  if (!Array.isArray(v)) {
    return false;
  }
  if (v.length <= 1) {
    return [-1];
  }
  // v 가 [1,30,4,21,10000]면?
  // sort 못 씀
  // ASCII 문자 순서로 정렬되어 숫자의 크기대로 나오지 않음
  // sort를 좀 조작해야 함
  // 근데 오름차순인지 내림차순인지...? 내 멋대로 오름차순 ㄱ

  // 복사
  let sortingArray = v.sort(function(a, b) {
    return a - b;
  });

  sortingArray.splice(0, 1);

  return sortingArray;
}
