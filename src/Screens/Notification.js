import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Color from '../Utils/Color';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../component/Header';
import {
  handleAcceptNotification,
  handleGetAllCategoryList,
  handleGetVendorOrderNotification,
  handleRejectNotification,
} from '../features/APIs/apiRequest';
import Toast from 'react-native-simple-toast';
import moment from 'moment-timezone';

export default function Notification({navigation}) {
  const [allNotifications, setAllNotifications] = useState([]);
  const [refresh, setRfresh] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [refresh]

  useEffect(() => {
    GetVendorOrderNotification();
  }, []);

  const GetVendorOrderNotification = async () => {
    setLoading(true);
    const res = await handleGetVendorOrderNotification();
    console.log(
      '####res of GetVendorOrderNotification======>>',
      JSON.stringify(res.data),
    );
    if (res.data?.result) {
      setAllNotifications(res.data.result);
      setLoading(false);
    } else {
      setLoading(false);
      console.log('error of GetVendorOrderNotification==', res);
    }
  };

  const refreshCom = async () => {
    setRfresh(true);
    const res = await handleGetVendorOrderNotification();
    console.log(
      '####res of refrsh GetVendorOrderNotification======>>',
      JSON.stringify(res.data),
    );
    if (res.data?.result) {
      setRfresh(false);
      setAllNotifications(res.data.result);
    } else {
      setRfresh(false);

      console.log('error of refrsh GetVendorOrderNotification==', res);
    }
  };

  const AcceptNotification = async data => {
    console.log('data --->', data);
    const res = await handleAcceptNotification(data);
    console.log('res of AcceptNotification===>', res.data);
    if (res.data.message == 'Notification sent successfully') {
      Toast.show('Order Accetped', Toast.SHORT);
      await GetVendorOrderNotification();
      console.log('res of AcceptNotification', res.data);
    } else if (res.data.message == 'Vendor has already accepted the order.') {
      await GetVendorOrderNotification();
      Toast.show('Vendor has already accepted this order', Toast.SHORT);
    } else {
      console.log('error ===>', res);
    }
  };

  const RejectNotification = async data => {
    console.log('data --->', data);
    const res = await handleRejectNotification(data);
    // console.log('res of AcceptNotification===>', res.data);
    if (res.data.message == 'Vendor Rejected Order successfully') {
      Toast.show('Order Rejected successfully', Toast.SHORT);
      await GetVendorOrderNotification();
      console.log('res of AcceptNotification', res.data);
    } else {
      console.log('error ===>', res?.data);
      await GetVendorOrderNotification();
    }
  };

  const renderItem = ({item}) => (
    console.log('item of get allnotifications===>>>', JSON.stringify(item)),
    (
      <View
        style={{
          // height: 150,
          marginVertical: 10,
          marginHorizontal: responsiveWidth(2),
          backgroundColor: Color.WHITE,
          borderRadius: 10,
          paddingVertical: responsiveHeight(1),
          elevation: 1.5,
          paddingHorizontal: responsiveHeight(1.5),
          borderWidth: 1,
          borderColor: Color.grayShade,
          // backgroundColor: 'red',
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#000', fontSize: 15}}>
            Order ID : {item.orderId}
          </Text>
          <Text style={{color: 'grey', fontSize: 15}}>
            {' '}
            {moment(item.createdAt).format('hh:mm A')}
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: Color.grayShade,
            borderBottomWidth: 1,
            paddingBottom: 20,
          }}>
          <Text style={{fontSize: 17, fontWeight: '500', color: 'grey'}}>
            Product Details
          </Text>
          {item?.orderIdMongo?.orderedProducts.map((product, index) => {
            // console.log(
            //   'item of get orderedProducts===>>>',
            //   JSON.stringify(product),
            // );
            return (
              <View
                key={index}
                style={{
                  flex: 1,
                  paddingBottom: 20,
                  paddingTop: 6,
                  // borderBottomColor: Color.grayShade,
                  // borderBottomWidth: 1,
                  // backgroundColor: 'red',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#000', fontSize: 16, width: 145}}>
                    Product Name
                  </Text>
                  <Text style={{color: '#000', fontSize: 16}}>
                    {product.productId?.productName}
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#000', fontSize: 16, width: 145}}>
                    Qty
                  </Text>
                  <Text style={{color: '#000', fontSize: 16}}>
                    {product.quantity}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#000', fontSize: 16, width: 145}}>
                    Product Price
                  </Text>

                  <Text
                    style={{
                      color: '#000',
                      fontSize: 16,
                      // textDecorationLine: 'line-through',
                    }}>
                    {'\u20B9'}
                    {product?.productId?.productPrice}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#000', fontSize: 16, width: 145}}>
                    Discount Price
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 16,
                      // textDecorationLine: 'line-through',
                    }}>
                    {'\u20B9'}
                    {product?.productId?.discountPrice}
                  </Text>
                </View>
              </View>
            );
          })}
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'space-between',
              // alignItems: 'baseline',
              // // paddingTop: 20,
              // // paddingBottom: 10,
              // backgroundColor: 'red',
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 17.5,
                fontWeight: '700',
                width: 145,
              }}>
              Total Amount
            </Text>
            <Text style={{color: '#000', fontSize: 17.5, fontWeight: '700'}}>
              ₹{item?.orderIdMongo?.totalAmount}
            </Text>
          </View>
        </View>
        <View style={{paddingTop: 15, marginBottom: 15}}>
          <Text style={{color: 'gray', fontSize: 17, fontWeight: '500'}}>
            Customer Detials
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                width: 145,
                fontWeight: '600',
              }}>
              Name
            </Text>
            <Text style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
              {item?.userId?.name}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                width: 145,
                fontWeight: '600',
              }}>
              Contact Number
            </Text>
            <Text style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
              {item?.userId?.phone}
            </Text>
          </View>
          <View
            style={{
              // flexDirection: 'row',
              // width: '90%',
              // backgroundColor: 'red',
              marginBottom: 3,
              marginTop: 3,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 17,
                // height: 20,
                // backgroundColor: 'red',
                width: 145,
                fontWeight: '600',
              }}>
              Delivery Address
            </Text>
            <Text
              style={{
                width: '100%',
                color: '#000',
                fontSize: 16,
                // width: '100%',
                // backgroundColor: 'red',
              }}>
              {/* {item.orderIdMongo.delieveryAddress.completeAddress} */}
              {item.orderIdMongo?.delieveryAddress.completeAddress}
            </Text>
          </View>
        </View>
        {item?.orderIdMongo?.vendorStatus == 'pending' ? (
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'space-between',
              justifyContent: 'center',
              margin: 4,
              // width: 180,
              // backgroundColor: '#000',
              // height: 40,
            }}>
            <TouchableOpacity
              onPress={() => AcceptNotification(item.orderId)}
              style={{
                height: 35,
                width: '100%',
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
                borderColor: 'green',
                borderWidth: 1,
              }}>
              <Text style={{color: 'green', fontSize: 15}}>Accept</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() => RejectNotification(item.orderId)}
              style={{
                height: 35,
                width: '45%',
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
                borderColor: 'red',
                borderWidth: 1,
              }}>
              <Text style={{color: 'red', fontSize: 15}}>Reject</Text>
            </TouchableOpacity> */}
          </View>
        ) : (
          <View>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                height: 35,
                width: '100%',
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
                borderColor: '#000',
                borderWidth: 1,
                margin: 4,
              }}>
              <Text style={{color: '#000', fontSize: 15}}>
                Already Accepted
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  );
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor={Color.Green_Top} />
      <Header Title={'Notification'} onPress={() => navigation.goBack('')} />
      {loading ? (
        <View
          style={{
            height: '80%',
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
        <View style={{paddingBottom: 70}}>
          {allNotifications.length > 0 ? (
            <FlatList
              data={allNotifications}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refresh} onRefresh={refreshCom} />
              }
            />
          ) : (
            <View
              style={{
                height: '90%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'grey', fontSize: 20, fontWeight: '700'}}>
                NO DATA FOUND
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
    backgroundColor: Color.BG,
  },
});
