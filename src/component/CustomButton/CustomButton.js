import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
//import {COLORS} from '../utills/Colors';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export default function CustomButton({Title, onPress, style, Title2}) {
  return (
    <View>
      <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.5}>
        <Text style={styles.text}>{Title}</Text>
        {/* <Text style={styles.text1}>{Title2}</Text> */}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'skyblue',
    height: responsiveHeight(8),
    width: responsiveWidth(80),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    borderRadius: responsiveWidth(8),
  },
  text: {
    fontSize: responsiveFontSize(2),
    color: '#fff',
    fontWeight: 'bold',
  },
  text1: {
    fontSize: responsiveFontSize(2.5),
    color: 'purple',
  },
});
