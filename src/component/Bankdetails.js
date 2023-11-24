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
      console.log('res of submitBankDetails', res.data);
      if (res.data.success) {
        Toast.show(res.data.message, Toast.SHORT);
        navigation.replace('AllProductCategory');
        dispatch(setLoggedIn(true));
      }
    } else {
      setButtonLoading(false);
      console.log('error of submitBankDetails', res?.response?.data?.message);
      Toast.show(res?.response?.data?.message, Toast.SHORT);
    }
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
        onChangeText={setbankAccountNumber}
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
        style={{
          backgroundColor: Colors.WHITE,
          marginHorizontal: 10,
          height: 50,
          borderRadius: 4,
          paddingLeft: 8,
          color: '#000',
          elevation: 2,
        }}
        onChangeText={onAccountHolder}
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
        style={{
          backgroundColor: Colors.WHITE,
          marginHorizontal: 10,
          height: 50,
          borderRadius: 4,
          paddingLeft: 8,
          color: '#000',
          elevation: 2,
        }}
        onChangeText={onIfscCode}
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
        onChangeText={onBankName}
        value={bankName}
      />

      <Text
        style={{
          color: Colors.BLACK,
          fontWeight: '500',
          fontSize: 19,
          alignSelf: 'center',
          paddingVertical: 15,
        }}>
        OR
      </Text>

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
            justifyContent: 'space-between',
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
            }}
            onChangeText={setUpiNumber}
            value={upiNumber}
          />

          <TouchableOpacity
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
