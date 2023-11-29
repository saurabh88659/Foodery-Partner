import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AdminRejectedScreen = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          // paddingVertical: 200,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 100,
        }}>
        <AntDesign name={'exclamationcircleo'} size={45} color={'red'} />
        <Text
          style={{
            color: '#000',
            fontSize: 25,
            marginTop: 25,
            fontWeight: '700',
          }}>
          Account Rejected
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: 18,
            marginTop: 20,
            // fontWeight: '700',
            textAlign: 'center',
          }}>
          Sorry, your account has been rejected because you submmited wrong
          documents.
        </Text>
      </View>
    </View>
  );
};
export default AdminRejectedScreen;
const styles = StyleSheet.create({});
