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
import axios from 'axios';
import CustomButton from '../component/CustomButton/CustomButton';
import Color from '../Utils/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {Image} from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
const Baseurl = 'http://192.168.68.123:8000/api/vendor/loginVendorApp';
function LoginPhone({navigation}) {
  const [text, onChangeText] = React.useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [ErrorMobNumber, setErrorMobNumber] = useState(null);

  const number = {
    mobileNumber: phoneNo,
  };
  //console.log('hiiiiiiii-------->' + number);
  const loginUser = async () => {
    console.log('hiiiiiiii-------->', number);

    axios
      .post(Baseurl, number)
      .then(async resp => {
        console.log('---->data', resp.data);

        setPhoneNo(resp.data);

        navigation.navigate('Otp', {phoneDetails: phoneNo});
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTokene();
  }, []);
  const getTokene = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('fcmToken-----', fcmToken);
  };

  const validate_mobNumber = mob_number => {
    console.log('mob_number=====', mob_number);
    var mobileNoRegex = /^[6-9]{1}[0-9]{9}$/;
    if (mob_number == '' || mob_number == 'undefined' || mob_number == null) {
      setErrorMobNumber('Please Enter a vaild Mobile Number');
    } else if (!mobileNoRegex.test(mob_number)) {
      setErrorMobNumber('Please Enter a Valid Mobile Number');
    } else {
      setErrorMobNumber(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <StatusBar backgroundColor={Color.Green_Top} />
        <View style={styles.loginbox}>
          <View style={styles.login}>
            <Text style={styles.texting3}>Login With Mobile Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              keyboardType="number-pad"
              maxLength={10}
              value={phoneNo}
              onChangeText={text => {
                setPhoneNo(text.replace(/[- ()+=#*;,.<>\{\}\[\]\\\/]/gi, ''));
                // validate_mobNumber(text);
              }}
            />
            {ErrorMobNumber != null ? <Text>{ErrorMobNumber}</Text> : null}

            <CustomButton
              Title={'LOGIN'}
              onPress={() => loginUser()}
              style={styles.btnStyle}
            />
            <Text style={styles.texting2}>Or Login with</Text>

            <View
              style={{
                //backgroundColor: 'pink',
                height: responsiveHeight(8),
                width: responsiveWidth(60),
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: responsiveHeight(2),
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: Color.WHITE,
                  width: responsiveWidth(14),
                  height: responsiveHeight(7),
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 2,
                }}>
                <Image
                  source={require('../Assests/Images/Google.png')}
                  style={{
                    height: responsiveWidth(8),
                    width: responsiveWidth(8),
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: Color.WHITE,
                  width: responsiveWidth(14),
                  height: responsiveHeight(7),
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 2,
                }}>
                <Image
                  source={require('../Assests/Images/fb.png')}
                  style={{
                    width: responsiveWidth(4),
                    height: responsiveWidth(8),
                    //backgroundColor: 'green',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                //backgroundColor: 'pink',
                height: responsiveHeight(3),
                width: responsiveWidth(70),
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: responsiveHeight(2),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.texting1}>Don't have an account?</Text>
              <TouchableOpacity>
                <Text style={styles.texting}>Register Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            //backgroundColor: 'pink',
            height: responsiveHeight(3),
            //width: responsiveWidth(70),
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: responsiveHeight(48),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.texting1}>
            By signing up ,you are agree with our
          </Text>
          <TouchableOpacity>
            <Text style={styles.texting}> Terms & Conditions</Text>
          </TouchableOpacity>
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
    height: responsiveHeight(48),
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
    marginTop: 15,
  },
  texting3: {
    fontSize: responsiveFontSize(2),
    textAlign: 'left',
    marginTop: 16,
    fontWeight: 'bold',
    color: Color.BLACK,
    marginLeft: responsiveWidth(4.1),
  },
  input: {
    height: responsiveHeight(7),
    margin: 14,
    borderWidth: 0.8,
    borderRadius: 4,
    padding: 8,
  },
});

export default LoginPhone;
