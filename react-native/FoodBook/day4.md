# Day4 && Day5

  Day4에는 주로 react-native component를 이용해서 레이아웃을 설정하는 작업을 했고, 잠시 막혔던 부분이 Parse server에 file을 upload하는 것이다. Parse.File을 사용하여 최대 10MB의 파일을 업로드할 수 있고 base64로 encoding된 자료만 업로드 할 수 있다. 처음에는 단편적으로 프로젝트 내 임의의 file을 encoding -> upload하는 작업을 해보려고 했으나 이것이 쉽지가 않았다. 정확히 설명하기엔 이유가 너무 구구절절해서 생략하겠다. 그래서 내가 이것을 왜 하려고 하는지 다시 생각해봤다. 그랬더니 이것보다 우선해야 되는 작업이 있었다. 우선 device의 gallery에 access하거나 camera를 제어하는 기능이 우선되어야 했다. 그래서 시작한 것이 react-native-camera이다.

## react-native-camera

  https://github.com/react-native-community/react-native-camera

  해당 프로젝트의 guide를 따라 설치하되, Q&A의 가장 하단에 있는 section을 참고하였다.

  그리고 virtual device로 camera component를 rendering하면 검은 화면만 나오는데 physical camera가 없기 때문이다. 

  그래서 physical device에서 로드하는데 구체적인 이유는 모르겠지만 다음과 같은 error가 뜬다.

  unable to load script from assets 'index.android.bundle'...

  이곳에서 해결했다.

  https://stackoverflow.com/questions/44446523/unable-to-load-script-from-assets-index-android-bundle-on-windows

  매번 새로 빌드하는 방식인데 속도가 느리고 live reloading이 안 된다. dev-mode를 꺼놔서 그런가 추측은 하고 있지만 지금 당장 필요하진 않으니 카메라가 정상 작동하는지 확인만 하고 나머지는 virtual device에서 작업할 예정이다. 

  오늘 부산을 가야 해서 많이는 못할 것 같다...