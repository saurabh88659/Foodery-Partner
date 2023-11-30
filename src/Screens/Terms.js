import {View, Text} from 'react-native';
import React from 'react';
import Header from '../component/Header';

export default function Terms({navigation}) {
  return (
    <View>
      <Header
        Title={'Terms and Conditions'}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}
