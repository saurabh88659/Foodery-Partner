import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Color from '../Utils/Color';
import {
  handleGetSelectedproducts,
  handleGetTransactionHiostory,
} from '../features/APIs/apiRequest';
import {Item} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import moment from 'moment-timezone';

const TransactionHistory = ({navigation}) => {
  const [transactionHistory, SetTransactionHistory] = useState([]);
  useEffect(() => {
    GetTransactionHiostory();
  }, []);

  const GetTransactionHiostory = async () => {
    const res = await handleGetTransactionHiostory();
    console.log('GetTransactionHiostory res ==========>', res.data);
    if (res.data.status) {
      SetTransactionHistory(res.data.result);
    } else {
      console.log('GetTransactionHiostory error===', res);
    }
  };

  const data = [
    {
      id: '1',
      title: 'Payment Received',
      accountNumber: 'XXXXXXXXXX6457',
      branchName: 'Dilshad Garden',
      date: 'Sat, May 12, 2023 at 12:30 PM',
      amount: '₹2,450',
    },
    {
      id: '2',
      title: 'Payment Received',
      accountNumber: 'XXXXXXXXXX6457',
      branchName: 'Dilshad Garden',
      date: 'Sat, May 19, 2023 at 11:00 PM',
      amount: '₹1,950',
    },
    {
      id: '3',
      title: 'Payment Received',
      accountNumber: 'XXXXXXXXXX6457',
      branchName: 'Dilshad Garden',
      date: 'Sat, May 26, 2023 at 09:10 PM',
      amount: '₹1,300',
    },
  ];

  const renderItem = ({item}) => (
    console.log('++++transaction history item ====>', item),
    (
      <View style={{marginTop: 20}}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 5,
            //   marginTop: 5,
            paddingHorizontal: 15,
            paddingVertical: 10,
            elevation: 3,
            //   paddingBottom: 10,
          }}>
          <Text style={{color: Color.DARK_GREEN, fontSize: 18}}>
            Payment Received
          </Text>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={{color: Color.BLACK, fontSize: 17, width: 150}}>
              Account number
            </Text>
            <Text style={{color: Color.BLACK, fontSize: 17}}>
              XXXXXXXXXXXX
              {item.vendorId.bankDetails.accountNumber.toString().slice(-4)}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 4}}>
            <Text style={{color: Color.BLACK, width: 150, fontSize: 17}}>
              Bank name
            </Text>
            <Text style={{color: Color.BLACK, fontSize: 17}}>
              {item.vendorId.bankDetails.bankName}
            </Text>
          </View>
          <View style={{marginTop: 15}}>
            <Text style={{color: Color.DARK_GRAY, fontSize: 14}}>
              {moment(item.createdAt, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format(
                'MMM D, YYYY [at] h:mm A',
              )}
            </Text>
          </View>
          <View
            style={{
              marginTop: 3,
              borderTopWidth: 1,
              borderTopColor: Color.grayShade,
              flexDirection: 'row',
              height: 50,
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <Text style={{color: Color.BLACK, fontSize: 18}}>
              Amount Credit ₹{item.amount}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ViewTransactionDetailsScreen')
              }
              style={{
                height: 35,
                width: 100,
                backgroundColor: Color.WHITE,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 0.7,
                borderColor: Color.BLACK,
              }}>
              <Text
                style={{color: Color.BLACK, fontSize: 15, fontWeight: '400'}}>
                View Details
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  );
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        // backgroundColor: ',
        paddingHorizontal: 5,
      }}>
      <FlatList
        contentContainerStyle={{paddingBottom: 20}}
        data={transactionHistory}
        // data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({});
