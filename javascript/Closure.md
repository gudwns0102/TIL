##Closure

Closure는 function + lexical environment다.
lexical environment는 함수가 생성될 당시의 state를 말한다.
모든 JS의 function이 lexical environment를 가지기 때문에

```Javascript
//closure1.js
var x = "Im closure1";

module.exports = function(){
  console.log(x);
}
```

```javascript
var closure1 = require('./closure1');

closure1(); // "Im closure1"
```

closure1에서 생성된 함수는 전역으로 선언된 x를 context에 포함시킨다.
그리고 로컬 변수가 아닌 x를 사용하기 때문에 closure가 된다.

##Closure의 활용

Closure를 이용하여 private class를 모방할 수 있다.

```javascript
function factory(){
  var value = 0;
  return {
    get: () => value,
    set: (val) => value = val,
  }
}

const obj = factory();

console.log(obj.get()); // 0
obj.set(10);
console.log(obj.get()); // 10
```

obj의 외부 변수에 직접적으로 접근하는 방법은 없지만 get과 set interface를 제공함으로써 
마치 object의 private member를 public method로 접근하는 것과 같은 효과를 만들 수 있다. 