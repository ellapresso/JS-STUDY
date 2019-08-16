function solution(skill, skill_trees) {
    const keys = skill.split('')
    console.log(keys)
    let cnt = 0;

    skill_trees.forEach(e => {
        const tree = e.split('');
        const temp = []
        tree.forEach((t, idx) => {
            if (keys.indexOf(t) >= 0) {
                temp.push(keys.indexOf(t));
            }
        })
        if (test(temp)) {
            cnt++
        }
    });
    return cnt;
}

function test(arr) {
    const len = arr.length
    for (let i = 0; i < len; i++) {
        if (arr[i] !== i) {
            return false
        }
    }
    return true
}

////////////////////////////////////////////////
function solution(skill, skill_trees) {
    const keys = skill.split('')
    let cnt = 0;
    skill_trees.forEach(e => { // 역while사용하면 더 빨라짐
        const tree = e.split('');
        let temp = ''
        tree.forEach((t) => {
            if (keys.indexOf(t) >= 0) {
                temp += (t);
            }
        })
        if (skill.startsWith(temp)) {
            cnt++
        }
    });
    return cnt;
}

///////////////////////////////////////////////
function solution(skill, skill_trees) {
    const keys = skill.split('')
    return skill_trees.reduce((c = 0, d) =>
        skill.startsWith(d.split('').reduce((a, b) =>
            (keys.indexOf(b) >= 0) ? a + b : a, '')) ? c + 1 : c, 0)
}
