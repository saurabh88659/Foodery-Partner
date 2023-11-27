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

const MainStack = () => {
  useEffect(() => {
    notificationListeners();
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    // AdminisAccepted();
    // getUserData();
  }, []);

  const getUserData = async () => {
    const res = await handleUserGetData();
    console.log(
      'res.data of getUserData at Mainstack ====>',
      JSON.stringify(res.data.result),
    );
    if (res.data.success) {
      if (res.data.result.status == 'pending') {
        console.log(
          'res.data.result.status at minstack====>',
          res.data.result.status,
        );
        dispatch(setAdminIsAccepted(true));
      }
      if (res.data.result) {
        dispatch(setUserData(res.data.result));
      }
    } else {
      console.log('getUserData error ==>', res);
    }
  };

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
      </Stack.Navigator>

      <AdminAcceptedModal />
    </>
  );
};

export default MainStack;
