// 나누어 떨어지는 숫자 배열
// array의 각 element 중 divisor로 나누어 떨어지는 값을 오름차순으로 정렬한 배열을 반환하는 함수, solution을 작성해주세요.
// divisor로 나누어 떨어지는 element가 하나도 없다면 배열에 -1을 담아 반환하세요.

// 제한사항
// arr은 자연수를 담은 배열입니다.
// 정수 i, j에 대해 i ≠ j 이면 arr[i] ≠ arr[j] 입니다.
// divisor는 자연수입니다.
// array는 길이 1 이상인 배열입니다.

// 입출력 예
// arr	            divisor	    return
// [5, 9, 7, 10]	5	        [5, 10]
// [2, 36, 1, 3]	1	        [1, 2, 3, 36]
// [3,2,6]	        10	        [-1]

// 입출력 예 설명
// 입출력 예#1
// arr의 원소 중 5로 나누어 떨어지는 원소는 5와 10입니다. 따라서 [5, 10]을 리턴합니다.
// 입출력 예#2
// arr의 모든 원소는 1으로 나누어 떨어집니다. 원소를 오름차순으로 정렬해 [1, 2, 3, 36]을 리턴합니다.
// 입출력 예#3
// 3, 2, 6은 10으로 나누어 떨어지지 않습니다. 나누어 떨어지는 원소가 없으므로 [-1]을 리턴합니다.

function solution(arr, divisor) {
  var answer = [];

  for (let i in arr) if (!(arr[i] % divisor)) answer.push(arr[i]);
  //  arr의 길이 만큼 도는데 해당 인덱스 값을 divisor과 % 연산해서 0인 값일때(나머지 값 0 = 나누어 떨어지는수) 만 answer에 push
  //  나누어떨어지는 값이 있어야 true지만 !연산자를 추가해 나누어 떨어지는 값이 없어야 true 이다.
  if (answer.length === 0) return [-1];
  //  길이가 0이라면 [-1] 을 리턴한다.
  answer.sort((a, b) => a - b);
  //  오름차순으로 정렬한다.
  return answer;
}
