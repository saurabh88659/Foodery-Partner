import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../Screens/Login';
import {headerNone} from '../../Utils/Config';
import ViewList from '../../Screens/ViewList';
import ViewDetails from '../../Screens/ViewDetails';
import Search from '../../Screens/Search';
import Profile from '../../Screens/Profile';
import EditProfile from '../../Screens/EditProfile';
import Order from '../../Screens/Order';
import About from '../../Screens/About';
import Terms from '../../Screens/Terms';
import Privacy from '../../Screens/Privacy';
import Wallet from '../../Screens/Wallet';
import Notification from '../../Screens/Notification';
import LoginPhone from '../../Screens/LoginPhone';
import Otp from '../../Screens/Otp';
import BottomNavigation from './BottomNavigation';
import Home from '../../Screens/Home';
import Registration from '../../Screens/Registration';

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator
    // screenOptions={{
    //     headerShown:false
    // }}
    >
      <Stack.Screen
        name="LoginPhone"
        component={LoginPhone}
        options={headerNone}
      />

      <Stack.Screen name="Otp" component={Otp} options={headerNone} />
      <Stack.Screen name="Login" component={Login} options={headerNone} />

      <Stack.Screen
        name="BottomNavigation"
        component={BottomNavigation}
        options={headerNone}
      />
      <Stack.Screen name="Home" component={Home} options={headerNone} />
      <Stack.Screen name="ViewList" component={ViewList} options={headerNone} />
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
        name="Notification"
        component={Notification}
        options={headerNone}
      />

      <Stack.Screen
        name="Registration"
        component={Registration}
        options={headerNone}
      />
    </Stack.Navigator>
  );
}
