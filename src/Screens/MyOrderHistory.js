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
  ActivityIndicator,
  RefreshControl,
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
import {useIsFocused, useNavigation} from '@react-navigation/native';

export default function MyOrderHistory({navigation}) {
  const [loading, setLoading] = useState(true);
  const [vendorCurrentBalance, setVendorCurrentBalance] = useState('');
  const [walletData, setWalletData] = useState([]);
  const [orderdata, setOrderdata] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isFocused) {
      GetVendorCurrentBalance();
      GetTransaction();
    }
  }, [isFocused]);

  const GetTransaction = async () => {
    // setLoading(true);
    const res = await handleGetTransaction();
    console.log('res of GetTransaction===> ', JSON.stringify(res.data));
    if (res.data.status) {
      setLoading(false);
      setTransaction(res.data.result);
      // setLoading(false);
      // console.log('res of GetAllCategoryList', res.data.result);
      // setAllCategory(res.data.result);
    } else {
      // setLoading(false);
      setLoading(false);
      console.log('error==', res);
    }
  };

  const GetVendorCurrentBalance = async () => {
    // setLoading(true);
    const res = await handleVEndorCurrentBalance();
    if (res.data) {
      // setLoading(false);
      setVendorCurrentBalance(res.data.vendorBalance);
      console.log(
        'res of GetVendorCurrentBalance===>at wallet',
        res.data.vendorBalance,
      );
    } else {
      // setLoading(false);
      console.log(' GetVendorCurrentBalance error==', res);
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

  const onRefresh = async () => {
    setRefreshing(true);
    const res1 = await handleGetTransaction();
    const res2 = await handleVEndorCurrentBalance();
    // console.log('res1 and res2', res1, res2);
    setTimeout(() => {
      setRefreshing(false);
    }, 50);
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
    console.log('item of render TransactionItem>>>>  >', JSON.stringify(item));
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
            paddingBottom: '10%',
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
              Order ID : {item.orderId}
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
                      key={index}
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
      {loading ? (
        <View
          style={{
            height: '75%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Lottie
            source={require('../Assests/Lottie/greenLoadingLine.json')}
            autoPlay
            loop={true}
            style={{height: 100, width: 100}}
          /> */}
          <ActivityIndicator color={Color.DARK_GREEN} size={32} />
        </View>
      ) : (
        <View>
          <View
            style={{width: responsiveWidth(100), backgroundColor: Color.WHITE}}>
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
          {transaction.length > 0 ? (
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <View>
                {transaction.map((item, index) =>
                  renderTransactionItem(item, index),
                )}
              </View>
            </ScrollView>
          ) : (
            <View
              style={{
                height: '75%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: Color.DARK_GRAY,
                  fontSize: 21,
                  fontWeight: '600',
                }}>
                No transactions available
              </Text>
            </View>
          )}
        </View>
      )}
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
