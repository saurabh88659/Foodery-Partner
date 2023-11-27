import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../component/Header';
import Color from '../Utils/Color';
//import ImagePicker from 'react-native-image-crop-picker';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {handleGetOrder} from '../features/APIs/apiRequest';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useSelector} from 'react-redux';

const {height, width} = Dimensions.get('window');
function Order({navigation}) {
  const userData = useSelector(state => state.requiredata.userData);
  console.log('userdata===>', JSON.stringify(userData));

  const [orderdata, setOrderData] = useState([]);

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    const res = await handleGetOrder();
    if (res.data.status) {
      console.log('res of getOrder', res.data);
      setOrderData(res.data.result);
    } else {
      console.log('error ===>', res);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Color.BG,
        height: responsiveHeight(100),
      }}>
      <StatusBar backgroundColor={Color.Green_Top} barStyle={Color.WHITE} />

      <View
        style={{
          height: responsiveHeight(30),
          width: responsiveWidth(100),
          //backgroundColor: 'pink',
        }}>
        <ImageBackground
          source={require('../Assests/Images/Mask.png')}
          style={{
            height: responsiveWidth(50),
            width: responsiveWidth(100),
          }}>
          <View
            style={{
              //backgroundColor: 'pink',
              alignSelf: 'center',
              marginTop: responsiveHeight(10),
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(3),
                fontWeight: 'bold',
                padding: 2,
                color: Color.WHITE,
              }}>
              {userData.firstName} {userData.lastName}
            </Text>
            <Text
              style={{
                fontSize: responsiveFontSize(2.2),
                fontWeight: '400',
                color: Color.WHITE,
                alignSelf: 'center',
              }}>
              My Order
            </Text>
          </View>
        </ImageBackground>
      </View>
      {/* ...........................My Order............................... */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {orderdata.map(
          (item, index) => (
            console.log('item=======>>>>', JSON.stringify(item)),
            (
              <View
                key={index}
                style={{
                  backgroundColor: Color.WHITE,
                  // backgroundColor: 'red',
                  marginHorizontal: responsiveWidth(2),
                  borderRadius: 10,
                  elevation: 2,
                  marginTop: 10,
                  marginBottom: 10,
                  paddingVertical: 15,
                }}>
                <View
                  style={{
                    paddingVertical: responsiveHeight(0.5),
                    marginLeft: responsiveWidth(3),
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: responsiveFontSize(2),
                      color: Color.Green_Top,
                      textTransform: 'uppercase',
                    }}>
                    {item.delieveryAddress.receiverName}
                  </Text>
                </View>
                <View
                  style={{
                    //backgroundColor: 'skyblue',
                    paddingVertical: responsiveHeight(1),
                    borderRadius: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <View
                      style={{
                        //backgroundColor: 'pink',
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                        paddingHorizontal: responsiveWidth(3),
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: Color.BLACK,
                          fontSize: responsiveFontSize(2),
                        }}>
                        Order ID :
                      </Text>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: '#000',
                        }}>
                        {' '}
                        {item.orderId}
                      </Text>
                    </View>

                    <View
                      key={index}
                      style={{
                        //backgroundColor: 'pink',
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                        paddingHorizontal: responsiveWidth(3),
                        // marginBottom: 4,
                        // width: 120,
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: Color.BLACK,
                          fontSize: responsiveFontSize(2),
                        }}>
                        Products :
                      </Text>
                      {item.orderedProducts?.map(
                        (item, index) => (
                          console.log(
                            'item====>ofproductName in order  ',
                            item,
                          ),
                          (
                            <Text
                              key={index}
                              numberOfLines={1}
                              style={{
                                fontSize: responsiveFontSize(2),
                                color: '#000',
                                width: '35%',
                                // backgroundColor: 'red',
                              }}>
                              {' '}
                              {item.productId.productName} |
                            </Text>
                          )
                        ),
                      )}
                    </View>

                    <View
                      style={{
                        // backgroundColor: 'pink',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: responsiveWidth(3),
                        alignItems: 'flex-end',
                        // backgroundColor: 'red',
                        width: '91%',
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: Color.BLACK,
                            fontSize: responsiveFontSize(2),
                          }}>
                          Address :
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize: responsiveFontSize(2),
                            // width: 160,
                            color: '#000',
                          }}>
                          {' '}
                          {item.delieveryAddress?.city}
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('ViewDetails', {data: item})
                          }
                          style={{
                            backgroundColor: Color.Green_Top,
                            width: responsiveWidth(28),
                            height: responsiveHeight(4),
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 4,
                            marginRight: 5,
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: Color.WHITE,
                              fontSize: responsiveFontSize(1.8),
                            }}>
                            View Details
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )
          ),
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  TextDetails: {
    fontSize: responsiveFontSize(1.8),
    textAlign: 'center',
    fontWeight: 'bold',
    color: Color.BLACK,
    //width: 40,
  },
  contentContainer: {
    // paddingVertical: 30,
    paddingBottom: '20%',
  },
  TextDetails1: {
    fontSize: responsiveFontSize(1.5),
    textAlign: 'center',
    fontWeight: 'normal',
    color: Color.Green_Top,
    textAlignVertical: 'center',

    //width: 40,
  },
  ItemText: {
    fontSize: responsiveFontSize(1.5),
    alignSelf: 'center',

    textAlign: 'center',

    color: 'black',
  },
  ItemText1: {
    fontSize: 12,
    alignSelf: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    //width: 100,
    color: 'black',
  },

  underlineStyleBase: {
    width: width / 9,
    height: 60,
    backgroundColor: Color.WHITE,
    color: Color.BLACK,
    fontSize: width / 20,
    fontWeight: '600',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
    margin: 5,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: Color.lightYellow,
    padding: 35,
    alignItems: 'center',
    borderWidth: 1,

    // shadowColor: Color.YELLOW,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 35,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
});

export default Order;
