# Dive into GraphQL with express 

오늘은 graphql을 node express 환경에서 어떻게 서비스할 것인지 알아본다. http://graphql.org/graphql-js/ 여기에서 전반적인 내용을 참고했다.

## How to make your exprss server handle GraphQL?

express 환경에서 graphql을 서비스하는 것은 middleware를 적용하는 것과 동일한 작업이다. 그만큼 기존의 express server에 적용하기 매우 쉽다. 

먼저 다음 모듈을 설치한다.

`npm install --save express graphql express-graphql`

express와 graphql은 각각 server와 GraphQL specification을 implementation한 모듈이다. 
express-graphql은 이름에서 알 수 있듯이 express 위에서 graphql을 지원하기 위한 모듈이다. 

```javascript
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = {
  hello: () => {
    return 'Hello world!';
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
```

다른 부분은 차후에 살펴보고 express server인 app이 어떻게 graphql을 지원하는지 확인해보자. 
use()는 middleware를 지원할 때 사용하는 함수로 위와 같이 적용하면 /graphql 이라는 경로에 graphqlHTTP 함수를 마운트한다는 의미가 된다. 
graphqlHTTP는 다음과 같은 명세를 가진다.

http://graphql.org/graphql-js/express-graphql/#graphqlhttp
https://github.com/graphql/express-graphql

```javascript
graphqlHTTP({
  schema: GraphQLSchema,
  graphiql?: ?boolean,
  rootValue?: ?any,
  context?: ?any,
  pretty?: ?boolean,
  formatError?: ?Function,
  validationRules?: ?Array<any>,
}): Middleware
```

기본적으로 짚고 넘어가야 하는 내용들이다.

- GraphQLSchema는 GraphQL.md에서 소개했듯이 server와 client가 어떤 형태의 query 구조 위에서 request와 response를 주고받을 것인가에 대한 설정이자 규칙이다.
- graphiql은 브라우저 환경에서 graphql을 지원하는 server에 query를 전송해볼 수 있도록 해주는 도구로써, 위의 parameter에서 true로 값을 설정하면 graphqlHTTP가 마운트 된 경로로 들어가 원하는 query를 작성하여 결과를 확인해볼 수 있다. 개발 단계에서 true로 놓고 사용하는 것이 좋다.
- rootValue는 schema에서 각 field에서 어떤 작업을 할지에 대한 설정이 담겨있다. 예를 들어 post의 postID를 query 할 경우, postID를 찾기 위해 DB에 access하는 일련의 과정이 이 rootValue에 담겨있다. schema를 설정하는 단계에서 각 field에 resolve 함수를 포함시킬 경우, 생략도 가능하다.

## How to build schema for GraphQL ?

GraphQL server의 Schema는 해당 server가 어떠한 형태의 query에 대해서 response를 줄 수 있는지 기록되어 있는 사용 설명서와 같다. 
Client가 어떤 query를 request하면 해당 query가 server에서 처리할 수 있는지에 대해서 schema를 통해 확인(validation)하고, schema에 설정되어 있는 작업을 수행하여 그 결과를 client에게 돌려주는 것이다. 

Schema가 처리할 수 있는 type은 크게 2가지 종류로 나뉜다; Query & Mutation. 
Query는 HTTP GET == read-only, Mutation은 HTTP POST == read & write이다. 단순히 API를 읽어오는 작업을 하는 경우, Query type을 통해 수행하고 server에 어떤 변화를 주는 작업을 하는 경우 Mutation type을 통해 설정한다.

Query와 Mutation도 일종의 type이라는 점에 주목한다. Schema가 내부적으로 validation 작업을 하거나 client의 query를 처리할 때 있어서 starting point가 되는 type이 바로 이 Query와 Mutation type이다. 그 역할이 조금 특별하다는 것을 제외하면 GraphQL의 일반적인 scalar, object type과 비슷하다.

http://facebook.github.io/graphql/October2016/#sec-Language.Operations
http://facebook.github.io/graphql/October2016/#sec-Type-System

graphql에서 schema를 build하는 방법은 2가지가 있다. 직접 GraphQLSchema를 통해 build하는 것과 또는 buildSchema라는 함수를 이용해 type system notation을 graphql.js가 지원하는 schema 형태로 convert할 수 있다.

먼저 위의 예제 코드를 살펴보면 다음과 같은 block을 확인할 수 있다. 

```javascript
//not query, Query is correct!
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
```

Query라는 type은 Mutation type과 함께 모든 query의 진입점이 되는 type이다. 다만 Mutation type은 반드시 schema에 설정되어야 할 필요는 없지만 Query type은 기본적으로 schema에 반드시 처리해주어야 한다. 위의 내용은 Query type이 hello 라는 String type의 field를 가진다는 뜻이다. 따라서 client는 다음과 같은 valid query를 날릴 수 있게 된다.

```
query {
  hello
}
```

그리고 해당 field(hello)가 요청되었을 때, 어떻게 대응할 것인지에 대한 정보를 지정해주어야 한다. 

```javascript
var root = {
  hello: () => {
    return 'Hello world!';
  },
};
```




