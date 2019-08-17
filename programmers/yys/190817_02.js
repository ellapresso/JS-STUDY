/* 스킬트리 */
/* https://programmers.co.kr/learn/courses/30/lessons/49993 */
function solution(skill, skill_trees) {
  var answer = 0;
  var tickArray = skill.split("");
  var myMap = new Map();
  var check = 0;
  skill_trees.map(v => {
    var pushedArray = new Array();

    for (var i = 0; i < tickArray.length; i++) {
      check = v.indexOf(tickArray[i]);
      pushedArray.push(check);
    }

    myMap.set(v, pushedArray);
  });
  console.log("map 확인", myMap);

  for (var j = 0; j < skill_trees.length; j++) {
    var a = myMap.get(skill_trees[j]);

    for (var k = a.length - 1; k > 0; k--) {
      if (a[k] > a[k - 1]) {
        if (a[k - 1] > -1) {
          console.log("뭐랑 뭐?", a[k], a[k - 1]);
          answer = k === 1 ? answer + 1 : answer;
        } else {
          k = 0;
        }
      } else {
        if (k === a.length - 1 && a[k] === -1) {
          console.log("마지막 인덱스래", a[k]);
          k = k;
        } else {
          k = 0;
        }
      }
    }
    console.log(a, "맨 마지막 문장", answer, skill_trees[j]);
  }

  return answer;
}
