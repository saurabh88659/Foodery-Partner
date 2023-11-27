import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../component/Header';
import Color from '../Utils/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
const TransactionDetailsWalletReceiveScreen = ({navigation, route}) => {
  const data = route.params.data;
  console.log(
    'data in TransactionDetailsWalletReceiveScreen ====>>>##>',
    JSON.stringify(data),
  );

  return (
    <View>
      <Header
        Title={'Transaction Details'}
        onPress={() => navigation.goBack('')}
      />
      <View
        style={{
          height: '100%',
          // backgroundColor: 'red',
          width: '100%',
          paddingTop: 20,
          paddingHorizontal: 10,
        }}>
        <View>
          <Text style={{fontSize: 18, color: '#000'}}>Amout</Text>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: Color.DARK_GRAY,
              borderBottomWidth: 1,
              paddingBottom: 30,
              // justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'red',
            }}>
            <Text style={{fontSize: 30, color: '#000', paddingRight: 6}}>
              ₹{data.vendorAmount}
            </Text>
            <Ionicons
              name={'checkmark-circle-sharp'}
              size={42}
              color={'#32cd32'}
            />
          </View>
        </View>
        {data.orderedProducts.map(
          (item, index) => (
            console.log('item of {data.orderedProducts.map++++', item),
            (
              <View key={index}>
                <View
                  style={{
                    paddingTop: 15,
                    borderBottomColor: Color.grayShade,
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 16,
                      fontWeight: '500',
                      marginBottom: 10,
                    }}>
                    Order Id : {item.productId._id}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 16,
                        width: 85,
                      }}>
                      Item
                    </Text>
                    <Text style={{color: '#000', fontSize: 16}}>
                      {' '}
                      {item.productId.productName}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: '#000', fontSize: 16, width: 85}}>
                      Quantity
                    </Text>
                    <Text style={{color: '#000', fontSize: 16}}>
                      {item.quantity}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: '#000', fontSize: 16, width: 85}}>
                      Amount
                    </Text>
                    <Text style={{color: '#000', fontSize: 16}}>
                      {' '}
                      {item.productId.productPrice}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingTop: 20,
                    }}>
                    <Text style={{color: '#000', fontSize: 16}}>
                      Payment Recived
                    </Text>
                    <Text
                      style={{color: 'green', fontSize: 16, fontWeight: '400'}}>
                      +20
                    </Text>
                  </View>
                </View>
              </View>
            )
          ),
        )}
      </View>
    </View>
  );
};

export default TransactionDetailsWalletReceiveScreen;

const styles = StyleSheet.create({});
