import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Color from '../Utils/Color';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../component/Header';
import {
  handleGetAllCategoryList,
  handleGetOrder,
  handleGetTransaction,
  handleVEndorCurrentBalance,
} from '../features/APIs/apiRequest';
import moment from 'moment';
import TransactionDetailsAccountReceiveScreen from './TransactionDetailsAccountReceiveScreen';
import TransactionDetailsWalletReceiveScreen from './TransactionDetailsWalletReceiveScreen';

export default function MyOrderHistory({navigation}) {
  const [loading, setLoading] = useState(false);
  const [vendorCurrentBalance, setVendorCurrentBalance] = useState('');
  const [walletData, setWalletData] = useState([]);
  const [orderdata, setOrderdata] = useState([]);
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    GetVendorCurrentBalance();
    // getWalletDetails();
    GetTransaction();
  }, []);

  const GetTransaction = async () => {
    setLoading(true);
    const res = await handleGetTransaction();
    console.log('res of GetTransaction===> ', JSON.stringify(res.data));
    if (res.data.status) {
      setTransaction(res.data.result);
      // setLoading(false);
      // console.log('res of GetAllCategoryList', res.data.result);
      // setAllCategory(res.data.result);
    } else {
      // setLoading(false);
      console.log('error==', res);
    }
  };

  const GetVendorCurrentBalance = async () => {
    setLoading(true);
    const res = await handleVEndorCurrentBalance();
    if (res.data) {
      setLoading(false);
      setVendorCurrentBalance(res.data.vendorBalance);
      console.log(
        'res of GetVendorCurrentBalance===>at wallet',
        res.data.vendorBalance,
      );
    } else {
      setLoading(false);
      console.log(' GetVendorCurrentBalance error==', res.data);
    }
  };

  const getWalletDetails = async () => {
    const res = await handleGetOrder();
    if (res.data.status) {
      console.log('res of getWalletDetails', JSON.stringify(res.data.result));
      setWalletData(res.data.result);
    } else {
      console.log('error of getWalletDetails===>', res);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={index}>
        <View
          style={{
            backgroundColor: Color.WHITE,
            marginHorizontal: responsiveWidth(1),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
            elevation: 2,
            borderRadius: 2,
            paddingBottom: responsiveHeight(1.5),
            marginVertical: responsiveHeight(1.5),
          }}>
          <View
            style={{
              width: responsiveWidth(50),
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: responsiveFontSize(1.8),
                padding: 10,
                color: Color.BLACK,
                alignSelf: 'center',
              }}>
              {item.delieveryAddress.receiverName}
            </Text>

            <View
              style={{
                backgroundColor: Color.Green_Top,
                height: responsiveHeight(4.5),
                width: responsiveWidth(37),
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(1.8),
                  color: Color.WHITE,
                }}>
                {item.orderStatus}
              </Text>
            </View>
            <Text
              style={{
                fontSize: responsiveFontSize(1.9),
                padding: 10,
                color: Color.BLACK,
                alignSelf: 'center',
              }}>
              {item?.paymentDate}
            </Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <ImageBackground
              source={require('../Assests/Images/MaskGroupside.png')}
              style={{
                width: responsiveWidth(46),
                height: responsiveWidth(22),
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: responsiveWidth(7),
                  width: responsiveWidth(7),
                  borderRadius: responsiveWidth(8),
                  alignSelf: 'center',
                  backgroundColor: Color.WHITE,
                  marginBottom: responsiveHeight(4),
                  marginLeft: responsiveWidth(18),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    color: Color.Green_Top,
                    fontSize: responsiveFontSize(2.2),
                  }}>
                  ₹
                </Text>
              </View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.8),
                  padding: 10,
                  color: Color.WHITE,
                  marginBottom: responsiveHeight(5),
                  alignSelf: 'center',
                }}>
                {item.totalAmount}
              </Text>
            </ImageBackground>
          </View>
        </View>
      </View>
    );
  };

  const renderTransactionItem = (item, index) => {
    console.log('item ofrenderTransactionItem>>>>  >', JSON.stringify(item));
    if (item.type === 'deducted') {
      return (
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: Color.DARK_GRAY,
            // paddingVertical: 10,
            // paddingHorizontal: 15,
            marginHorizontal: 10,
            paddingTop: 25,
            paddingBottom: 10,
          }}
          key={index}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TransactionDetailsAccountReceiveScreen', {
                data: item._id,
              })
            }>
            <Text style={{color: '#000', marginBottom: 4, fontSize: 15}}>
              Account Number: XXXXXXXXXXXX
              {item.vendorId.bankDetails.accountNumber.toString().slice(-4)}
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: '#000', marginBottom: 4, fontSize: 15}}>
                Bank Name: {item.vendorId.bankDetails.bankName}
              </Text>
              <Text style={{fontSize: 16, color: 'red'}}>-{item.amount}</Text>
            </View>

            <Text style={{color: Color.DARK_GRAY, fontSize: 13}}>
              {moment(item.createdAt).format('DD MMM, YYYY [at] hh:mm A')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (item.type === 'receive') {
      return (
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: Color.DARK_GRAY,
            // paddingVertical: 10,
            // paddingHorizontal: 15,
            marginHorizontal: 10,
            paddingTop: 20,
            paddingBottom: 7,
          }}
          key={index}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TransactionDetailsWalletReceiveScreen', {
                data: item,
              })
            }>
            <Text
              style={{
                color: '#000',
                marginBottom: 4,
                fontSize: 15,
                // backgroundColor: 'red',
              }}>
              Order ID : {item._id}
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: '#000',
                    marginBottom: 4,
                    fontSize: 15,
                    // backgroundColor: 'red',
                  }}>
                  Items :{/* {item.productName} */}
                </Text>
                {item.orderedProducts.map((item, index) => {
                  return (
                    <Text
                      numberOfLines={1}
                      style={{
                        color: '#000',
                        marginBottom: 4,
                        fontSize: 15,
                        left: 3,
                        width: '78%',
                      }}>
                      {item.productId.productName}
                    </Text>
                  );
                })}
              </View>

              <Text style={{color: 'green', marginBottom: 4, fontSize: 16}}>
                +{item.vendorAmount}
              </Text>
            </View>

            <Text style={{color: Color.DARK_GRAY, fontSize: 13}}>
              {moment(item.createdAt).format('DD MMM, YYYY [at] hh:mm A')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor={'#29C17E'} />
      {/* Header */}
      <Header Title={'My Wallet'} onPress={() => navigation.goBack('')} />

      <View style={{width: responsiveWidth(100), backgroundColor: Color.WHITE}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: responsiveWidth(10),
            height: responsiveHeight(7.5),
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                fontWeight: '800',
                fontSize: responsiveFontSize(2.2),
                color: Color.BLACK,
              }}>
              Current Balance
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 35,
                width: 35,
                borderRadius: 20,
                backgroundColor: Color.WHITE,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: Color.LIGHT_Gray,
                marginHorizontal: 6,
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.5),
                  color: Color.Green_Top,
                  fontWeight: '700',
                }}>
                ₹
              </Text>
            </View>
            <Text
              style={{
                fontSize: responsiveFontSize(3.5),
                color: Color.BLACK,
              }}>
              {vendorCurrentBalance}
            </Text>
          </View>
        </View>
      </View>

      {/* <Text
        style={{
          fontWeight: 'bold',
          fontSize: responsiveFontSize(2.4),
          // padding: 5,
          marginLeft: responsiveWidth(10),
          color: Color.BLACK,
          paddingTop: 5,
        }}>
        Order History
      </Text> */}
      {/* <FlatList
        data={walletData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      /> */}
      <ScrollView>
        <View>
          {transaction.map((item, index) => renderTransactionItem(item, index))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Color.BG,
  },
  contentContainer: {
    paddingVertical: 10,
  },
});

// const styles = StyleSheet.create({
//   Container: {
//     flex: 1,
//     backgroundColor: Color.BG,
//   },

// });
