import React, {useRef, useState, useEffect} from 'react';
import {AppState} from 'react-native';
import MyStack from './src/navigation/MyStack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';
import {
  NotificationServices,
  requestUserPermission,
} from './src/utils/pushNotifications';
import {send} from './src/utils/sendNotifications';

const App = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  function onAuthStateChanged(user: any) {
    if (user) {
      const subscription = AppState.addEventListener('change', nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('online', nextAppState);
          firestore()
            .collection('users')
            .doc(auth().currentUser?.uid)
            .update({status: 'online'});
        } else if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'background'
        ) {
          console.log('background', nextAppState);
          // setTimeout(() => {
          firestore()
            .collection('users')
            .doc(auth().currentUser?.uid)
            .update({status: 'offline'});
          // }, 5000);
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
      });
      return () => {
        subscription.remove();
      };
    } else {
      return;
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    SplashScreen.hide();
    requestUserPermission();
    NotificationServices();
    send();
  }, []);

  return <MyStack />;
};

export default App;
