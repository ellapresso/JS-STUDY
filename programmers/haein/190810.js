// x만큼 간격이 있는 n개의 숫자
/**
 * 조건
 * x는 -10000000 이상, 10000000 이하인 정수입니다.
 * n은 1000 이하인 자연수입니다
 */
const solution1 = (x, n) => {
    if (!(x >= -10000000 && x <= 10000000 && n > 0 && n <= 1000 && Number.isInteger(x))) {
        throw console.error('매개변수가 조건을 충족하지 못합니다.')
    }

    const answer = [];
    let tempNum = 0;
    let answerLength = 0;

    while (n !== answerLength) {
        tempNum += x;
        answer[answerLength] = tempNum;
        answerLength++
    }
    return answer
};

console.log(solution1(2, 5))
console.log(solution1(4, 10))
console.log(solution1(-4, 2))

 const solution = (progresses, speeds) => {
    const workCnt = progresses.length;
    let curruntIndex = 0;

    let breakPoint = '';
    const workDays = [];
    const tempObj = {}
    
    // 잔업일 구하기
    while (workCnt > curruntIndex) {
        const restWork = 100 - progresses[curruntIndex]; // 잔업량
        workDays[curruntIndex] =  Math.ceil(restWork / speeds[curruntIndex]) // 잔업일
        const workDay =  workDays[curruntIndex]

        if(curruntIndex === 0){
            breakPoint = workDay
            tempObj[workDay] = [workDay]
        }else {
            if(breakPoint < workDay){
                breakPoint = workDay
                tempObj[workDay] = [workDay]
            }else {
                tempObj[breakPoint].push(workDay)
            }
        }
        
        curruntIndex ++
    }
    const answer = Object.keys(tempObj).map((v) => tempObj[v].length )

    return answer;
}

// console.log(solution([93,30,55,93,30,55], [1,30,5,1,30,4]))
// console.log(solution( [40, 93, 30, 55, 60, 65, 40], [60, 1, 30, 5 , 10, 7, 60]))// [1,2,3]
console.log(solution( [93, 30, 55, 60, 40, 65],  [1, 30, 5 , 10, 60, 7]))// 

