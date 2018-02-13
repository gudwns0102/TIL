# Day3

  어제부터 오늘정도 해서 Facebook Javascript SDK를 활용해서 react-native 상에서 Parse server와 연동하는 것을 구현해보려고 노력했는데 생각만큼 잘 되지 않았다. 보류를 결심하게 된 계기는 node.js 상에서 Facebook Javascript SDK를 load하는게 불가능하다는 포스트를 봤는데 여기에 너무 많은 시간을 할애하다보니 이 포스트를 보자마자 우선 나중에 이를 처리해야 겠다는 생각이 퍼뜩 들었다. Facebook 로그인은 차후에 반드시 구현해야 하는 부분이나 우선은 다른 것들을 처리한 후에 진행하기로 결정했다.

# react-router-native vs react-navigation

  app에서 screen transition을 어떻게 구현할 것인지에 대해서는 개인의 기호가 중요한 것 같다. 나는 react-router로 routing을 시작해서 자연스럽게 react-router-native를 사용하게 됐는데 이번 기회에 react-navigation도 익혀놓을까 해서 이번 프로젝트에서는 react-navigation을 사용하기로 결정했다. 

  https://reactnavigation.org/docs/navigating.html

  아직 어느 패키지가 어떤 점에서 좋다는 수준의 판단은 내리지 못하겠으나 다만 이 부분은 react-router-native가 좀 더 유리한 점이 있다. react-navigation은 현재 URL에 따라 하나의 screen만 출력하는 것 같다. 아마 아니라면 앞으로 쓸 TIL이 쓸모없는 내용이 되겠지만 우선 그렇다는 가정하에 쓴다면 react-router-native의 경우 <Route> 안에서 path를 지정할 때, matching되는 route 모두를 rendering 할 것인지, 아니면 맨 처음 encouter하는 Route만 rendering할 것인지 임의로 선택 가능하다. 그런 기능이 react-navigation에 없는 것 같다. 시간이 좀 늦어서 doc을 아직 많이 못 읽어 봤는데 내일 계속 진행해봐야 겠다. 

  하지만 정말 Awesome한 경험을 했다. react-router-native의 경우 react-native의 BackHandler를 이용하여 goBack과 같은 작업을 임의로 실행해야 한다. 또한 Day2에서 언급했듯이 return true를 명시해주어야만 app을 종료하는 작업을 blocking할 수 있었다. But! react-navigation의 경우 android back button에 대해서 이러한 작업을 자동으로 hook해주어서 BackHandler에 event listener를 명시할 필요가 없었다. 이건 엄청 편리한 것이다. 적어도 react-router-native를 쓰던 나에게 있어서는 말이다. 
