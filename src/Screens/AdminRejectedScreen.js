import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AdminRejectedScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: '#000', fontSize: 18}}>
        your application has been rejected due to .....
      </Text>
    </View>
  );
};
export default AdminRejectedScreen;
const styles = StyleSheet.create({});
