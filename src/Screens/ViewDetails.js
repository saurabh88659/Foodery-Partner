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
import React, {useState} from 'react';
import Header from '../component/Header';
import Color from '../Utils/Color';

//import ImagePicker from 'react-native-image-crop-picker';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const {height, width} = Dimensions.get('window');

function ViewDetails({navigation}) {
  const data = [
    {
      productname: 'Bread',
      NoOfitem: '2',
      ProductImage: 'Image',
      ProductId: '1234455',
      Price: '34',
    },
    {
      productname: 'Buttor',
      NoOfitem: '3',
      ProductImage: 'Image',
      ProductId: '1234455',
      Price: '34',
    },
    {
      productname: 'Jam',
      NoOfitem: '1',
      ProductImage: 'Image',
      ProductId: '1234455',
      Price: '34',
    },
    {
      productname: 'Milk',
      NoOfitem: '5',
      ProductImage: 'Image',
      ProductId: '1234455',
      Price: '34',
    },
  ];

  // let splitNumberToArray = preData?.phone?.split("", 2);

  let header1 = 'Enter OTP';
  // let f_number = parseFloat(splitNumberToArray?.toString().replace(/,/g, ""));
  // let header2 = `We've sent a 6-digit verification code to your \nmobile number +91 ${f_number}********`;
  const [state, setState] = useState({
    otp: '',
    isLoading: false,
  });

  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisible2, setModalVisible2] = React.useState(false);
  const [colorChng, setcolorChng] = useState(false);
  const [colorChng2, setcolorChng2] = useState(false);

  // const [imageUrlPath, setImageUrlPath] = useState(null);

  // async function SendOtpVerify() {
  //   console.log('Press');

  //   setModalVisible2(true);
  // }

  // async function VerificationOtp() {
  //   if (state.otp == null) {
  //     console.log('otp null');
  //   } else {
  //     console.log('OTP iisss', state.otp);
  //     setModalVisible2(!modalVisible2);
  //     setcolorChng(true);
  //   }
  // }

  // async function VerifySelfi() {

  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   })
  //     .then(image => {
  //       console.log('Image Data......', image);
  //       setImageUrlPath(image.path);
  //       setcolorChng2(true);
  //     })
  //     .catch(err => {
  //       console.log('Camera error--->', err);
  //     });
  // }

  // async function SelFiapp() {

  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   })
  //     .then(image => {
  //       console.log('Image Data......', image);
  //       setImageUrlPath(image.path);
  //     })
  //     .catch(err => {
  //       console.log('Camera error--->', err);
  //     });
  // }

  // async function SubmitSelf() {
  //   if (imageUrlPath == null) {
  //     console.log('path is nulll');
  //   } else {
  //     setModalVisible(!modalVisible);
  //     setcolorChng2(true);
  //   }
  // }
  return (
    <SafeAreaView
      style={{
        backgroundColor: Color.BG,
        height: responsiveHeight(100),
      }}>
      <StatusBar backgroundColor={Color.Green_Top} barStyle={Color.WHITE} />
      <View
        style={{
          // height: responsiveHeight(30),
          width: responsiveWidth(100),
          // backgroundColor: '#ffff',
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
                fontSize: responsiveFontSize(2.5),
                fontWeight: 'bold',
                padding: 2,
                color: Color.WHITE,
              }}>
              Prakash Singh
            </Text>
            <Text
              style={{
                fontSize: responsiveFontSize(2.2),
                fontWeight: 'bold',

                color: Color.WHITE,
                alignSelf: 'center',
              }}>
              My Order
            </Text>
          </View>
        </ImageBackground>
      </View>
      {/* ...........................Time Of Order............................... */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            elevation: 5,
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
                123457689879655
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
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    color: Color.BLACK,
                    fontWeight: 'normal',
                  }}>
                  Priya Singh
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    color: Color.BLACK,
                    fontWeight: 'normal',
                  }}>
                  334-C, Pralrati Apartments,
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    color: Color.BLACK,
                    fontWeight: 'normal',
                  }}>
                  Sector-43, Noida-201307
                </Text>

                <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    color: Color.BLACK,
                    fontWeight: 'normal',
                  }}>
                  8907654321
                </Text>
              </View>
              <View
                style={{
                  //backgroundColor: 'green',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    color: Color.BLACK,
                    fontWeight: 'normal',
                  }}>
                  June 28 2023 12:35 PM
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: Color.WHITE,
              paddingVertical: responsiveHeight(2),
              //backgroundColor: 'purple',
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
            <View
              style={{
                paddingVertical: 8,
                //backgroundColor: 'teal',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
              }}>
              <Text style={styles.ItemText}>Bread*1</Text>

              <Text style={styles.ItemText}>Rs. 40</Text>
            </View>
            <View
              style={{
                paddingVertical: 8,
                //backgroundColor: 'teal',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
              }}>
              <Text style={styles.ItemText}>Bread*1</Text>

              <Text style={styles.ItemText}>Rs. 40</Text>
            </View>
            <View
              style={{
                paddingVertical: 8,
                //backgroundColor: 'teal',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
              }}>
              <Text style={styles.ItemText}>Bread*1</Text>

              <Text style={styles.ItemText}>Rs. 40</Text>
            </View>

            <View
              style={{
                paddingVertical: 8,
                //backgroundColor: 'teal',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
              }}>
              <Text style={styles.ItemText}>Bread*1</Text>

              <Text style={styles.ItemText}>Rs. 40</Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: Color.WHITE,
              paddingVertical: responsiveHeight(1),
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
              }}>
              <Text style={{color: 'black', fontSize: 15}}>Item Total</Text>
              <Text>Rs162</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
                marginTop: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 10}}>Delivery Fee</Text>
              </View>

              <Text style={{fontSize: 10, color: Color.LIGHT_GREEN}}>
                RS 5{' '}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
                borderBottomWidth: 0.5,
                borderStyle: 'dashed',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 10}}>GST</Text>
              </View>

              <Text style={{fontSize: 10, color: Color.LIGHT_GREEN}}>Rs 0</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
                marginTop: 2,
              }}>
              <Text style={{fontSize: 12, color: 'black'}}>To Pay</Text>
              <Text style={{fontSize: 12, color: 'black'}}>Rs. 162</Text>
            </View>
          </View>
        </View>
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
