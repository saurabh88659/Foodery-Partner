import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AdminSusPendScreen = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          // paddingVertical: 200,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 100,
        }}>
        <FontAwesome name={'user-times'} size={45} color={'red'} />
        <Text
          style={{
            color: '#000',
            fontSize: 25,
            marginTop: 25,
            fontWeight: '700',
          }}>
          Account Suspended
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: 18,
            marginTop: 20,
            // fontWeight: '700',
            textAlign: 'center',
          }}>
          This Account has been suspended.
        </Text>
      </View>
    </View>
  );
};
export default AdminSusPendScreen;
const styles = StyleSheet.create({});
