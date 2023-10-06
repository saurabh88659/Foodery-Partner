import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
//import CustomButton from './src/component/CustomButton/CustomButton';
import Header from '../component/Header';
import Lottie from 'lottie-react-native';
import Color from '../Utils/Color';

function BookingDetails() {
  const [text, onChangeText] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#CBECE1'} />
      <Header Title={'BOOKING DETAILS'} style={styles.headerStyle} />
      <View>
        <View
          style={{
            backgroundColor: 'pink',
            width: responsiveWidth(95),
            height: responsiveHeight(25),
            alignSelf: 'center',
            marginTop: 10,
          }}></View>
      </View>
      <View
        style={{
          //backgroundColor: 'blue',
          width: responsiveWidth(95),
          height: responsiveHeight(30),
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Lottie
          source={require('../Assests/Lottie/98485-tracking-delivery (1).json')}
          autoPlay
          loop
          style={{height: responsiveHeight(42)}}
        />
      </View>
      <Text
        style={{
          alignSelf: 'center',
          marginTop: 2,
          fontSize: responsiveFontSize(2.5),
          color: '#000',
          fontWeight: 'bold',
        }}>
        Delivery Partner on the way
      </Text>

      <View
        style={{
          width: responsiveWidth(95),
          paddingVertical: responsiveHeight(2),
          backgroundColor: '#CBECE1',
          alignSelf: 'center',
          borderRadius: 10,
          marginTop: 5,
        }}>
        <Text
          style={{
            alignSelf: 'flex-start',
            marginTop: 2,
            fontSize: responsiveFontSize(2),
            color: '#000',
            fontWeight: 'bold',
            marginLeft: 10,
          }}>
          Delivary Partner Details:
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              width: responsiveWidth(65),
              paddingVertical: 5,
              marginVertical: 4,
            }}>
            <Text
              style={{
                alignSelf: 'flex-start',

                fontSize: responsiveFontSize(2),
                color: '#000',

                marginLeft: 10,
              }}>
              Name: {'   '}Jogesh Patel
            </Text>
            <Text
              style={{
                alignSelf: 'flex-start',

                fontSize: responsiveFontSize(2),
                color: '#000',

                marginLeft: 10,
              }}>
              Contact Him: {'   '}+91 9876543210
            </Text>
            <Text
              style={{
                alignSelf: 'flex-start',

                fontSize: responsiveFontSize(2),
                color: '#000',

                marginLeft: 10,
              }}>
              OrderId: {'   '} YRW32123444
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#f4d7fa',
              height: responsiveWidth(24),
              width: responsiveWidth(24),
              alignSelf: 'center',
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: responsiveWidth(24),
            }}>
            <Image
              source={require('../Assests/Images/food-delivery.png')}
              style={{
                height: responsiveWidth(17),
                width: responsiveWidth(17),
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    //backgroundColor: 'green',
  },
  loginbox: {
    width: responsiveWidth(100),
    backgroundColor: '#fff',
    paddingVertical: responsiveHeight(2),
    alignSelf: 'center',
    //marginTop: responsiveHeight(2),
    flexDirection: 'row',
    elevation: 2,
  },
  img: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    backgroundColor: 'pink',
    borderRadius: responsiveWidth(15),
    marginLeft: responsiveWidth(1.5),
  },
  btnStyle: {
    backgroundColor: 'purple',
    height: responsiveHeight(8),
    width: responsiveWidth(100),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texting: {
    fontSize: responsiveFontSize(2.5),
    alignSelf: 'center',
  },
  texting1: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  texting2: {
    fontSize: responsiveFontSize(2),
    paddingLeft: responsiveWidth(3),
  },
  store: {
    //backgroundColor: 'teal',
    padding: 5,
    marginLeft: responsiveWidth(2),
  },
});

export default BookingDetails;
