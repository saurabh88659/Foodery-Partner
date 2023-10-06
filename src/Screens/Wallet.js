import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Color from '../Utils/Color';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../component/Header';
export default function Wallet({navigation}) {
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor={'#29C17E'} />

      {/* -------------------------header--------------------------- */}
      <Header Title={'My Wallet'} onPress={() => navigation.goBack('')} />
      {/* ------------------------------body------------------------------ */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View
          style={{width: responsiveWidth(100), backgroundColor: Color.WHITE}}>
          <View
            style={{
              //backgroundColor: 'pink',
              //marginHorizontal: responsiveWidth(5),
              paddingVertical: responsiveHeight(2),
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: responsiveWidth(10),
            }}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2),
                  color: Color.BLACK,
                }}>
                Current Balance:
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 'bold',
                  fontSize: responsiveFontSize(2),
                  color: Color.BLACK,
                }}>
                ₹ 250
              </Text>
            </View>
          </View>
        </View>

        <Text
          style={{
            fontWeight: 'bold',
            fontSize: responsiveFontSize(2.2),
            padding: 10,
            marginLeft: responsiveWidth(7),
            color: Color.BLACK,
          }}>
          Order History
        </Text>

        <View
          style={{
            backgroundColor: Color.WHITE,
            marginHorizontal: responsiveWidth(1),
            // paddingVertical: responsiveHeight(5),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
            elevation: 2,
            //alignItems: 'center',
          }}>
          <View
            style={{
              width: responsiveWidth(50),
              //height: responsiveHeight(10),
              alignSelf: 'center',
              //backgroundColor: 'purple',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: responsiveFontSize(2.2),
                padding: 10,
                color: Color.BLACK,
                alignSelf: 'center',
              }}>
              Customer Name
            </Text>

            <View
              style={{
                backgroundColor: Color.Green_Top,
                height: responsiveHeight(5),
                width: responsiveWidth(35),
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2),
                  //padding: 10,
                  color: Color.WHITE,
                }}>
                Order Delivered
              </Text>
            </View>
            <Text
              style={{
                //fontWeight: 'bold',
                fontSize: responsiveFontSize(2.2),
                padding: 10,
                color: Color.BLACK,
                //alignItems: 'center',
                alignSelf: 'center',
              }}>
              08 Aug 2021, 15:30
            </Text>
          </View>
          <View
            style={{
              //   width: responsiveWidth(46),
              //   height: responsiveHeight(10),
              //backgroundColor: 'blue',
              alignItems: 'flex-end',
            }}>
            <ImageBackground
              source={require('../Assests/Images/MaskGroupside.png')}
              style={{
                width: responsiveWidth(46),
                height: responsiveWidth(22),
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: responsiveWidth(8),
                  width: responsiveWidth(8),
                  borderRadius: responsiveWidth(8),
                  alignSelf: 'center',
                  backgroundColor: Color.WHITE,
                  marginBottom: responsiveHeight(5),
                  marginLeft: responsiveWidth(10),
                }}>
                <Text
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    color: Color.Green_Top,
                    fontSize: responsiveFontSize(2.2),
                  }}>
                  ₹
                </Text>
              </View>
              <Text
                style={{
                  //fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.2),
                  padding: 10,
                  color: Color.WHITE,
                  marginBottom: responsiveHeight(5),
                  alignSelf: 'center',
                }}>
                250
              </Text>
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Color.BG,
  },
  contentContainer: {
    paddingVertical: 10,
  },
});
