## GraphQL

GraphQL은 기존의 REST API를 대체하기 위해서 제안된 새로운 기술이다. REST API는 server-side에서 특정 URL에 대해 어떤 작업을 정의하고, client가 해당 URL로 접근하여 원하는 작업을 수행한다. server가 제공하는 URL에 대해서만 client가 원하는 결과를 얻을 수 있기 때문에 client가 요구하는 새로운 형태의 정보를 제공하기 위해선 server-side에서 추가적인 작업이 발생한다는 한계가 존재한다.

반면 GraphQL은 client가 자신이 원하는 정보에 대한 명세를 담은 query(명세에 따르면 document가 맞지만 query가 더 와닿기 때문에 이 용어를 쓰겠다)를 전송하면 server에서 이 query에 대한 validation을 수행한 뒤 가감없이 client가 원하는 정보만을 전송한다. REST API처럼 새로운 요구에 대해서 일일이 URL을 추가할 필요가 없는 것이다. 

예를 들어 REST API로 구성된 server가 있고 client에서는 id가 1인 user의 username을 필요로 할 때, 다음과 같이 API 요청을 구성할 수 있을 것이다. 

`GET SERVER_ADDR/user/1` 

하지만 server에서 해당 URL에 대해서 username만을 전송한다고 보장할 수 없다. 혹은 server에서 username만을 전송하는 API URL을 구현하지 않았을 수도 있을 것이다. 이것이 REST API의 한계 중 하나이다. 필요하지 않은 정보까지 패킷에 담겨서 전송되므로 어떤 식으로든 낭비가 발생한다. 하지만 GraphQL은 동일한 작업을 수행하기 위해서 그저 다음과 같은 query문을 전송하면 된다. 

```
{
  user(id: 1){
    name
  }
}
```

물론 server측에서 query에 대해 어떤 식으로 작업을 수행할 것인지에 대한 설정을 해주어야 하는데, 이 작업을 한 번 해놓기만 하면 client에서는 server의 API를 좀 더 flexible하게 소비하는 것이 가능해진다. 

최근에 GraphQL을 이용해서 server와 app을 구성해보는 것을 연습해보려고 하는데 컨디션이 별로라 진척이 없긴 하다... http://facebook.github.io/graphql/October2016/#로 가면 GraphQL에 대한 명세가 자세히 기록되어 있어서 implementation이 아닌, 명세에 대해서 공부하는 경우에 상당히 도움이 되는 것 같다.

http://graphql.org/로 가면 GraphQL에 대한 A to Z를 해볼 수 있도록 자세한 course가 소개되어 있다. 기존의 Server도 GraphQL로 비교적 쉽게 대체할 수 있다고 소개는 되어 있으나 실상은 어떨지 모르겠다. node express의 경우에는 기존의 URL식 접근에 대해서 /graphql과 같은 URL을 뚫어놓고 해당 URL 접근에 대해서 GraphQL 기술을 적용할 수 있다고 하니 이정도면 쉽게 탈착 가능한 것으로 보인다.

https://blog.risingstack.com/graffiti-mongoose-mongodb-for-graphql/ 여기서 mongoose schema를 graphql schema로 전환해주는 graffiti를 소개해주고 있는데 기회가 되면 한 번 사용해보고 싶다. 해당 블로그에 graphql과 관련된 post가 많이 있으니 공부할 때 참조하면 좋다.

+++ 

server-client structure에서 테스트해보기 전에 로컬에서 graphql query를 먼저 수행해보는 것이 좋은 연습이 될 것 같아서 시작한다.
mongoDB가 설치되어 있다면 다음과 같이 간단한 DB를 구성해볼 수 있다.

```
use test
db.post.insert({"postID": 1, "postBody": "Hello World!"})
db.post.insert({"postID": 2, "postBody": "This is test DB"})
```

원하는 디렉토리에 project를 생성한다.

`npm init -y`

mongoDB에 access할 수 있도록 해주는 mongoose package를 설치한다.

`npm install --save mongoose`

index.js 폴더에 다음과 같이 입력한다.

```javascript
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test')

var db = mongoose.connection;
db.on('error', ()=> {console.log('FAIL')})
db.once('open', () => {
 console.log('Connected')
})

var mongoose_schema = new mongoose.Schema({
  postID: {type: Number, required: true},
  postBody: {type: String, required: true}
}, {collection: 'post'});

var Post = mongoose.model('post', mongoose_schema);

Post.findOne({"postID": 1}, (err, post)=>{
  console.log(post);
})
```

