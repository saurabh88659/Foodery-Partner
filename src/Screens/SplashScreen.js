import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import Color from '../Utils/Color';
import axios from 'axios';
import {
  BASE_URL,
  getAuthHeaders,
  getOfflineData,
} from '../features/commonservice';
import {useDispatch, useSelector} from 'react-redux';
import {authcheckLogin, setLoggedIn} from '../features/auth/auth.reducer';
import {useNavigation} from '@react-navigation/native';
import {handleUserGetData} from '../features/APIs/apiRequest';
import {
  setAdminIsAccepted,
  setUserData,
  setVendorId,
} from '../features/requireDataReducer/requiredata.reducer';
import {CONSTANTS} from '../Utils/constants';
import LoginPhone from './LoginPhone';
import {TimeUnit} from '@notifee/react-native';
import AdminRejectedScreen from './AdminRejectedScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SplashScreen = () => {
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // useEffect(() => {
  //   dispatch(authcheckLogin()).then(res => {
  //     console.log('res.payload.loggedIn 1=====>>', res.payload?.loggedIn);
  //     console.log(
  //       'res.payload.loggedIn 2==>',
  //       JSON.stringify(res.payload?.currentUserData.status),
  //     );
  //     if (res.payload.loggedIn) {
  //       dispatch(setLoggedIn(true));
  //       // dispatch(setAdminIsAccepted(true));
  //     }else if(res.payload?.currentUserData.status=='complete'){

  //     }else if( res.payload?.currentUserData.status=="underReview"  ){

  //     } else if (res.payload?.currentUserData.status=="accpted" ){

  //     }
  //     else {
  //       dispatch(setLoggedIn(false));
  //       navigation.replace('LoginPhone');
  //     }
  //   });
  // }, []);

  const checkLogin = async () => {
    const token = await getOfflineData(CONSTANTS.TOKEN);
    const res = await handleUserGetData();
    console.log('splash token====>', token);
    // console.log(
    //   '++++status in spalsh screen ====>',
    //   JSON.stringify(res?.data?.result?.status),
    // );
    if (token) {
      console.log('splash token====>', token);
      console.log('res.data splash-====>', res.data);
      if (res.data) {
        dispatch(setUserData(res?.data?.result));
        dispatch(setVendorId(res?.data?.result._id));
        if (res.data.result.status == 'accepted') {
          dispatch(setLoggedIn(true));
        } else if (res.data.result.status == 'underReview') {
          dispatch(setLoggedIn(true));
          dispatch(setAdminIsAccepted(true));
        } else if (res.data.result.status == 'complete') {
          dispatch(setLoggedIn(false));
          navigation.replace('AllProductCategory');
        } else if (res.data.result.status == 'pending') {
          dispatch(setLoggedIn(false));
          navigation.replace('LoginPhone');
        } else if (res.data.result.status == 'rejected') {
          dispatch(setLoggedIn(false));
          navigation.replace('AdminRejectedScreen');
        } else {
          dispatch(setLoggedIn(false));
          navigation.replace('LoginPhone');
        }
      } else {
        if (res.response.status == 454) {
          console.log('bye');
          navigation.navigate('LoginPhone');
          dispatch(setLoggedIn(false));
        }
        if (res.response) {
          navigation.navigate('LoginPhone');
          dispatch(setLoggedIn(false));
          if (res.response.data.message == 'Your account is suspended') {
            console.log('res.response .data', res.response.data);
            navigation.replace('AdminSusPendScreen');
          }
          console.log('@@@resonse==>', res?.response.data);
        }
      }
    } else {
      // dispatch(setLoggedIn(true));
      dispatch(setLoggedIn(false));
      console.log('go to login page=====>>');
      navigation.replace('LoginPhone');
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  console.log('loggedIn:====>splash.js', loggedIn);

  return (
    <View
      style={{
        // backgroundColor: 'red',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <FontAwesome name={'opencart'} size={80} color={Color.Green_Top} />
        <Text
          style={{
            color: Color.Green_Top,
            fontSize: 14,
            // fontWeight: '500',
            marginTop: 30,
          }}>
          Grocery Vendor
        </Text>
      </View>

      {/* <ActivityIndicator color={Color.DARK_ORANGE} size={31} /> */}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
