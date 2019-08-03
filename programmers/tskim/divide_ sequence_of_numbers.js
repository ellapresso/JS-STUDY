// 프로그래머스, 나누어 떨어지는 숫자 배열
// https://papago.naver.com/?sk=auto&tk=en&st=%EB%82%98%EB%88%84%EC%96%B4%20%EB%96%A8%EC%96%B4%EC%A7%80%EB%8A%94%20%EC%88%AB%EC%9E%90%20%EB%B0%B0%EC%97%B4

function solution(arr, divisor) {
    var answer = [];
    
    for(var i = 0; i < arr.length; i++)
    {
        if((arr[i] % divisor) == 0)
        {
            answer.push(arr[i]);
        }
    }
  
    if(answer.length == 0) {
        return [-1];
    } else {
        return answer.sort((a, b) => a - b);
    }
    
    return answer;
}