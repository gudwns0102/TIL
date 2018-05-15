# Provider

오랜만에 TIL을 쓴다. 사실 여태껏 했던 것들은 공부라기 보다는 노동에 가까운 것들을 해와서 기록할 것이 적었다. 오늘 TIL을 쓰게 된 이유는 android OS에 대해서 기록 겸 알게 된 사실이 있어서이다. 

android는 app만이 access할 수 있는 local storage가 있는데 경우에 따라서 app 간에 파일을 공유해야 하는 일이 생긴다. 예를 들어서 나의 app과 facebook sdk app이 게시물을 작성하기 위해서 사진 파일을 공유해야 한다면 sharing에 대한 issue를 고려해보아야 한다. 

Provider는 각 app의 local storage를 외부에서 access할 수 있는 통로? channel? tunnel? 아무튼 그런 걸 만들어 주는 역할을 한다.
(이런 것들을 보면 mobile app 작성시 react native만을 봐선 안되고 android OS에 대한 전반적인 지식도 반드시 필요하다는 인식이 생긴다... iOS는 언제하지) 

오늘 생긴 issue는 react-native-fbsdk로 사진을 공유할 때, photo url로 remote url을 주는 방식을 원천적으로 지원을 하지 않기 때문에 local에 저장한 뒤 공유해야 하는데 이 과정에서 fbsdk가 내가 작성하는 app의 local storage에 접근할 수 없기 때문에 provider를 이용해서 통로를 뚫어주어야 했기 때문에 발생했다. 

그저 provider를 작성하는 것이면 별로 문제가 없었지만 내가 사용중인 package인 react-native-image-picker에서 이미 provider를 정의한 경우에 문제가 발생했다. 아직 완벽히 인지를 하지는 않았지만 package 간에 provider를 중복 선언하게 되면 error가 발생하게 되는 듯 하다. 글을 작성하면서 번뜩 든 생각인데, provider의 name을 똑같이 줘서 error가 발생한 것 같다. 추후에 test를 해볼 가치가 있는 것 같다. 

아무튼 그래서 react-native-image-picker의 android directory를 파보니 provider를 정의하면서 external storage를 외부에서 접근할 수 있도록 뚫어놓은 것을 확인할 수 있었다..

그래서 이 react-native-image-picker가 제공해주는 provider를 써서 문제를 해결했는데 이러면 종속성이 발생한다. 예를 들어 react-native-image-picker를 더 이상 사용하지 않게 되는 경우, 나는 이 부분까지 손을 봐주어야 한다는 것이다. 그래서 이런 workaround 방식은 적절하지 않고 지금 바로 provider를 추가 생성하는 방안을 찾아볼 생각이다.