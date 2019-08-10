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

// 기능개발
/**
 * 조건
 * 작업의 개수(progresses, speeds배열의 길이)는 100개 이하입니다.
 * n은 1000 이하인 자연수입니다
 */

 const solution = (progresses, speeds) => {
    if (progresses.length <= 100 && speeds.length <= 100 && progresses.length === speeds.length) {
        throw console.error('매개변수가 조건을 충족하지 못합니다.')
    }

    const workCnt = progresses.length;
    let index = 0;

    let  deployDay= ''; // 배포일
    const deploySchedule = {} // 배포일정
    
    // 잔업일 구하기
    while (workCnt > index) {
        const restWork = 100 - progresses[index]; // 잔업량
        const workDay =  Math.ceil(restWork / speeds[index]) // 잔업일

        if(index === 0){ // 첫번째 값일경우 무조건 deploySchedule에 등록
            deployDay = workDay // 배포일 변경
            deploySchedule[deployDay] = [workDay]
        }else {
            if(deployDay < workDay){ //배포일보다 작업일이 높을 경우
                deployDay = workDay // 배포일 변경
                deploySchedule[deployDay] = [workDay] // 배포일정에 추가
            }else { //배포일보다 작업일이 낮을 경우
                deploySchedule[deployDay] = [...deploySchedule[deployDay],workDay] // 배포일정에 추가
            }
        }

        index ++
    }
    console.log(deploySchedule) 

    //{
    //     배포일:[작업일,작업일]
    //     7:[7,3],
    //     9:[9,4,1,5]
    // }

    const answer = Object.keys(deploySchedule).map((v) => deploySchedule[v].length ) // 배포일별 작업 갯수 수하기

    return answer;
}

// console.log(solution([93,30,55,93,30,55], [1,30,5,1,30,4]))
// console.log(solution( [40, 93, 30, 55, 60, 65, 40], [60, 1, 30, 5 , 10, 7, 60]))// [1,2,3]
console.log(solution( [93, 30, 55, 60, 40, 65],  [1, 30, 5 , 10, 60, 7]))// 

