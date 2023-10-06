import React from 'react';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import {NavigationContainer} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import Fontisto from 'react-native-vector-icons/Fontisto';
import Store from '../../Screens/Home';
import Wallet from '../../Screens/Wallet';
import BookingDetails from '../../Screens/BookingDetails';
import Profile from '../../Screens/Profile';
import Color from '../../Utils/Color';
import ViewDetails from '../../Screens/ViewDetails';
import Order from '../../Screens/Order';

const Tabs = AnimatedTabBarNavigator();

export default function BottomNavigation() {
  return (
    // <NavigationContainer>
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: Color.Green_Top,
        inactiveTintColor: '#222222',
        activeBackgroundColor: '#CBECE1',
      }}>
      <Tabs.Screen
        name="Home"
        component={Store}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="home"
              size={size ? size : 22}
              color={focused ? color : '#222222'}
              focused={focused}
              //color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Fontisto
              name="wallet"
              size={size ? size : 22}
              color={focused ? color : '#222222'}
              focused={focused}
              //color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Booking"
        component={Order}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="calendar-alt"
              size={size ? size : 22}
              color={focused ? color : '#222222'}
              focused={focused}
              //color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="user-alt"
              size={size ? size : 22}
              color={focused ? color : '#222222'}
              focused={focused}
              //color={color}
            />
          ),
        }}
      />
    </Tabs.Navigator>
    // </NavigationContainer>
  );
}
