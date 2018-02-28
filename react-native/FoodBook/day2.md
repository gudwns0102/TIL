# Day2

  일전의 default setting에서 resize mode가 설정되어 있는 것과 같이 android package와 react native를 어떻게 잘 조합하여 사용할지와 관련된 이슈가 늘 새롭게 다가온다. CRNA로 작업할 때는 이런 것을 고려할 필요가 없어서 편리했지만 native한 작업을 수행할 수 없었다면 react-native init은 할 수 있는 것들은 더 많아지지만 그만큼 손봐주어야 할 곳이 많이 생긴 느낌이다. 

## How to disable the default action like exiting app of Android back button using BackHandler

  app을 navigating하기 위한 방법은 여러가지 있지만 필자가 사용하는 모듈은 'react-router-native'다. history를 이용하여 URL을 조작할 수 있는데 이 때 주로 android의 back button을 통해 이전 화면으로 돌아가는 작업을 구현한다. CRNA에서는 별 문제가 없었지만 react-native init으로 만든 프로젝트에서는 원치 않게 app이 종료되는 현상이 나타났다. 이를 해결하기 위해서 다음을 참조했다. 

  https://stackoverflow.com/questions/40145301/preventing-hardware-back-button-android-for-react-native

  BackHandler에서 back button 이벤트가 발생했을 때, return 값을 true로 주면 앱이 종료되지 않는다.


## react-native-fbsdk Enabling

  Facebook 로그인 기능을 구현하기 위해서 react-native-fbsdk를 사용해주어야 하는데 애로사항이 많았다. 

  진행과정을 기록한다.

  1. Follow these steps

  https://developers.facebook.com/docs/react-native/getting-started

  not `react-native install react-native-fbsdk`, 
  `npm install --save react-native-fbsdk`

  2. Change android/build.gradle like this
  
  if you see error like 'Could not find com.android.support:appcompat-v7:27.0.2.',
  follow it 
  
  ```
  repositories {
        mavenLocal()
        mavenCentral()
        maven {                                  // <-- Add this
            url 'https://maven.google.com/' 
            name 'Google'
        }
    } 
  ```

3. Change sdk version and build tools version in android/app/build.gradle like this

```
compileSdkVersion 26
buildToolsVersion "27.0.2"
```
