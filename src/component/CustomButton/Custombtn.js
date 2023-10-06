import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Colors from '../../Utils/Color';

const Custombtn = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={props.onPress}
      disabled={props.disabled}
      style={{
        width: responsiveWidth(90),
        height: responsiveHeight(5),
        backgroundColor: Colors.DARK_GREEN,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 2,
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: responsiveFontSize(2),
          color: props.color,

          textAlign: 'center',
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default Custombtn;
