function solution(prg,spd){
    const finish=[]
    const result =[]
    let cnt = 1;
        while(prg.length!=0){
        finish.push(count(prg,spd))
    }
    for(let i=0;i<finish.length-1;i++){
        if(finish[i]-finish[i+1]>=0){
            cnt++;
        }
        if(finish[i]-finish[i+1]<0){
            cnt=1
        }
        result.push(cnt)
    }
    if(Math.max.apply(null,prg)===prg[prg.length-1]){
        result.push(1)
    }
    return result
}

function count(prg, spd){
    let cnt = 0
        do{
            prg[0]=prg[0]+spd[0]
            cnt++
        }while(prg[0]<=100)
        spd.shift()
        prg.shift()
        return cnt
}