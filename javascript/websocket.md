# React native with WebSocket

Using socket protocol means server and client can communicate bi-directional, so server also can send message whenever it should.

In node.js, 'ws' package provides WebSocket module implementing socket protocol with easy usage.

On server-side, I'll use express with WebSocket which is popular for setting up server. 
On client-side, I selected react-native as front-end so you can test this project on physical/virtual device. 

Before start, I prefer to use ES6 so I add babel configuration to my project. 
I followed [these steps](https://www.codementor.io/iykyvic/writing-your-nodejs-apps-using-es6-6dh0edw2o), super useful.

## Backend
In the backend directory, 

`npm install --save ws`

in index.js 
```javascript
import express from 'express';
import http from 'http';
import url from 'url';
import WebSocket from 'ws';

const server = http.createServer(express());
const wss = new WebSocket.Server({server, {pingTimeout: 30000}});

wss.on('connection', function(ws, req){
  console.log('connected!')
})

server.listen(3000, ()=>{
  console.log('Listening on %d', server.address().port);
})

```

## Frontend
Using create-react-native-app, you can get easily start your react native project. 
```
npm install -g create-react-native-app
create-react-native-app frontend
cd frontend
```

in App.js, you can set up web-socket client where you want. I add web-socket in the App component.

```javascript
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.socket = new WebSocket(YOUR_URL)
    
    this.socket.onopen = () => {
      console.log('connected!');
      this.setState({isConnected: true});
    }

    this.state = {
      isConnected: false,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>connection: {this.state.isConnected ? 'true' : 'false'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

**Note:** On Android, when you execute both server and client on the same host and use localhost as url in client, 
it seems that it doesn't work well because of some port forwarding issue. Simply I use AWS EC2 to seperate server and client.

Execute server and react-native project, then you can see 'connection: true' on the screen.


You can set actions for given event from opposite side. 

## React Native + Socket.io

You can also use socket.io to make socket protocol communication. There is nothing significant difference between websocket, 
but at client side, you should install socket.io-client, not socket.io(in my opinion). Also, if you get stuck when using localhost, 
consider to seperate server and client. These are the docs that I saw

https://socket.io/get-started/chat/
https://facebook.github.io/react-native/docs/network.html
https://hackernoon.com/a-simple-messaging-app-with-react-native-and-socket-io-e1cae3df7bda
