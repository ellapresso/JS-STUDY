// 제한 사항
// 작업의 개수(progresses, speeds 배열의 길이)는 100개 이하입니다.
// 작업 진도는 100 미만의 자연수입니다.
// 작업 속도는 100 이하의 자연수입니다.
// 배포는 하루에 한 번만 할 수 있으며, 하루의 끝에 이루어진다고 가정합니다.
// 예를 들어 진도율이 95%인 작업의 개발 속도가 하루에 4%라면 배포는 2일 뒤로 이루어집니다.

function solution(progresses, speeds) {
    var answer = [];
    let count = 0;
    
    let progressesTemp = progresses;
    let speedsTemp = speeds;
    let publishDailyCount = 0;
    
    //제한 사항 확인
    // 작업의 개수(progresses, speeds배열의 길이)는 100개 이하입니다.
    if(progressesTemp.length > 100)
    {
        return answer;
    }
    
    // 작업 진도는 100 미만의 자연수입니다.
    // 작업 속도는 100 이하의 자연수입니다.
    for(let i = 0; i < progressesTemp.length; i++)
    {
        if((progressesTemp[i] >= 100) || (speedsTemp[i] > 100))
        {
            return answer;
        }
    }
    
    // progresses에 speeds 적용하기
    // 100 이상의 progresses 개발이 있다면 어떻게 처리 할 것인가 ?

    // 앞 순서대로 progresses의 값이 100인지 확인 후 출력
    // 가장 앞 progresses가 100일 때 이어지는 progresses 확인
    while(progressesTemp.length)
    {
        for(let count = 0; count < progressesTemp.length; count++)
        {
            progressesTemp[count] += speedsTemp[count];
            
            if((progressesTemp[count] >= 100) && (count == publishDailyCount))
            {
                publishDailyCount++;
            }
        }
    
        for(let count = 0; count < publishDailyCount; count++)
        {
            progressesTemp.shift();
            speedsTemp.shift();
        }   
        if(publishDailyCount != 0)
        {            
            answer.push(publishDailyCount);
            publishDailyCount=0;
        }
    }
    return answer;
}