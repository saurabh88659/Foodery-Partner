import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoginPhone from '../Screens/LoginPhone';
import Otp from '../Screens/Otp';
import {headerNone} from '../Utils/Config';
import Registration from '../Screens/Registration';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../Screens/SplashScreen';
import AllProductCategory from '../Screens/AllProductCategory';
import AdminRejectedScreen from '../Screens/AdminRejectedScreen';
import AllProductSubCategory from '../Screens/AllProductSubCategory';
import AllProductsItem from '../Screens/AllProductsItem';
import SelectedTempProductsScreen from '../Screens/SelectedTempProductsScreen';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={headerNone}
      />
      <Stack.Screen
        name="LoginPhone"
        component={LoginPhone}
        options={headerNone}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={headerNone}
      />
      <Stack.Screen
        name="AllProductCategory"
        component={AllProductCategory}
        options={headerNone}
      />
      <Stack.Screen
        name="SelectedTempProductsScreen"
        component={SelectedTempProductsScreen}
        options={headerNone}
      />

      <Stack.Screen
        name="AdminRejectedScreen"
        component={AdminRejectedScreen}
        options={headerNone}
      />
      <Stack.Screen
        name="AllProductSubCategory"
        component={AllProductSubCategory}
        options={headerNone}
      />
      <Stack.Screen
        name="AllProductsItem"
        component={AllProductsItem}
        options={headerNone}
      />

      <Stack.Screen name="Otp" component={Otp} options={headerNone} />
    </Stack.Navigator>
  );
};

export default AuthStack;
