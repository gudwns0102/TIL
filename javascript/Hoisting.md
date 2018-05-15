## Hoisting

Hoisting은 Javascript가 가지는 변수 선언과 관련된 특징이다. 
C, Python에서 다음과 같은 code는 compile error이다.

```C
x = 1; // compile error
int x;
```

JS에서는 Hoisting feature로 인해 다음이 성립한다. 

```Javascript
console.log(x); // undefined
var x = 1;
```

Hoisting은 함수/전역의 임의의 위치에 선언된 모든 var를 맨 첫 부분으로 옮긴 것 처럼 보이게 한다.
하지만 초기화까지 가져오는 것은 아니라는 것이 특징이다.
위의 예에서 초기화하는 과정까지 hoisting이 된다면 1이라는 결과가 출력될 것이다.

## Temporal Dead Zone
ES2015에서 const, let이 도입되면서 Temporal Dead Zone 개념이 추가된다.

먼저 다음을 보자.

```Javascript
console.log(x, y); // Reference Error
const x;
let y;
```

위 코드는 ReferenceError를 가져온다.
그럼 다음과 같은 의문이 생긴다.

"const, let은 Hoisting이 되지 않는가?"

답은 No다. 다음 코드를 보자.

```Javascript
var x = "I'm var!"
(function (){
  console.log(x); // Reference error
  let x = "I'm let!"
}());
```

만약 let x 가 hoisting되지 않는다면 전역에 선언한 x가 출력되어야 한다. 
하지만 Referecen error가 뜬다는 것은 let x가 hoisting이 되었다는 것을 의미한다.

ES2015는 hoisting된 const, let 변수를 hoisting함과 동시에 TDZ에 포함시킨다.
TDZ에 포함된 변수는 참조될 경우 Reference error를 발생시킨다.
TDZ에 포함된 변수는 초기화가 되면 TDZ를 빠져나간다. 
