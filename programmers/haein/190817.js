const solution = (n) => {
    if((n < 1) || (n >= 8000000000)) throw console.error('매개변수가 조건을 충족하지 못합니다.');
    const answer = [...`${n}`]; // 숫자값을 문자타입으로 변경 후 배열로 만듬
    answer.sort((a,b)=> b-a); // 내림차순으로 변경
    return +answer.join(''); // 배열을 문자열로 합친 후 숫자타입으로 변환
}

console.log(solution(1293))

const solution1 = (skill, skillTrees) => {
    let answer = 0;
    const skills = skillTrees.map((v) => {
       return [...v].filter((v1)=> {   //필터링 된 데이터로 배열 만들기
            return skill.includes(v1) //skillTrees에서 skill이 있는 것만 필터링
        })
    });
    for (const v of skills) {
        // skill 과 skills 인덱스가 같지 않은 것만 리턴
        const fail = v.filter((element,index) =>  element !== skill[index]);
        // fail : [],[],['E','C'],['D']]
        // 인덱스가 전부 같은 경우는 length === 0 인 경우, 그래서 0일때 answer에 ++
        if(fail.length === 0) answer++;
    }
    return answer;
}

console.log(solution1("CDE",["BACDE", "CBADF", "AECB", "BDA"])) // 2
