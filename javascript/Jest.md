## Jest

Jest는 Facebook에서 만든 test framework다. 
React 뿐만 아니라 js가 돌아가는 모든 환경에서 사용 가능하다고 한다.

create-react-app은 jest에 대한 configuration을 제공한다.
jest를 연습하기 위해서 CRA project 하나를 생성했다.

사전 등록된 test script는 프로젝트 내 생성된 모든 test를 실행한다.
```
npm test
```

이제 Jest가 react app에서 어떻게 활용될 수 있는지 알아본다.

## Snapshot in Jest

Component를 test한다는 것은 무슨 의미일까? 
사실 test라는 것은 범위가 제한이 없다.
단순한 모듈의 unit test를 넘어서서 object가 가지는 모든 것들이 test의 대상이 된다.
component는 props, state를 가지고 있고 render 과정에서 style 또한 가지고 있다.
이 모든 것들이 test의 대상이 되는 것이다.

component rendering의 결과가 원하는 형태인지 확인하고 싶을 수 있다.
원치 않게 component의 rendering 구조를 변화시킬 경우 test가 이를 issue해주는 것이 바람직할 것이다.

jest는 snapshot이라는 기능을 통해 이를 지원한다.
어떤 component의 snapshot을 생성하고, 테스트 할 때마다 해당 component를 rendering해보고 
그 결과를 이전의 snapshot가 비교, 차이가 있을 경우 error를 발생시킨다.

```javascript
//card.js
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  height: 200px;
  background-color: pink;
  font-size: 20px;
  display: flex;
  flex-direction: column;
`

const Title = styled.span`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Description = styled.span`
  flex: 4;
  widgh: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: powderblue;
` 

export default class Card extends React.Component {
  render(){
    const { title, description } = this.props;

    return (
      <Container>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Container>
    );
  }
}

Card.defaultProps = {
  description: 'There is no description',
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
}

//App.js
import React, { Component } from 'react';
import Card from './components/Card';

class App extends Component {

  render() {
    return (
      <Card title="Hello world!"/>
    );
  }
}

export default App;

//Card.test.js
import React from 'react';
import Card from './Card';
import renderer from 'react-test-renderer';

describe('Card', () => {
  test('Render Correctly', () => {
    const tree = renderer
      .create(<Card title="title" description="description"/>)
      .toJSON();
    
    expect(tree).toMatchSnapshot();
  });
})
```

테스트를 처음 실행하면 path에 _snapshots_라는 폴더가 생성된다.
그 내용을 보면 다음과 같다.

```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Card Render Correctly 1`] = `
<div
  className="sc-bdVaJa gWfXdm"
>
  <span
    className="sc-bwzfXH kKtUYG"
  >
    title
  </span>
  <span
    className="sc-htpNat rOGyZ"
  >
    description
  </span>
</div>
`;
```

참고로 styled-components와 jest를 함께 사용하기 위해서 jest-styled-components를 함께 설치해주는 것이 바람직하다.
styled-components는 제공된 style들을 이용하여 임의로 생성된 className으로 구성된 css stylesheet를 생성하고,  
해당 컴퍼넌트에 class name을 부여하는 방식으로 동작하는데, 위와 같은 snapshot에서 class name의 변화로 error가 생겼을 때,
정확히 어떤 style의 변화로 에러가 발생했는지 추적하기가 어렵다.

jest-styled-component를 import해주면 다음과 같이 결과가 변한다.

```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Card Render Correctly 1`] = `
.c0 {
  width: 300px;
  height: 200px;
  background-color: pink;
  font-size: 20px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.c1 {
  -webkit-flex: 2;
  -ms-flex: 2;
  flex: 2;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.c2 {
  -webkit-flex: 4;
  -ms-flex: 4;
  flex: 4;
  widgh: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  background-color: powderblue;
}

<div
  className="c0"
>
  <span
    className="c1"
  >
    title
  </span>
  <span
    className="c2"
  >
    description
  </span>
</div>
`;
```

이제 style에 변화가 생길 경우에 어떤 변화가 있었는지 추적하기 용이해진다.

이제 본론으로 돌아오자.

사실 component가 이전과 다른 형태로 rendering되는 경우는 실제로 해당 컴퍼넌트에 개발자가 변화를 주는 경우가 
대부분일 것이라고 생각한다. 그래도 예기치 못할 변화, 개발자가 미처 인지하지 못하는 상황에서 생긴 변화를 detect
해줄 수 있다는 것은 상당히 중요한 부분이다. snapshot은 이런 실수를 미연에 방지하기에 좋은 방식인 것 같다. 

test는 많을 수록 좋다. 그리고 그런 test를 제작하기 위해서 별다른 노력이 들지 않는다면 당연히 추가해주는 것이 맞다.
jest의 snapshot은 test를 제작하는데 거의 어떠한 노력도 들지 않는다. 그리고 예상치 못한 변화를 잡아줄 수 있다.
추가하지 않을 이유가 없는 것이다...


