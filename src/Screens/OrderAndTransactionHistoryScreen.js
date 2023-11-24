import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OrderHistory from './OrderHistory';
import TransactionHistory from './TransactionHistory';
import Header from '../component/Header';
import Color from '../Utils/Color';

const OrderAndTransactionHistoryScreen = ({navigation}) => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <>
      <Header Title={'My Wallet'} onPress={() => navigation.goBack('')} />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
          tabBarIndicatorStyle: {
            borderBottomColor: Color.DARK_GREEN,
            borderBottomWidth: 3,
          },
          tabBarStyle: {
            height: 55,
          },
        }}>
        <Tab.Screen name="Order History" component={OrderHistory} />
        <Tab.Screen name="Transaction History" component={TransactionHistory} />
      </Tab.Navigator>
    </>
  );
};

export default OrderAndTransactionHistoryScreen;

const styles = StyleSheet.create({});
