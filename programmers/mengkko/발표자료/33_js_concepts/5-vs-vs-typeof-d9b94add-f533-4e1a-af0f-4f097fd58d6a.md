# 5. == vs === vs typeof

## Javascript 에는 동등 비교연산자 두가지가 있습니다. ( == , === )

## **`===`  = 표시 3개의 동등 비교 연산자**

Javascript에서  **`===`**  연산을 사용할 때, 우리는 엄격한 동등성을 비교합니다. 

엄격한 동등성은 값은 물론이고 타입까지 같아야 한다는 의미입니다.

**`===` 와 `==`** 를 비교할 수 있는 코드 몇 가지를 가져왔습니다. 

    1234 == '1234'
    // true
    
    1234 === '1234'
    // false
    
    0 == false
    // true
    1 == true
    // true
    "" == false
    // true
    
    0 === false
    // false
    1 === true
    // false
    
    null == undefined
    // true
    null === undefined
    // false

위 코드에서 보듯이 **`===`** 연산자는 타입, 값 모두 같아야 `true`를 반환하고 하나라도 다르다면 `false`를 

반환 하는 엄격함을 갖고 있습니다. 

비교적 **`==`** 연산자는 느슨한 비교를 하는 것을 볼 수 있는데 충격적인 사실은 

    "" == false
    // true
    "0" == false
    // true

위 코드값이 `true`를 반환한다는 것입니다.

그 이유는 `falsy`값 때문입니다. `falsy`값이란 Javascript에서 우리의 문자 `""` 강제로 `false`로 변환

합니다. 그리고 `false`로 변환된 `""`은 결국 `false`와 같은 값이 돼버립니다. 

위 코드를 통해 Javascript에서는 특별한 경우가 아니라면 `==` 보다는 `===` 를 더 권장합니다. 

이유는 정확한 비교를 하기 위해서 입니다. 

Javascript에서는 총 6가지에 값을 `falsy`값으로 통용합니다. 

> 1.    false
2.   0
3.   ""
4.   null
5.   undefined
6.   NaN

간단하게 위 6가지의 `falsy` 값이 `if`문 에 인자로 들어간다면 `false`이기 때문에 진행할 수 없습니다.

    let cat = "cat"
    if("") cat = "dog"
    console.log(cat)
    // "cat"

이를 통해 이해했는지를 보기 위해 예제를 준비했습니다. 

아래 코드를 보고 어떻게 실행될지 맞혀 보세요

    let cat = "cat"
    if("0") cat = "dog"
    console.log(cat)

# typeof 란