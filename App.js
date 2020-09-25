// @refresh reset
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import * as firebase from 'firebase'
import 'firebase/firestore'
import AsyncStorage from '@react-native-community/async-storage'
import { GiftedChat } from 'react-native-gifted-chat'

var firebaseConfig = {
  apiKey: "AIzaSyAzwa9jPHSYKdaLFDK0zJKa5y1kkb3kuaw",
  authDomain: "ays-react-native-messanger.firebaseapp.com",
  databaseURL: "https://ays-react-native-messanger.firebaseio.com",
  projectId: "ays-react-native-messanger",
  storageBucket: "ays-react-native-messanger.appspot.com",
  messagingSenderId: "481340587603",
  appId: "1:481340587603:web:3d73946e7068d02482d0a6",
};

//will only initialize once
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.firestore()
const chat = database.collection('chat')

export default function App() {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [message, setMessage] = useState([])
  
  useEffect(() => {
    readUser()
    const signedOut = chat.onSnapshot((request) => {
      const allMessages = request
                            .docChanges()
                            .filter(({ type })=> type === 'added')
                            .map(({ doc }) => {
                              const message = doc.data()
                              return { ...message, createdAt: message.createdAt.toDate()}
                            })
                            .sort((a, b) => b.createdAt.getItem() - a.createdAt.getItem())
      setMessage(allMessages)
    })
  }, [])

  async function readUser() {
    const user = await AsyncStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }

  async function handleSubmit() {
    const _id = Math.random().toString(36).substring(7)
    const user = { _id, name }
    await AsyncStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.input}
          placeholder={'User name'}
          value={name}
          onChangeText={setName}
        />
        <Button 
          onPress={handleSubmit}
          title={'Enter'}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>User</Text>
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
    padding: 20
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 25,
    padding: 10
  }
});
