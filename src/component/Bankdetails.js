import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Stylesheet,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import Colors from '../Utils/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {format} from 'date-fns';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Entypo';
import {Dropdown} from 'react-native-element-dropdown';
import StepIndicator from 'react-native-step-indicator';
// import CustomButton from '../Components/CustomButton';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import CustomRadioButton from './CustomRadioButton';
import ImagePicker from 'react-native-image-crop-picker';
import Custombtn from './CustomButton/Custombtn';
import Color from '../Utils/Color';
import {Instance} from '../features/commonservice';
import {handleBankDetail} from '../features/APIs/apiRequest';
import Toast from 'react-native-simple-toast';
import {setLoggedIn} from '../features/auth/auth.reducer';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import AllProductCategory from '../Screens/AllProductCategory';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// {onPress, selected, children}

export default function Bankdetails() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [bankName, onBankName] = useState('');
  const [ifscCode, onIfscCode] = useState('');
  const [accountHolder, onAccountHolder] = useState('');
  const [bankAccountNumber, setbankAccountNumber] = useState('');
  const [upiNumber, setUpiNumber] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [validUpi, setValidUpi] = useState(false);

  const ValidAccountHolder = text => {
    // if (!/^[a-zA-Z\s]+$/.test(text)) {
    //   Toast.show('Please enter a valid name', Toast.SHORT);
    //   return;
    // }
    // Update the state if the input is valid (no numbers)
    onAccountHolder(text);
  };

  const ValidIfscCode = text => {
    console.log('text,,', text);
    // Check if the input contains only letters and numbers
    // if (!/^[a-zA-Z0-9]+$/.test(text)) {
    //   Toast.show('Please enter valid IFSC code', Toast.SHORT);
    //   // If it contains invalid characters, do not update the state
    //   return;
    // }
    // Update the state if the input is valid (only letters and numbers)
    onIfscCode(text);
  };

  const ValidBankName = text => {
    console.log('tetx', text);
    // if (!/^[a-zA-Z\s]+$/.test(text)) {
    //   Toast.show(
    //     'Please enter a valid name without special characters',
    //     Toast.SHORT,
    //   );
    //   return;
    // }
    onBankName(text);
  };

  const ValidAccount = text => {
    // console.log('tetx', text);
    // if (!/^\d+$/.test(text)) {
    //   Toast.show('Please enter valid Account number', Toast.SHORT);
    //   return;
    // }
    setbankAccountNumber(text);
  };

  const submitBankDetails = async () => {
    setButtonLoading(true);
    const bankdataobj = {
      bankName: bankName,
      accountNumber: bankAccountNumber,
      accountHolder: accountHolder,
      ifscCode: ifscCode,
      upi: upiNumber,
    };
    const res = await handleBankDetail(bankdataobj);
    if (res.data) {
      setButtonLoading(false);
      console.log('res of submitBankDetails', res?.data);
      if (res.data.success) {
        if (validUpi) {
          Toast.show(res?.data?.message, Toast.SHORT);
          navigation.replace('AllProductCategory');
          // dispatch(setLoggedIn(true));
        } else {
          Toast.show('Please Verify Upi', Toast.SHORT);
        }
      }
    } else {
      setButtonLoading(false);
      console.log('error of submitBankDetails', res?.response?.data?.message);
      Toast.show(res?.response?.data?.message, Toast.SHORT);
    }
  };

  const checkValidUPI = () => {
    console.log('upiNumber', upiNumber);
    const upiIdRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+$/;
    if (upiIdRegex.test(upiNumber)) {
      console.log('valid');
      Toast.show('Valid UPI', Toast.SHORT);

      setValidUpi(true);
    } else {
      console.log('invalid');
      Toast.show('Please enter valid UPI', Toast.SHORT);
    }
  };

  const setFalseOnchange = text => {
    console.log('text', text);
    setUpiNumber(text), setValidUpi(false);
  };

  return (
    <View style={{paddingBottom: 170}}>
      <Text
        style={{
          color: Colors.BLACK,
          fontWeight: '500',
          fontSize: 14,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        Bank Account Number
      </Text>
      <TextInput
        maxLength={16}
        style={{
          backgroundColor: Colors.WHITE,
          marginHorizontal: 10,
          height: 50,
          borderRadius: 4,
          paddingLeft: 8,
          color: '#000',
          elevation: 2,
        }}
        keyboardType="number-pad"
        onChangeText={text => {
          ValidAccount(text);
        }}
        value={bankAccountNumber}
      />

      <Text
        style={{
          color: Colors.BLACK,
          fontWeight: '500',
          fontSize: 14,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        Account Holder Name
      </Text>
      <TextInput
        maxLength={25}
        style={{
          backgroundColor: Colors.WHITE,
          marginHorizontal: 10,
          height: 50,
          borderRadius: 4,
          paddingLeft: 8,
          color: '#000',
          elevation: 2,
        }}
        onChangeText={text => {
          ValidAccountHolder(text);
        }}
        value={accountHolder}
      />

      <Text
        style={{
          color: Colors.BLACK,
          fontWeight: '500',
          fontSize: 14,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        IFSC Code
      </Text>
      <TextInput
        maxLength={11}
        style={{
          backgroundColor: Colors.WHITE,
          marginHorizontal: 10,
          height: 50,
          borderRadius: 4,
          paddingLeft: 8,
          color: '#000',
          elevation: 2,
        }}
        onChangeText={text => {
          ValidIfscCode(text);
        }}
        value={ifscCode}
      />

      <Text
        style={{
          color: Colors.BLACK,
          fontWeight: '500',
          fontSize: 14,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        Bank Name
      </Text>
      <TextInput
        style={{
          backgroundColor: Colors.WHITE,
          marginHorizontal: 10,
          height: 50,
          borderRadius: 4,
          paddingLeft: 8,
          color: '#000',
          elevation: 2,
        }}
        onChangeText={text => {
          ValidBankName(text);
        }}
        value={bankName}
      />

      {/* <Text
        style={{
          color: Colors.BLACK,
          fontWeight: '500',
          fontSize: 19,
          alignSelf: 'center',
          paddingVertical: 15,
        }}>
        OR
      </Text> */}

      <View
        style={{
          // backgroundColor: 'red',
          width: responsiveWidth(92),
          height: responsiveHeight(10),
          marginHorizontal: 10,
          alignSelf: 'center',
          height: 150,
          justifyContent: 'center',
          borderRadius: 5,
          backgroundColor: '#fff',
          elevation: 2,
          borderColor: Color.LIGHT_Gray,
          borderWidth: 1,
          marginTop: 40,
        }}>
        <Text
          style={{
            top: -9,
            color: Colors.BLACK,
            fontWeight: 'bold',
            fontSize: 12,
            // textAlign: 'left',
            paddingVertical: 5,
            alignSelf: 'center',
            // marginLeft: ,
            // marginHorizontal: 10,
            height: 30,
            // backgroundColor: 'red',
          }}>
          UPI ID
        </Text>
        <Text
          style={{
            color: Colors.BLACK,
            fontWeight: '500',
            fontSize: 12,
            textAlign: 'left',
            paddingVertical: 5,
            // marginLeft: ,
            marginHorizontal: 10,
          }}>
          Enter UPI ID
        </Text>
        <View
          style={{
            height: 1,
            // width: '100%',
            backgroundColor: '#000',
            // marginHorizontal: 10,
            marginBottom: 5,
            marginHorizontal: 10,
          }}></View>

        <View
          style={{
            //backgroundColor: 'pink',
            width: responsiveWidth(92),
            height: responsiveHeight(6),
            alignSelf: 'center',
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <TextInput
            placeholder="ex.mobilenumber@upi"
            keyboardType="email-address"
            style={{
              backgroundColor: Colors.WHITE,
              height: responsiveHeight(5.5),
              width: responsiveWidth(60),
              borderRadius: 4,
              paddingLeft: 8,
              color: '#000',
              //elevation: 2,
              borderWidth: 1,
              borderColor: 'gray',
              alignItems: 'center',
              fontSize: responsiveFontSize(1.5),
              marginRight: 13,
            }}
            onChangeText={text => {
              setFalseOnchange(text);
            }}
            value={upiNumber}
          />
          {!validUpi ? (
            <TouchableOpacity
              onPress={checkValidUPI}
              style={{
                backgroundColor: Colors.DARK_GREEN,
                width: responsiveWidth(23),
                height: responsiveHeight(4.1),
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: Colors.BLACK,
                  fontWeight: 'bold',
                  fontSize: 12,
                  // textAlign: 'center',
                  color: '#fff',
                }}>
                Verify
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                // backgroundColor: 'red',
                width: responsiveWidth(23),
                height: responsiveHeight(4.1),
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIcons name={'verified'} size={30} color={'green'} />
              {/* <Text>OK</Text> */}
            </View>
          )}
        </View>
      </View>
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <Custombtn
          title={'NEXT'}
          color={'#ffff'}
          onPress={() => {
            submitBankDetails();
          }}
          loadingColor={'#ffff'}
          loadingSize={27}
          loading={buttonLoading}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});
