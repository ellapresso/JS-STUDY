// 자연수 n을 뒤집어 각 자리 숫자를 원소로 가지는 배열 형태로 리턴해주세요. 예를들어 n이 12345이면 [5,4,3,2,1]을 리턴합니다.

// 제한 조건
// n은 10,000,000,000이하인 자연수입니다.

// 입출력 예
// n	return
// 12345	[5,4,3,2,1]

function solution(n) {
  const answer = (n + "").split("").reverse();
  // 자바스크립트의 자동 형 변환을 이용해서 자연수에 + ""(문자열)을 더해주면
  // 자동으로 문자열로 변환이 됩니다.
  // split메소드를 통해 배열로 변환한뒤 reverse메소드를 이용해서 역정렬을 해줍니다.

  for (const i in answer) answer[i] = answer[i] * 1;
  // for문을 통해 문자열로 변환된 배열의 값들을 다시한번 자바스크립트 자동 형 변환을 통해
  // 다시 자연수로 변환해 줍니다.

  // const answer = (n + "").split("").reverse().map(n => parseInt(n))
  // 프로그래머스 정답 제출 후 본 정답.
  return answer;
}
