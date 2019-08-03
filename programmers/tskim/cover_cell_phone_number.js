// 프로그래머스, 핸드폰 번호 가리기
// https://programmers.co.kr/learn/courses/30/lessons/12948

function solution(phone_number) {
    var answer = '';
    var asterisk_length = phone_number.length - 4;
    
    answer = phone_number.substr(asterisk_length, 4);
    console.log(answer);
    
    for(var i = 0; i < asterisk_length; i ++){
        answer = "*" + answer;
    }
    
    return answer;
}