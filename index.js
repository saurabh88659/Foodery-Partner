/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notificationOndisplay from './src/notification/notificationOndisplay';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  notificationOndisplay.NotificationOnScreen(remoteMessage);
  console.log(
    '--------------------Message Handle in the background (running in back inde.js)!',
    remoteMessage,
  );
});

messaging().onMessage(async remoteMessage => {
  console.log('---------------On Message Forground.....', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