mongoose를 이용하여 mongoDB에 access하기 위해서 schema를 반드시 정의해줘야 한다. 앞서 생성한 DB의 collection의 정보를 가져오기 위해서 schema를 구조적으로 동일하게 정의해준 뒤, mongoose model을 해당 schema를 이용하여 생성한다. 이제 mongoDB의 'post' collection을 Post라는 variable로 access할 수 있게 된다.

`node index.js`

다음과 같이 결과가 나오면 된다.

```
Connected
{ _id: 5a7253d143895cd7354af3fd,
  postID: 1,
  postBody: 'Hello World!' }
```

GraphQL을 설치하기 이전에 babel 환경부터 간단하게 세팅하겠다. 

`npm install -save-dev babel-cli babel-preset-es2015 rimraf`

package.json script에 다음을 추가한다.

```javascript
"build": "rimraf dist/ && babel ./index.js --out-dir dist/",
"start": "npm run build && node dist/index.js"
```

`npm start`

babel 세팅 이전과 같은 결과가 나오면 된다. 

이제 GraphQL을 사용해본다. http://graphql.org/code/#javascript 에서 GraphQL과 관련된 모듈을 몇 가지 소개해주고 있는데 가장 첫 번째에 있는 graphql.js를 사용해 볼 것이다.

우선 graphql을 설치한다.

`npm install --save graphql`

그리고 앞으로 index.js에서 사용할 graphql module을 load한다.

```javascript
import {
  graphql,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';
```

GraphQL은 내부적으로 Type System을 가진다. 이 Type System을 이용하여 GraphQL은 많은 작업을 수행하는데 예를 들어 sever에서 정의된 schema가 valid한지, 혹은 client의 request가 valid한지 확인하는 작업을 수행한다. GraphQL type은 number나 string 뿐만 아니라 임의의 object도 지원하는데 C의 struct 개념과 유사하다. mongoDB에 설정한 document와 일치시키기 위해서 다음과 같은 타입이 정의되면 편리할 것이다.

```
type Post {
  postID
  postBody
}
```

이를 graphql.js를 사용하여 나타내면 다음과 같다.

```javascript
var postType = new GraphQLObjectType({
  name: 'post',
  fields: () => ({
    postID: {
      type: GraphQLInt
    },
    postBody: {
      type: GraphQLString
    }
  })
})
```

이처럼 graphql.js에서는 type을 지정하기 위해서 내부적으로 GraphQL[type]과 같은 형식으로 지원하는 type을 사용해야 한다. 자세한 내용에 대해서는
http://graphql.org/graphql-js/type/ 를 참고하길 바란다. 해당 페이지에서 GraphQLObjectType에 대해서 읽어보면 name과 field는 반드시 주어져야 하는 값이므로 위와 같이 작성하였다. 

이제 우리가 원하는 postType이 정의되었으니 client가 전송한 query를 수행할 schema를 구성해야 한다. 명세상 client의 query에는 여러 개의 operation이 포함되어 있을 수 있다(http://facebook.github.io/graphql/October2016/#sec-Language.Query-Document). Fragment에 대해서는 차후에 다루기로 하고 operation을 살펴보면 operation에 2가지 predefined type이 있는 것을 알 수 있다; query & mutation.

query type operation은 HTTP의 GET method와 같다. server의 API를 단순히 읽기만 하는 경우 사용하는 operation type이다.
반면 mutation type operation은 HTTP의 POST method와 같다. server의 API를 읽을 뿐만 아니라 변형하는 작업도 포함하는 operation type이다. 

만약 client에서 보낸 query opertaion이 valid 하기 위해서는 server에서 이 operation type에 대해서 schema에 명세해야 한다. 다음과 같이 말이다.


```javascript
var postSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'query',
    fields: {},
    }
  })
})
```

만약 mutation type에 대한 작업도 명세하고 싶다면 다음과 같이 schema에 field를 추가해주면 된다.

```javascript
var postSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'query',
    fields: {},
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'mutation',
    fields:{
      message: {
        type: GraphQLString,
        resolve: () => {
          return 'This is mutation!'
        }
      }
    }
  })
})
```

cf) GraphQL.org에서 가져온 GraphQLSchema의 명세. mutation은 option이기 때문에 반드시 지정할 필요는 없다.
```javascript 
class GraphQLSchema {
  constructor(config: GraphQLSchemaConfig)
}

type GraphQLSchemaConfig = {
  query: GraphQLObjectType;
  mutation?: ?GraphQLObjectType;
}
```

