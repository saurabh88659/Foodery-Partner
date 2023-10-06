import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

const CustomRadioButton = ({label, selected, onPress}) => {
  return (
    <TouchableOpacity style={styles.radioButton} onPress={onPress}>
      <View
        style={[
          styles.radioButtonOuter,
          selected && styles.radioButtonOuterSelected,
        ]}>
        {selected && <View style={styles.radioButtonInner} />}
      </View>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButtonOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#706e67',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonOuterSelected: {
    borderColor: '#706e67', // Customize the selected color as needed
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#424241', // Customize the selected dot color as needed
  },
});

export default CustomRadioButton;
