import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Colors from '../../Utils/Color';

const Custombtn = ({
  onPress,
  disabled,
  title,
  loadingColor,
  loadingSize,
  loading,
  color,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      disabled={disabled}
      style={{
        width: responsiveWidth(90),
        height: responsiveHeight(6.5),
        backgroundColor: Colors.DARK_GREEN,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 2,
      }}>
      {loading ? (
        <ActivityIndicator size={loadingSize} color={loadingColor} />
      ) : (
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: responsiveFontSize(2.3),
            color: color,
            textAlign: 'center',
          }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Custombtn;
