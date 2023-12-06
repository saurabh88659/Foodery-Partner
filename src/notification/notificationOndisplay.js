import notifee, {AndroidImportance, AndroidStyle} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

const NotificationOnScreen = async remoteMessage => {
  const channelId = await notifee.createChannel({
    id: 'default 4',
    name: 'Default Channel 4',
    importance: AndroidImportance.HIGH,
  });
  // Display a notification
  await notifee.displayNotification({
    title: remoteMessage.data.title,
    body: remoteMessage.data.body,
    android: {
      channelId,
    },
  });
  console.log('run completed');
};

const getDeviceToken = async () => {
  console.log('hello');
  const token = await messaging().getToken();
  // await setOfflineData(CONSTANTS.MOBILE_TOKEN, token);
  console.log('========Device Token=======', token);
  return token;
};

export async function notificationListeners() {
  //on display====
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!=============>', remoteMessage);
    NotificationOnScreen(remoteMessage);
  });

  //=======on backgraoung=========
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    NotificationOnScreen(remoteMessage);
    console.log(
      '--------------------Message Handle in the background  on notifications feature===>>!',
      remoteMessage,
    );
  });

  //onkillmode=========
  // messaging().onNotificationOpenedApp(remoteMessage => {
  //   console.log(
  //     'Notification caused app to open from background state:',
  //     remoteMessage,
  //   );
  // });
  return unsubscribe;
}

export default NotificationOndisplay = {
  getDeviceToken,
  NotificationOnScreen,
};
