function solution(skill, skill_trees) {
  var answer = 0;
  for (let i in skill_trees) {
    // 스킬 트리만큼 for문
    const skt = skill_trees[i].split("");
    // 현제 인덱스 스킬트리를 배열로 쪼갬
    // ["B", "A", "C", "D", "E"]
    const sk = skill.split("");
    // 스킬을 배울수 있는 순서를 배열로 쪼갬
    // ["C", "B", "D"]

    if (skill.indexOf(skt.filter(s => sk.includes(s)).join("")) === 0) answer++;
    // 통과시 제출값 ++
    // 0 or "" 들어와야 answer의 카운트가 증가
    // 0 인경우는 C || CB || CBD
    // "" 인경우는 C, B, D 어떤것도 포함히자 않음
    // 그 외의 값은 false라 카운트를 증가시키지 않음
  }
  return answer;
}
