import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import CustomButton from '../component/CustomButton/CustomButton';
import axios from 'axios';
import Color from '../Utils/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPInputView from '@twotalltotems/react-native-otp-input';
//import {Image} from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
const Baseurl = 'http://192.168.68.123:8000/api/vendor/verifyOTPVendorApp';
const Baseurl1 = 'http://192.168.68.123:8000/api/vendor/loginVendorApp';
import {requestUserPermission} from '../Utils/Firebasemessage';

function Otp({navigation, route}) {
  const [text, onChangeText] = React.useState('');
  const [password, setPassword] = React.useState('');
  const phoneNumber = route.params.phoneDetails;
  //const phone = phoneNumber;

  const [pin, setPin] = useState('');
  const [counter, setCounter] = React.useState(30);
  //console.log('heyyyyyyyyy', Verify);

  let splitNumberToArray = phoneNumber?.slice(-4);
  let f_number = parseFloat(splitNumberToArray?.toString().replace(/,/g, ''));

  const OtpVerification = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('hiiiiii', fcmToken);
    await AsyncStorage.setItem('phone', phoneNumber);
    const Verify = {
      mobileNumber: phoneNumber,
      otp: pin,
      deviceToken: fcmToken,
    };
    console.log('hiiiiiiii-------->', Verify);

    axios
      .post(Baseurl, Verify)
      .then(async resp => {
        console.log('---->data', resp.data);
        await AsyncStorage.setItem('token', resp.data.token);

        setPin(resp.data);

        const mob1 = await AsyncStorage.getItem('Phone');
        console.log('------------------>mob', mob1);

        navigation.navigate('Registration');
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        let newTime = ('0' + (counter - 1).toString()).slice(-2);
        setCounter(newTime);
      }, 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const number = {
    mobileNumber: phoneNumber,
  };
  //console.log('hiiiiiiii-------->' + number);
  const resend = async () => {
    console.log('hiiiiiiii-------->', number);

    axios
      .post(Baseurl, number)
      .then(async resp => {
        console.log('---->data', resp.data);

        setPhoneNo(resp.data);

        //navigation.navigate('Otp', {phoneDetails: phoneNo});
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <StatusBar backgroundColor={Color.Green_Top} />
        <View style={styles.loginbox}>
          <View style={styles.login}>
            <Text style={styles.texting3}>Enter OTP</Text>

            <Text style={styles.texting2}>
              We've send an OTP to your Mobile Number
            </Text>
            <Text style={styles.texting4}>+91 ******{f_number}</Text>

            <View
            // style={{backgroundColor: 'purple'}}
            >
              <OTPInputView
                style={{
                  width: responsiveWidth(80),
                  height: responsiveHeight(10),
                  //backgroundColor: 'blue',
                  alignSelf: 'center',
                }}
                pinCount={6}
                // placeholderTextColor="#000"
                //   autoFocusOnLoad={false}
                autoFocusOnLoad={false}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code => {
                  setPin(code);
                }}
              />
            </View>
            <View
              style={{
                //backgroundColor: 'teal',
                width: responsiveWidth(80),
                height: responsiveHeight(6),
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                //alignItems: 'center',
              }}>
              <Text style={styles.texting4}>Time remainig:-00:{counter}</Text>
              <TouchableOpacity onPress={counter == 0 ? resend : () => {}}>
                <Text
                  style={[
                    styles.texting4,
                    counter != 0
                      ? {color: Color.GRAY}
                      : {color: Color.LIGHT_BLUE},
                  ]}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
            </View>

            <CustomButton
              Title={'LOGIN'}
              onPress={() => OtpVerification()}
              style={styles.btnStyle}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    backgroundColor: Color.BG,
  },
  loginbox: {
    width: responsiveWidth(100),
    backgroundColor: Color.Green_Top,
    height: responsiveHeight(40),
    alignSelf: 'center',
  },
  login: {
    width: responsiveWidth(85),
    backgroundColor: Color.WHITE,
    height: responsiveHeight(55),
    alignSelf: 'center',
    marginTop: responsiveWidth(42),
    borderRadius: 10,
    elevation: 2,
  },
  btnStyle: {
    backgroundColor: Color.Green_Top,
    height: responsiveHeight(8),
    width: responsiveWidth(74),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(3),
    padding: 10,
    //borderWidth: 1,
    borderColor: 'Color.Green_Top',
    //marginTop: responsiveHeight(6),
  },
  texting: {
    fontSize: responsiveFontSize(1.5),
    textAlign: 'center',
    color: Color.Green_Top,
    textDecorationLine: 'underline',
  },
  texting1: {
    fontSize: responsiveFontSize(1.5),
    textAlign: 'center',
    //marginTop: 10,
    color: Color.BLACK,
  },
  texting2: {
    fontSize: responsiveFontSize(1.5),
    textAlign: 'center',
    marginTop: 10,
  },

  texting4: {
    fontSize: responsiveFontSize(1.5),
    textAlign: 'center',
    color: Color.Green_Top,
  },
  texting3: {
    fontSize: responsiveFontSize(3),
    textAlign: 'center',
    marginTop: responsiveHeight(10),
    fontWeight: 'bold',
    color: Color.BLACK,
    justifyContent: 'center',
  },
  input: {
    height: responsiveHeight(7),
    margin: 14,
    borderWidth: 0.8,
    borderRadius: 4,
    padding: 8,
  },
  underlineStyleBase: {
    width: responsiveWidth(12),
    height: responsiveHeight(8),
    //borderWidth: 0,
    borderWidth: 1,
    borderColor: Color.DARK_GRAY,
    backgroundColor: Color.WHITE,
    color: '#000',
  },

  underlineStyleHighLighted: {
    borderColor: Color.Green_Top,
    color: Color.BLACK,
  },
});

export default Otp;
