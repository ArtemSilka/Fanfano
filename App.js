// @refresh reset
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyAzwa9jPHSYKdaLFDK0zJKa5y1kkb3kuaw",
  authDomain: "ays-react-native-messanger.firebaseapp.com",
  databaseURL: "https://ays-react-native-messanger.firebaseio.com",
  projectId: "ays-react-native-messanger",
  storageBucket: "ays-react-native-messanger.appspot.com",
  messagingSenderId: "481340587603",
  appId: "1:481340587603:web:3d73946e7068d02482d0a6",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
