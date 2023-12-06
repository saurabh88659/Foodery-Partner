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
  RefreshControl,
  ActivityIndicator,
  Linking,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import Header from '../component/Header';
import Color from '../Utils/Color';
import moment from 'moment';
//import ImagePicker from 'react-native-image-crop-picker';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';
import {
  handleGetAllCategoryList,
  handleGetOrderDetailsById,
} from '../features/APIs/apiRequest';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import StepIndicator from 'react-native-step-indicator';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {height, width} = Dimensions.get('window');

function ViewDetails({navigation, route}) {
  const isFocused = useIsFocused();
  const userData = useSelector(state => state.requiredata.userData);
  console.log('useerdata -->', userData);
  const data = route.params.data;
  console.log('data===???', JSON.stringify(data));
  const [refreshing, setRefreshing] = useState(false);
  const [orderDetailsById, setOrderDetailsById] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  // const stepCount = data.length;
  // const labels = orderDetailsById.allBookingStatuses.map(step => ({
  //   label: step.status,
  //   time: step.time,
  // }));

  useEffect(() => {
    if (isFocused) {
      GetOrderDetailsById();
    }
  }, [isFocused]);

  console.log(
    'orderDetailsById===================>',
    JSON.stringify(orderDetailsById),
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refresh();
    // GetOrderDetailsById();
    setRefreshing(false);
  }, []);

  const GetOrderDetailsById = async () => {
    setLoading(true);
    const res = await handleGetOrderDetailsById(data);
    console.log(
      '----99999999###+++Res of GetOrderDetailsById===>>',
      JSON.stringify(res.data.result),
    );
    if (res.data.status) {
      setLoading(false);
      setOrderDetailsById(res.data.result);
    } else {
      setLoading(false);
      console.log('error==', res);
    }
  };

  const refresh = async () => {
    const res = await handleGetOrderDetailsById(data);
    console.log(
      '+++Res of GetOrderDetailsById===>>',
      JSON.stringify(res?.data),
    );
    if (res.data.status) {
      setOrderDetailsById(res.data.result);
    } else {
      console.log('error==', res);
    }
  };

  const labels = orderDetailsById?.allBookingStatuses?.slice(2).map(status => {
    console.log('(((())))====all levels=====>>>', status);
    return (
      <View style={{justifyContent: 'flex-end'}}>
        <Text></Text>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              alignSelf: 'flex-start',
            }}>
            {status?.status == 'deliveryBoyAccepted'
              ? 'Delivery boy accepted'
              : status?.status == 'pickedup'
              ? 'picked up'
              : status?.status == 'Delivered'
              ? 'order delivered'
              : null}
          </Text>
          <Text style={{color: 'grey', fontSize: 12}}>
            {moment(status?.time).format('ddd MMM D , hh:mm A')}
          </Text>
        </View>
      </View>
    );
  });
  console.log(
    '$$$$$$$$$$$$$$$$$$$$$$$$$$orderDetailsById.allBookingStatuses=================>>',
    JSON.stringify(orderDetailsById),
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: Color.BG,
        height: responsiveHeight(100),
      }}>
      <StatusBar backgroundColor={Color.Green_Top} barStyle={Color.WHITE} />
      <Header
        Title={'Order Details'}
        onPress={() => {
          navigation.goBack();
        }}
      />

      {/* ...........................Time Of Order............................... */}
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
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{marginTop: 30, paddingHorizontal: 10}}>
            {/* <View style={{}}>            </View> */}

            {/* <StepIndicator
              // direction={'vertical'}
              customStyles={stepIndicatorStyles}
              currentPosition={currentStep}
              labels={labels}
              stepCount={stepCount}
            /> */}

            <View style={{marginBottom: 20}}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  color: '#000',
                  fontWeight: '500',
                }}>
                {orderDetailsById?.deliveryBoyStatus === 'pending' &&
                  'Looking for a delivery partner. Please wait...'}
                {orderDetailsById?.deliveryBoyStatus === 'accepted' &&
                  'Delivery partner is on its way to pick an order from you.'}
                {orderDetailsById?.deliveryBoyStatus === 'pickedup' &&
                  'Order has been picked up and is on its way.'}
                {orderDetailsById?.deliveryBoyStatus === 'Delivered' &&
                  'Success! order has been delivered.'}
              </Text>
            </View>

            {(orderDetailsById.deliveryBoyStatus == 'accepted' ||
              orderDetailsById?.deliveryBoyStatus === 'pickedup' ||
              orderDetailsById?.deliveryBoyStatus === 'Delivered') && (
              <View
                style={{
                  backgroundColor: '#66cdaa',
                  // paddingVertical: 15,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingTop: 6,
                  paddingBottom: 15,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '500',
                    color: '#000',
                    marginBottom: 8,
                  }}>
                  Delivery Partner Details:
                </Text>

                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 17, color: '#000', width: 80}}>
                    Name
                  </Text>
                  <Text style={{fontSize: 17, color: '#000'}}>
                    {orderDetailsById?.deliveryBoyId?.firstName +
                      ' ' +
                      orderDetailsById?.deliveryBoyId?.lastName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 17, color: '#000', width: 80}}>
                      Contact{' '}
                    </Text>
                    <Text style={{fontSize: 17, color: '#000', marginRight: 0}}>
                      {orderDetailsById?.deliveryBoyId?.mobileNumber}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginRight: 6,
                      // backgroundColor: 'red',
                    }}
                    onPress={() =>
                      Linking.openURL(
                        `tel:${orderDetailsById?.deliveryBoyId?.mobileNumber}`,
                      )
                    }>
                    <Ionicons name={'call'} color={'green'} size={22} />
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 17, color: '#000', width: 80}}>
                    Order Id
                  </Text>
                  <Text style={{fontSize: 17, color: '#000'}}>
                    {orderDetailsById.orderId}
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View
            style={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              elevation: 5,
              marginTop: 10,
            }}>
            <View
              style={{
                backgroundColor: Color.WHITE,
                paddingHorizontal: 9,
                //paddingVertical: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',

                  justifyContent: 'space-between',
                  //backgroundColor: 'yellow',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: 'bold',
                    color: Color.Green_Top,
                  }}>
                  Customer Details
                </Text>

                <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    fontWeight: 'normal',
                    color: Color.BLACK,
                    textAlignVertical: 'center',
                  }}>
                  {orderDetailsById.orderId}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                  //backgroundColor: 'purple',
                }}>
                <View style={{marginTop: 3}}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: responsiveFontSize(1.5),
                      color: Color.BLACK,
                      fontWeight: 'normal',
                      width: '120%',
                      textAlign: 'left',
                      // backgroundColor: 'red',
                    }}>
                    {orderDetailsById?.delieveryAddress?.nearby_landmark}
                  </Text>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.5),
                      color: Color.BLACK,
                      fontWeight: 'normal',
                    }}>
                    {orderDetailsById?.delieveryAddress?.floor}
                  </Text>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.5),
                      color: Color.BLACK,
                      fontWeight: 'normal',
                    }}>
                    {orderDetailsById?.delieveryAddress?.city}-
                    {orderDetailsById?.delieveryAddress?.pinCode}{' '}
                    {orderDetailsById?.delieveryAddress?.state}
                    {/* Sector-43, Noida-201307 */}
                  </Text>
                </View>
              </View>
              <View
                style={
                  {
                    // backgroundColor: 'green',
                    // alignItems: 'flex-end',
                    // justifyContent: 'flex-start',
                  }
                }>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    color: Color.DARK_GRAY,
                    fontWeight: 'normal',
                  }}>
                  {moment(data.createdAt).format('DDMMM, YYYY [at] hh:mm A')}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: Color.WHITE,
                paddingVertical: responsiveHeight(2),
              }}>
              <View
                style={{
                  alignItems: 'flex-start',
                  borderBottomWidth: 0.8,
                  paddingHorizontal: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.TextDetails}>Order Details</Text>
                <Text style={styles.TextDetails1}>Active</Text>
              </View>
              <View
                style={{
                  paddingVertical: 8,
                  //backgroundColor: 'teal',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                }}>
                <Text style={styles.ItemText1}>Products Purchased</Text>
                <Text style={styles.ItemText1}>Price</Text>
              </View>

              {orderDetailsById?.orderedProducts?.map((item, index) => {
                console.log('item of purchased ==', item);
                return (
                  <View key={index}>
                    <View
                      key={index} // Make sure to include a unique key for each item in a list
                      style={{
                        paddingVertical: 8,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 10,
                      }}>
                      <Text style={styles.ItemText}>
                        {item.productId.productName}*{item.productId.quantity}
                      </Text>
                      <Text style={styles.ItemText}>
                        Rs. {item.productId.productPrice}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 10,
                      }}>
                      <Text style={{color: 'black', fontSize: 13}}>
                        Item Total
                      </Text>
                      <Text style={{color: 'black', fontSize: 13}}>
                        {item.quantity}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>

            <View
              style={{
                backgroundColor: Color.WHITE,
                paddingVertical: responsiveHeight(1),
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}>
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                  marginTop: 10,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 12}}>Delivery Fee</Text>
                </View>

                <Text style={{fontSize: 12, color: Color.LIGHT_GREEN}}>
                  Rs {orderDetailsById.deliveryFee}
                </Text>
              </View> */}

              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                  borderBottomWidth: 0.5,
                  borderStyle: 'dashed',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 12}}>GST</Text>
                </View>

                <Text style={{fontSize: 12, color: Color.LIGHT_GREEN}}>
                  Rs {orderDetailsById.gst}
                </Text>
              </View> */}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                  // marginTop: 2,
                  paddingBottom: 10,
                }}>
                <Text style={{fontSize: 12, color: 'black'}}>total Amount</Text>
                <Text style={{fontSize: 12, color: 'black'}}>
                  Rs. {orderDetailsById.totalAmount}
                </Text>
              </View>
            </View>
            {/* {===============step indincator===============} */}
          </View>
          {(orderDetailsById.deliveryBoyStatus == 'accepted' ||
            orderDetailsById.deliveryBoyStatus == 'pickedup' ||
            orderDetailsById.deliveryBoyStatus == 'Delivered') && (
            <View
              style={{
                paddingHorizontal: 15,
                // height: labels?.length * 100,
                // backgroundColor: 'red',
                marginTop: 20,
              }}>
              <Text style={{fontSize: 21, fontWeight: '500', color: '#000'}}>
                Order Status
              </Text>
              <StepIndicator
                customStyles={stepIndicatorStyles}
                currentPosition={labels?.length}
                stepCount={labels?.length}
                labels={labels}
                direction={'vertical'}
              />
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 35,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#29C17E',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#29C17E',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#29C17E',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#29C17E',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 12,
  currentStepIndicatorLabelFontSize: 12,
  stepIndicatorLabelCurrentColor: '#29C17E',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#29C17E',
  labelSize: 12,
  currentStepLabelColor: '#29C17E',
  // Customize the step indicator styles here (same as the previous example)
};

const styles = StyleSheet.create({
  TextDetails: {
    fontSize: responsiveFontSize(1.8),
    textAlign: 'center',
    fontWeight: 'bold',
    color: Color.BLACK,
    //width: 40,
  },
  contentContainer: {
    paddingVertical: 30,
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

export default ViewDetails;
