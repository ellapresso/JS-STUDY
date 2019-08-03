function solution(pn) {
    const len = pn.length-4
    let star='*';
    if (len !=0){
    for(i=len;i>0;i--){
        console.log(i)
        star=star+'*'
    }
    star = star+ pn.substr(len) 
}else {
    star = pn
}
    return  star
}
