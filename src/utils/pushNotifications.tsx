import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);

    getFcmToken();
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('Old fcm Token', fcmToken);
  if (!fcmToken) {
    try {
      const newfcmToken: any = await messaging().getToken();
      if (newfcmToken) {
        console.log('new fcm Token', newfcmToken);
        await AsyncStorage.setItem('fcmToken', newfcmToken);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const NotificationServices = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Foreground Message Handling
  messaging().onMessage(async remoteMessage => {
    console.log('notification in forground', JSON.stringify(remoteMessage));
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';

// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     getFcmToken();
//   }
// }

// const getFcmToken = async () => {
//   let fcmToken = await AsyncStorage.getItem('fcmToken');
//   console.log('Old fcm Token', fcmToken);
//   if (!fcmToken) {
//     try {
//       await messaging().registerDeviceForRemoteMessages();
//       const newfcmToken: any = await messaging().getToken();
//       if (newfcmToken) {
//         console.log('new fcm Token', newfcmToken);
//         await AsyncStorage.setItem('fcmToken', newfcmToken);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };
