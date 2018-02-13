# Day1

  아직 모든 것을 완벽히 숙지하지 않은 상태에서 진행하는 프로젝트다. 익숙하지 않거나 중요한 이슈들을 기록하면서 기억해두려고 한다.

## Android virtual device via Android studio 

  react-native init 으로 프로젝트를 생성하면 android studio에서 바로 빌드해볼 수 있도록 디렉토리가 생성된다.

  첫째 날에 몇 가지 스크린을 조작해보고 있는데 다음과 같은 이슈가 있었다.

  기존에 CRNA로 생성한 프로젝트의 경우에는 TextInput으로 인해 나타난 Keyboard가 layout에 영향을 주지 않았는데

  react-native init으로 생성한 android 패키지의 경우에는 reponsive하게 layout이 변하는 것이 default setting이었다. 

  이러한 경우에 \android\app\src\main\AndroidManifest.xml으로 이동하여 다음과 같이 수정해준다.

  `android:windowSoftInputMode="adjustPan"` 

  기존에 설정되어 있던 adjustResize의 경우 android 자체적으로 Keyboard에 따라 view를 resize한다는 의미이고,

  adjustPan의 경우에는 CRNA와 같이 view를 변경하지 않겠다는 옵션이다.


## Incompatibility with react-native-vector-icons 

  react-native version이 0.52 이상일 경우 react-native-vector-icons를 사용하기 위해서 추가 작업이 필요했다.

  `rm ./node_modules/react-native/local-cli/core/__fixtures__/files/package.json`

  https://github.com/oblador/react-native-vector-icons/issues/626

  안전성이 있는지는 모르겠지만 우선 icon을 사용할 수 있게 된다.

