function solution(skill, skill_trees) {
    const keys = skill.split('')
    const len = keys.length;
    let cnt = 0;
    skill_trees.map((item, index) => { //스킬트리 배열 돌림
        const arr = []
        for (let i = 0; i < len; i++) { //배열내에서 스킬 순서대로 찾음
            const num = item.indexOf(keys[i])
            if (num == -1) {
                break;
            } else {
                arr.push(num) //찾은 순서대로 배열에 저장
            }
        }
        // 저장한 순서가 오름차순인지 체크
        // 모든 스킬을 실행했는지 체크
        if ((arr === arr.sort()) && (arr.length === len)) {
            cnt++
        }
    }) //map

    return cnt;
}


console.log(solution('CBD', ['CABD', 'ACBD', 'DBAF', 'DBC']))
