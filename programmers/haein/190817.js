const solution = (n) => {
    if((n < 1) || (n >= 8000000000)) throw console.error('매개변수가 조건을 충족하지 못합니다.');
    const answer = [...`${n}`];
    answer.sort((a,b)=> b- a);
    return +answer.join('');
}

console.log(solution(1293))


const solution1 = (skill, skillTrees) => {
    let answer = 0;
    const skills = [...skill];
    const arr = skillTrees.map((v) => [...v].filter((skill)=> skills.includes(skill)));
    let i = 0;

    while(i < arr.length){
        const fail = arr[i].filter((element,index) =>  element !== skills[index]);
        if(fail.length === 0) answer++;
        i++
    }
    return answer;
}

console.log(solution1("CDE",["BACDE", "CBADF", "AECB", "BDA"])) // 2