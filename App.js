import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './src/Navigation/StackNavigation/AuthNavigation';
import BottomNavigation from './src/Navigation/StackNavigation/BottomNavigation';
import AuthStack from './src/Navigation/AuthStack';
import MainStack from './src/Navigation/MainStack';
import {store} from './src/app/store';
import {authcheckLogin} from './src/features/auth/auth.reducer';
import {Provider, useDispatch, useSelector} from 'react-redux';
import Registration from './src/Screens/Registration';
import SplashScreen from './src/Screens/SplashScreen';
import {LoginWithPhone} from './src/features/APIs/apiRequest';
import LoginPhone from './src/Screens/LoginPhone';
import Otp from './src/Screens/Otp';
import messaging from '@react-native-firebase/messaging';
import AllProductCategory from './src/Screens/AllProductCategory';

const App = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.auth.loggedIn);
  console.log('loggedIn:====>app.js', loggedIn);

  useEffect(() => {
    getDeviceToken();
  }, []);

  const getDeviceToken = async () => {
    const token = await messaging().getToken();
    console.log('========Device FCM -----Token=======', token);
    return token;
  };

  return (
    <NavigationContainer>
      {loggedIn ? <MainStack /> : <AuthStack />}
      {/* <AllProductCategory /> */}
    </NavigationContainer>
  );
};

const AppWarpper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default AppWarpper;
