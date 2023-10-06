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
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../component/Header';
export default function Notification({navigation}) {
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor={Color.Green_Top} />

      {/* -------------------------header--------------------------- */}
      <Header Title={'Notification'} onPress={() => navigation.goBack('')} />
      {/* ------------------------------body------------------------------ */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {/* -----------------------------card--------------------------- */}
        <View
          style={{
            marginHorizontal: responsiveWidth(2),
            backgroundColor: Color.WHITE,
            borderRadius: 15,
            paddingVertical: responsiveHeight(1),
            elevation: 1.5,
          }}>
          <View
            style={{
              paddingVertical: responsiveHeight(0.5),
              marginHorizontal: responsiveWidth(1),
              //   height: responsiveHeight(2),
              //   width: responsiveWidth(90),

              justifyContent: 'flex-end',
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 20,
            }}>
            <Image
              source={require('../Assests/Images/path.png')}
              style={{
                height: responsiveWidth(3.2),
                width: responsiveWidth(3.2),
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
            />
            <Text
              style={{
                fontSize: responsiveFontSize(1.5),
                fontWeight: 'bold',
                textAlignVertical: 'center',
                marginLeft: 5,
              }}>
              12:00 AM
            </Text>
          </View>

          <View
            style={{
              //   height: responsiveHeight(10),
              width: responsiveWidth(93),
              paddingVertical: responsiveWidth(2),
              //backgroundColor: 'teal',

              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              alignSelf: 'center',
            }}>
            <View
              style={{
                backgroundColor: Color.Green_Top,
                paddingVertical: responsiveHeight(1),
                paddingHorizontal: responsiveWidth(3),
                borderRadius: 15,
              }}>
              <Image
                source={require('../Assests/Images/fruits.png')}
                style={{
                  height: responsiveWidth(8),
                  width: responsiveWidth(8),
                }}
              />
            </View>
            <View
              style={{
                width: responsiveWidth(75),
                height: responsiveHeight(6),
                //paddingVertical: responsiveHeight(0.5),
                // backgroundColor: 'green',

                //marginLeft: 10,
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.6),
                  fontWeight: 'bold',
                  textAlignVertical: 'center',
                }}>
                Cannabies
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.6),
                  textAlignVertical: 'center',
                }}
                numberOfLines={1}>
                Lorem Ipsum is simply dummy text of the printing and
              </Text>
            </View>
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
    backgroundColor: Color.BG,
  },
});
