// 제일 작은 수 제거하기
const solution = arr => {
  const arr2 = new Set(arr);
  const lastNum = [...arr2].sort((a, b) => b - a).pop();
  arr2.delete(lastNum);
  return arr2.size === 0 ? [-1] : [...arr2];
};

console.log(solution([1, 1, 2, 4]));
console.log(solution([10]));

// 자연수 뒤집어 배열로 만들기
const solution2 = n => {
  const str = n.toString();
  const arr = [...str];
  const answer = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    answer.push(+arr[i]);
  }

  return answer;
};
console.log(solution2(1114));
