## Babel

오늘은 Babel에 대해서 좀 정리를 해둘까 한다.

Babel이란 ES2015와 같은 새로운 JS syntax를 ES5로 변환해주는 transpiler이다.
ES2015와 호환되지 않는 브라우저를 지원하기 위해서 ES5로 변환하는 과정을 거치는 것이다.

나는 React로 JS를 처음 접했기 때문에 ES5/ES2015의 경계에 대해서 모르는 상태로 
import나 arrow function과 같은 syntax를 사용했다.

그래서 ES2015가 당연히 node.js에서도 지원될줄 알고 express server 작업을 하다가 헤맨 경험도 있다.
또 Babel의 존재를 알게 되더라도 처음 babel 설정을 할 때의 당혹스러움이란 ... 

지금까지 create-react-app이나 tutorial에 의존해서 babel 설정을 해왔는데 
슬슬 babel의 기능을 능숙하게 다룰 수 있도록 학습을 해두는게 좋을 것 같아 TIL 주제로 선정했다.

## Babel usage

먼저 Babel이 어떤 작업을 해주는지 확인해본다.

```javascript
//square.js 
export default (array) => { //SyntaxError: Unexpected token export
  return array.map(x => x ** 2);
}

//main.js
import square from './square'; //SyntaxError: Unexpected token import

const x = [1,2,3];
const result = square(x);
console.log(result);
```

node CLI로 main.js를 실행시키면 syntax error가 뜬다. (cf. v9.5.0)

babel을 CLI 환경에서 사용하기 위해 다음 패키지를 설치한다.
npm install --save-dev babel-cli

npx(npm package runner)는 local에 설치된 executable을 호출할 때 사용할 수 있는 패키지다.

```
npx babel main.js
```

결과는 다음과 같다
```javascript
import square from './suqare';

const x = [1, 2, 3];
const result = square(x);
console.log(result);
```

이상하게도 변한 것이 없다. 왜일까?
Babel은 .babelrc라고 하는 config file을 통해서 transpile 형식을 참조한다.
아직 .babelrc에 아무런 plugin을 정의하지 않았기 때문에 변화가 없는 것이다. 

import, export를 해석해줄 수 있는 plugin인 babel-plugin-transform-es2015-modules-commonjs을 설치한다.
```
npm install --save-dev babel-plugin-transform-es2015-modules-commonjs
```

그리고 .babelrc를 프로젝트 최상단에 생성하여 다음과 같이 저장한다.
```javascript
{
  "plugins": ["transform-es2015-modules-commonjs"]
}
```

이제 다시 babel을 이용해서 transpile을 하면 다음과 같은 결과가 나온다.

```javascript
//square.js
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = array => {
  return array.map(x => x ** 2);
};

//main.js
'use strict';

var _suqare = require('./suqare');

var _suqare2 = _interopRequireDefault(_suqare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const x = [1, 2, 3];
const result = (0, _suqare2.default)(x);
console.log(result);
```

눈썰미가 좋다면 arrow function은 변화가 없다는 것을 눈치챘을 것이다.
이는 arrow function과 관련된 plugin을 설정해주지 않았기 때문이다.
따라서 plugin의 필요성이 느껴질 때마다 .babelrc를 수정해주면 된다.

그런데 이러한 수작업 구성이 때로는 귀찮게 느껴질 때가 있을 것이다.
이를 위해 준비된 것이 preset이다.
preset은 plugin의 집합이라고 보면 된다. 
preset을 사용하면 plugin을 일일이 설치하고 포함시키는 과정을 생략할 수 있다.
babel-preset-es2015는 ES2015와 관련된 plugin을 포함한다.

check-es2015-constants
es2015-arrow-functions
es2015-block-scoped-functions
es2015-block-scoping
es2015-classes
es2015-computed-properties
es2015-destructuring
es2015-duplicate-keys
es2015-for-of
es2015-function-name
es2015-literals
es2015-object-super
es2015-parameters
es2015-shorthand-properties
es2015-spread
es2015-sticky-regex
es2015-template-literals
es2015-typeof-symbol
es2015-unicode-regex

```
npm install --save-dev babel-preset-es2015
```
```javascript
{
  "presets": ["es2015"]
}
```

src 디렉터리를 생성하여 main.js와 square.js 옮기고 다음을 실행한다.
```
npx babel src --out-dir dist
```
이제 동일한 파일 이름으로 es5로 해석된 source code를 볼 수 있다.
실행시켜보면 정상적으로 작동한다.

```javascript
[ 1, 4, 9 ]
```

## Babel with react

```
npm install --save react react-dom styled-components
npm install --save-dev webpack webpack-dev-server babel-loader babel-preset-es2015 babel-preset-react
```

보통 react project의 모든 asset을 모듈화하기 위해서 webpack이라는 빌드 도구를 쓰는데,
webpack의 bundling 과정에서 babel을 활용할 수 있다.

먼저 src, public directory를 생성한다.

webpack config file을 project 상단에 생성한다.
```javascript
//webpack.config.js
module.exports = {
  mode: 'development',
  entry: './src/index.js',

  output: {
      path: __dirname + '/public/',
      filename: 'bundle.js'
  },

  devServer: {
      inline: true,
      hot: true,
      port: 7777,
      contentBase: __dirname + '/public/'
  },

  module: {
          rules: [
              {
                  test: /\.js$/,
                  exclude: /node_modules/,
                  use: {
                    loader: 'babel-loader',
                  }
              }
          ]
      }
};
```

.babelrc에 preset으로 es2015, react를 설정해주면 webpack이 번들링을 하는 과정에서 해당 babel config에 따라 
모든 js 파일을 trasnpile 해준다. 

src에 index.js, App.js를 생성한다.
```javascript
//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

//App.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0% {
    font-size: 20px;
  }

  20% {
    font-size: 25px;
  }

  100% {
    font-size: 20px;
  }
`

const Container = styled.div`
  font-weight: bold;
  animation-name: ${bounce};
  animation-duration: 500ms;
  animation-iteration-count: infinite;
  &:hover {
    color: blue;
  }
`

export default class App extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Container>
        Hello World!
      </Container>
    )
  }
}
```

package.json에 start script를 추가한다
"start" : "webpack-dev-server --hot --host 0.0.0.0"

만약 global로 webpack을 설치하지 않았다면 npx를 사용한다.

npm start한 후 localhost로 접속하면 App이 렌더링 된 결과를 볼 수 있다.
