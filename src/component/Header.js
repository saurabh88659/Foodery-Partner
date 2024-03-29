import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
//import {COLORS} from '../utills/Colors';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../Utils/Color';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export default function Header({Title, onPress, style, Title2}) {
  return (
    <View style={{}}>
      <View style={styles.button}>
        <View style={styles.back}>
          <TouchableOpacity onPress={onPress}>
            <FontAwesome6 name="arrow-left" color={'white'} size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.texting}>
          <Text style={styles.text}>{Title}</Text>
        </View>

        <View style={styles.back}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Color.Green_Top,
    height: responsiveHeight(8),
    width: responsiveWidth(100),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // marginTop: 40,
    // paddingHorizontal: 20,
    // marginHorizontal: 10,
    paddingLeft: 15,
  },
  back: {
    height: responsiveHeight(8),
    width: responsiveWidth(10),

    alignSelf: 'center',
    justifyContent: 'center',
  },
  texting: {
    height: responsiveHeight(8),
    width: responsiveWidth(80),

    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: responsiveFontSize(2.2),
    color: '#fff',
  },
  text1: {
    fontSize: responsiveFontSize(2),
    color: 'purple',
  },
});