이번 practice에서는 mutation에 대해서 다루지 않으므로 query type만 지정한다.

다음과 같은 간단한 query document를 지원하기 위해서 어떤 schema를 구성하면 되는지 알아보자.

```
query {
  post {
    postID
    postBody
  }
}
```
post field가 query에서 가장 먼저 등장한다. 따라서 schema에서 post라는 field를 정의해주어야 한다. 

```javascript
var postSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'query',
    fields: {
      post: {

      }
    },
    }
  })
})
```

GraphQLObjectType의 fields를 구성하는 field는 다음과 같은 명세를 가진다

```javascript
type GraphQLFieldConfig = {
  type: GraphQLOutputType;
  args?: GraphQLFieldConfigArgumentMap;
  resolve?: GraphQLFieldResolveFn;
  deprecationReason?: string;
  description?: ?string;
}
```

* type: 해당 field의 type을 지정한다. 여기서 사전에 정의해 둔 postType이라는 object type을 post field에 지정할 것이다.
* args: client가 query를 작성할 때 각 필드에 argument를 지정할 수 있다. client가 지정한 argument가 valid하기 위해서 해당 field에 matching되는 argument가 지정되어 있어야 한다. 예를 들어서 post(postID: 1)라는 query가 valid하기 위해선 postID라고 하는 argument가 정의되어야 한다. 
* resolve: 해당 field가 어떤 작업을 수행하고 client에게 어떤 값을 보여줄지 지정하는 곳이다. GraphQL과 database가 실질적으로 연결되는 부분이다.

```javascript
type GraphQLFieldResolveFn = (
  source?: any,
  args?: {[argName: string]: any},
  context?: any,
  info?: GraphQLResolveInfo
) => any
```

해당 명세에 따라 post field의 GraphQLFieldConfig를 작성하면 다음과 같다. 
```javascript
post: {
  type: new GraphQLList(postType),
  args: {
    postID: {
      name: 'postID',
      type: GraphQLInt,
    }
  },
  resolve: (source, args, context, fieldASTs) => {
    var projections = getProjection(fieldASTs);
    var key = Object.keys(args).length == 0 ? {} : {postID: args.postID}
    var foundPost = new Promise((resolve,reject)=> {
      Post.find(key, projections, (err, post) => {
        err ? reject(err) : resolve(post)
      })
    })
    
    return foundPost;
  }
}

function getProjection (fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = true;
    return projections;
  }, {});
}
```

getProjection는 fieldASTs에 포함되어 있는 selection 를 추출하는 함수다. 
```
{
  post {
    postID
    postBody
  }
}
```
와 같은 query의 경우에는 postID, postBody가 selection이 된다. 따라서 mongoDB에서 데이터를 query할 때 이러한 field들을 가져올 수 있도록 요청하기 위해서 projection의 과정을 거치는 것이다. 

selection set(postID, postBody) ===> db.post.find({condition}, {postID, postBody})

이제 로컬 환경에서 schema를 작성했기 때문에 query를 해당 schema와 결합하여 어떤 결과가 나오는지 확인해 볼 차례다.
위의 resolve를 확인해보면 args가 존재할 경우 Post에서 postID에 해당하는 document를 return하고 args가 존재하지 않는 경우에는 모든 post를 return하도록 작성하였다.

```javascript
var myQuery = 
`
query { 
  post {
    postID
    postBody
  }
}
`

var myQuery2 = 
`
{
  post(postID: 2) {
    postBody
  }
}
`

graphql(postSchema, myQuery).then(result => console.log(result.data.post));
graphql(postSchema, myQuery2).then(result => console.log(result.data.post));
```

다음과 같은 결과가 나온다.

```
Connected
[ { postID: 1, postBody: 'Hello World!' },
  { postID: 2, postBody: 'This is test!' } ]
[ { postBody: 'This is test!' } ]
```
