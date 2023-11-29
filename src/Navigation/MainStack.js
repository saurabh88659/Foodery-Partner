import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigation from './StackNavigation/BottomNavigation';
import Search from '../Screens/Search';
import Profile from '../Screens/Profile';
import About from '../Screens/About';
import Order from '../Screens/Order';
import Terms from '../Screens/Terms';
import Privacy from '../Screens/Privacy';
import Wallet from '../Screens/Wallet';
import Notification from '../Screens/Notification';
import {headerNone} from '../Utils/Config';
import Home from '../Screens/Home';
import ViewDetails from '../Screens/ViewDetails';
import EditProfile from '../Screens/EditProfile';
import ViewList from '../Screens/ViewList';
import AdminAcceptedModal from '../Screens/AdminAcceptedModal';
import {
  setAdminIsAccepted,
  setUserData,
} from '../features/requireDataReducer/requiredata.reducer';
import {
  handleAdminIsAccepted,
  handleUserGetData,
} from '../features/APIs/apiRequest';
import {useDispatch} from 'react-redux';
import {CONSTANTS} from '../Utils/constants';
import {setOfflineData} from '../features/commonservice';
import AllOutofStockProductScreen from '../Screens/AllOutofStockProductScreen';
import {notificationListeners} from '../notification/notificationOndisplay';
import AllProductCategory from '../Screens/AllProductCategory';
import AllProductSubCategory from '../Screens/AllProductSubCategory';
import AllProductsItem from '../Screens/AllProductsItem';
import AllMainProductSubcategory from '../Screens/AllMainProductSubcategory';
import OrderAndTransactionHistoryScreen from '../Screens/OrderAndTransactionHistoryScreen';
import ViewTransactionDetailsScreen from '../Screens/ViewTransactionDetailsScreen';
import SelectedTempProductsScreen from '../Screens/SelectedTempProductsScreen';
import MyOrderHistory from '../Screens/MyOrderHistory';
import TransactionDetailsAccountReceiveScreen from '../Screens/TransactionDetailsAccountReceiveScreen';
import TransactionDetailsWalletReceiveScreen from '../Screens/TransactionDetailsWalletReceiveScreen';
import {PermissionsAndroid, Platform} from 'react-native'; // Add this line
import SplashScreen from '../Screens/SplashScreen';

const MainStack = () => {
  useEffect(() => {
    notificationListeners();
    requestUserPermission();
  }, []);

  const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
      //Request iOS permission
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } else if (Platform.OS === 'android') {
      //Request Android permission (For API level 33+, for 32 or below is not required)
      const res = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      console.log('@@@@@res of notification prermissons====>>', res);
    }
  };

  // const requestUserPermission = async () => {
  //   console.log(
  //     '++++++++++++test000 denied the notification permission and selected "Never ask again"',
  //   );
  //   if (Platform.OS === 'android') {
  //     console.log(
  //       '++++++++++++test11111111 denied the notification permission and selected "Never ask again"',
  //     );
  //     const res = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.RECEIVE_BOOT_COMPLETED,
  //     );
  //     console.log('Notification permission result:', res);
  //     if (res === PermissionsAndroid.RESULTS.DENIED) {
  //       console.log(
  //         '++++++++++++test22222222 denied the notification permission and selected "Never ask again"',
  //       );
  //       console.log('User denied the notification permission');
  //     } else if (res === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
  //       console.log(
  //         '++++++++++++User denied the notification permission and selected "Never ask again"',
  //       );
  //     }
  //   }
  // };

  useEffect(() => {}, []);

  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
          options={headerNone}
        />
        {/* <Stack.Screen name="Home" component={Home} options={headerNone} /> */}
        <Stack.Screen
          name="ViewList"
          component={ViewList}
          options={headerNone}
        />

        <Stack.Screen
          name="ViewDetails"
          component={ViewDetails}
          options={headerNone}
        />

        <Stack.Screen name="Search" component={Search} options={headerNone} />
        <Stack.Screen name="Profile" component={Profile} options={headerNone} />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={headerNone}
        />
        <Stack.Screen name="About" component={About} options={headerNone} />
        <Stack.Screen name="Order" component={Order} options={headerNone} />
        <Stack.Screen name="Terms" component={Terms} options={headerNone} />
        <Stack.Screen name="Privacy" component={Privacy} options={headerNone} />
        <Stack.Screen name="Wallet" component={Wallet} options={headerNone} />
        <Stack.Screen
          name="TransactionDetailsAccountReceiveScreen"
          component={TransactionDetailsAccountReceiveScreen}
          options={headerNone}
        />
        <Stack.Screen
          name="TransactionDetailsWalletReceiveScreen"
          component={TransactionDetailsWalletReceiveScreen}
          options={headerNone}
        />

        <Stack.Screen
          name="AllOutofStockProductScreen"
          component={AllOutofStockProductScreen}
          options={headerNone}
        />
        <Stack.Screen
          name="AllMainProductSubcategory"
          component={AllMainProductSubcategory}
          options={headerNone}
        />
        <Stack.Screen
          name="ViewTransactionDetailsScreen"
          component={ViewTransactionDetailsScreen}
          options={headerNone}
        />

        <Stack.Screen
          name="Notification"
          component={Notification}
          options={headerNone}
        />
        <Stack.Screen
          name="OrderAndTransactionHistoryScreen"
          component={OrderAndTransactionHistoryScreen}
          options={headerNone}
        />

        <Stack.Screen
          name="AllProductSubCategory"
          component={AllProductSubCategory}
          options={headerNone}
        />

        <Stack.Screen
          name="AllProductCategory"
          component={AllProductCategory}
          options={headerNone}
        />

        <Stack.Screen
          name="AllProductsItem"
          component={AllProductsItem}
          options={headerNone}
        />
        <Stack.Screen
          name="SelectedTempProductsScreen"
          component={SelectedTempProductsScreen}
          options={headerNone}
        />
        <Stack.Screen
          name="MyOrderHistory"
          component={MyOrderHistory}
          options={headerNone}
        />
        {/* <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={headerNone}
        /> */}
      </Stack.Navigator>

      <AdminAcceptedModal />
    </>
  );
};

export default MainStack;
