import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../component/Header';
import Color from '../Utils/Color';

//import ImagePicker from 'react-native-image-crop-picker';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const {height, width} = Dimensions.get('window');

function Order({navigation}) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: Color.BG,
        height: responsiveHeight(100),
      }}>
      <StatusBar backgroundColor={Color.Green_Top} barStyle={Color.WHITE} />

      <View
        style={{
          height: responsiveHeight(30),
          width: responsiveWidth(100),
          //backgroundColor: 'pink',
        }}>
        <ImageBackground
          source={require('../Assests/Images/Mask.png')}
          style={{
            height: responsiveWidth(50),
            width: responsiveWidth(100),
          }}>
          <View
            style={{
              //backgroundColor: 'pink',
              alignSelf: 'center',
              marginTop: responsiveHeight(10),
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.5),
                fontWeight: 'bold',
                padding: 2,
                color: Color.WHITE,
              }}>
              Prakash Singh
            </Text>
            <Text
              style={{
                fontSize: responsiveFontSize(2.2),
                fontWeight: 'bold',

                color: Color.WHITE,
                alignSelf: 'center',
              }}>
              My Order
            </Text>
          </View>
        </ImageBackground>
      </View>
      {/* ...........................My Order............................... */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: Color.WHITE,
            marginHorizontal: responsiveWidth(2),

            borderRadius: 10,
            elevation: 2,
            marginTop: 10,
          }}>
          <View
            style={{
              paddingVertical: responsiveHeight(0.5),
              marginLeft: responsiveWidth(3),
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: responsiveFontSize(2),
                color: Color.Green_Top,
              }}>
              PRAKASH SINGH
            </Text>
          </View>
          <View
            style={{
              //backgroundColor: 'skyblue',

              paddingVertical: responsiveHeight(1),
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <View
                style={{
                  //backgroundColor: 'pink',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: responsiveWidth(3),
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: Color.BLACK,
                    fontSize: responsiveFontSize(2),
                  }}>
                  Order ID:
                </Text>
                <Text style={{fontSize: responsiveFontSize(2)}}>
                  Prakash Singh
                </Text>
              </View>
              <View
                style={{
                  //backgroundColor: 'pink',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: responsiveWidth(3),
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: Color.BLACK,
                    fontSize: responsiveFontSize(2),
                  }}>
                  Products:
                </Text>
                <Text style={{fontSize: responsiveFontSize(2)}}>
                  Bread ,milk,meggie
                </Text>
              </View>
              <View
                style={{
                  // backgroundColor: 'pink',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: responsiveWidth(3),
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: Color.BLACK,
                    fontSize: responsiveFontSize(2),
                  }}>
                  Address:
                </Text>
                <Text style={{fontSize: responsiveFontSize(2)}}>
                  Y-6 sector 62 Noida
                </Text>
              </View>
            </View>

            <View
              style={{
                //backgroundColor: 'blue',

                width: responsiveWidth(35),
                height: responsiveHeight(10),
                alignItems: 'center',
                justifyContent: 'center',
                // borderRadius: 4,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ViewDetails')}
                style={{
                  backgroundColor: Color.Green_Top,

                  width: responsiveWidth(28),
                  height: responsiveHeight(5),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: Color.WHITE,
                    fontSize: responsiveFontSize(1.8),
                  }}>
                  View Details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  TextDetails: {
    fontSize: responsiveFontSize(1.8),
    textAlign: 'center',
    fontWeight: 'bold',
    color: Color.BLACK,
    //width: 40,
  },
  contentContainer: {
    paddingVertical: 30,
  },
  TextDetails1: {
    fontSize: responsiveFontSize(1.5),
    textAlign: 'center',
    fontWeight: 'normal',
    color: Color.Green_Top,
    textAlignVertical: 'center',

    //width: 40,
  },
  ItemText: {
    fontSize: responsiveFontSize(1.5),
    alignSelf: 'center',

    textAlign: 'center',

    color: 'black',
  },
  ItemText1: {
    fontSize: 12,
    alignSelf: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    //width: 100,
    color: 'black',
  },

  underlineStyleBase: {
    width: width / 9,
    height: 60,
    backgroundColor: Color.WHITE,
    color: Color.BLACK,
    fontSize: width / 20,
    fontWeight: '600',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
    margin: 5,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: Color.lightYellow,
    padding: 35,
    alignItems: 'center',
    borderWidth: 1,

    // shadowColor: Color.YELLOW,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 35,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
});

export default Order;
