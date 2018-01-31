## GraphQL

  GraphQL은 기존의 REST API를 대체하기 위해서 제안된 새로운 기술이다. REST API는 server-side에서 특정 URL에 대해 어떤 작업을 정의하고 client가 해당 URL로 접근하는 형태를 보여준다. server가 제공하는 URL에 대해서만 client가 원하는 결과를 얻을 수 있기 때문에 client가 요구하는 새로운 형태의 정보를 제공하기 위해선 server-side에서 추가적인 작업이 발생한다.  

  반면 GraphQL은 client가 전송한 query에 해당하는 data만을 전송한다. REST API처럼 새로운 요구에 대해서 일일이 URL을 추가할 필요가 없다는 뜻이다. 
예를 들어 REST API로 구성된 server가 있고 client에서는 id가 1인 user의 username을 필요로 할 때, 다음과 같이 API 요청을 구성할 수 있을 것이다. 'SERVER_ADDR/user/1' 하지만 server에서 해당 URL에 대해서 username만을 전송한다고 보기는 어렵다. 이것이 REST API의 한계 중 하나이다. 필요하지 않은 정보까지 패킷에 담겨서 전송되므로 어떤 식으로든 낭비가 발생한다. GraphQL은 동일한 작업을 수행하기 위해서 그저 document라고 부르는 일종의 query문을 전송한다. 

```
{
  user(id: 1){
    name
  }
}
```

  최근에 GraphQL을 이용해서 server와 app을 구성해보는 것을 연습해보려고 하는데 컨디션이 별로라 진척이 없긴 하다. http://facebook.github.io/graphql/October2016/#로 가면 GraphQL에 대한 명세가 자세히 
기록되어 있어서 implementation이 아닌, 명세에 대해서 공부하는 경우에 상당히 도움이 되는 것 같다. 학부 시절 때 PL assignment를 진행할 때 보던 명세랑 비슷해서 기분이 묘하다. 

http://graphql.org/로 가면 GraphQL에 대한 A to Z를 해볼 수 있도록 자세한 course가 소개되어 있다. 기존의 Server도 GraphQL로 비교적 쉽게 대체할 수 있다고 소개는 되어 있으나 실상은 어떨지 모르겠다. node express의 경우에는 기존의 URL식 접근에 대해서 /graphql과 같은 URL을 뚫어놓고 해당 URL 접근에 대해서 GraphQL 기술을 적용할 수 있다고 하니 이정도면 쉽게 붙였다 뗐다 할수는 있을 것 같다.  
