//https://programmers.co.kr/learn/courses/30/lessons/42586
//기능개발
function solution(progresses, speeds) {
  //리턴할 값
  let answer = [];
  // 각 작업마다 걸릴 일수 배열
  let match = [];
  let index = 0;
  progresses.map(v => {
    // 배포는 하루의 끝에 이루어지니 소수점은 반올림으로 일수를 측정
    match.push(Math.ceil((100 - v) / speeds[index]));
    // 속도 배열에서 값을 가져오기 위한 역할을 함
    index++;
  });
  // 배포에 해당되는 작업을 축정하는 기준 (= 앞의 작업 프로세스)
  let standard = match[0];
  // 배포에 포함되는 작업 개수
  let flag = 1;
  for (let i = 1; i < match.length; i++) {
    if (i === match.length - 1) {
      // 현재 검사 중인 배열 값이 마지막 인덱스일 경우
      if (flag > 1) {
        // 누적된 작업 숫자가 1보다 클 경우
        if (standard >= match[i]) {
          // 기준이 되는 작업 일수보다 현재 인덱스값이 먼저 끝났을 경우
          // 작업 개수 +1
          flag += 1;
          // 배열에 추가
          answer.push(flag);
        } else {
          // 기준 작업보다 현재 인덱스 값이 늦게 끝날 경우
          // 누적 작업개수를 배열에 추가
          answer.push(flag);
          // 마지막 작업(1개)를 배열에 추가
          answer.push(1);
        }
      } else {
        // 추가할 완료 작업이 따로 없을 시 마지막 작업 하나만 추가해 준다
        answer.push(1);
      }
    } else {
      if (standard >= match[i]) {
        //기준이 되는 숫자보다 탐색 중인 숫자의 수가 작을 때
        // = 뒤에 작업이 앞에 작업보다 먼저 완료되고 대기 중인 상태임
        flag += 1;
      } else {
        //기준이 되는 숫자보다 탐색 중인 숫자의 수가 클 때
        // 현재 누적된 flag(개수)를 배열에
        answer.push(flag);
        // 기준 숫자를 현재 탐색 중인 숫자로 변경
        standard = match[i];
        // flag는 다시 1로 리셋 (현재 작업을 자동 포함 = 1)
        flag = 1;
      }
    }
  }
  return answer;
}
