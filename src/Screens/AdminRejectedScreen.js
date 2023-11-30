import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  handleRejectReason,
  suspendAndRejectReason,
} from '../features/APIs/apiRequest';

const AdminRejectedScreen = () => {
  console.log('helooooooooooooooooo');
  const [reason, setReason] = useState([]);

  const fetchData = async () => {
    console.log('jskskskks');
    const data = await handleRejectReason();
    if (data.data.status) {
      setReason(data?.data?.result);
    } else {
      console.log('errror of fetchData reson rejec');
    }
    console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', data.data.result);
  };
  useEffect(() => {
    fetchData();
  }, []);

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
          Sorry, Your account has been rejected.
          {/* because you submmited wrong
          documents. */}
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: 18,
            marginTop: 5,
            // fontWeight: '700',
            textAlign: 'center',
          }}>
          {reason}
        </Text>
      </View>
    </View>
  );
};
export default AdminRejectedScreen;
const styles = StyleSheet.create({});
