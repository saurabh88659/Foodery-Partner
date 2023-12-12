import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Stylesheet,
  Dimensions,
  TextInput,
  ToastAndroid,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colors from '../Utils/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {format} from 'date-fns';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePickerr from '@react-native-community/datetimepicker';
import Toast from 'react-native-simple-toast';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {he} from 'date-fns/locale';
import Custombtn from './CustomButton/Custombtn';
import {
  handleBankDetail,
  handleGetCurrentLocation,
  PersonlDetialVerification,
} from '../features/APIs/apiRequest';
import {getAuthHeaders} from '../features/commonservice';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentStep} from '../features/requireDataReducer/requiredata.reducer';
const {height, width} = Dimensions.get('window');
import Geolocation from '@react-native-community/geolocation';
import Color from '../Utils/Color';

var query = require('india-pincode-search');

export default function PersonalDetails({navigation}) {
  const dispatch = useDispatch();
  const userPhoneNUmber = useSelector(
    state => state.requiredata.userPhoneNUmber,
  );
  console.log('userPhoneNUmber===================>>>', userPhoneNUmber);
  const [Firstname, setfirstname] = useState('');
  const [Lastname, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [emailId, setemailId] = useState('');
  const [shopName, setShopName] = useState('');
  const [shopLocation, setShopLocation] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [state, setState] = useState('');
  const [pincode, setpincode] = useState('');
  const [value, setValue] = useState(null);
  const [city, setCity] = useState('');
  // const [date, setDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [mobileNumber, setMobileNumber] = useState('');
  const [alternateNumber, setAlternatNumber] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [latitude, SetLatitude] = useState('');
  const [longitude, SetLongitude] = useState('');
  const [ontabRefresh, setontabRefresh] = useState(false);

  const [currentLocationLoadingButton, SetCurrentLocationLoadingButton] =
    useState(false);
  const formattedDate = format(date, 'dd/MM/yyyy');
  console.log('formattedDate---->', formattedDate);
  // const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // develperModeOn();
  }, []);

  useEffect(() => {
    getCurrloc();
  }, [currentLocationLoadingButton, ontabRefresh]);

  const getCurrloc = () => {
    SetCurrentLocationLoadingButton(false);
    console.log('running on every hit');
    Geolocation.getCurrentPosition(data => {
      SetCurrentLocationLoadingButton(false);
      SetLatitude(data.coords.latitude), SetLongitude(data.coords.longitude);
      console.log(
        'latitue and longiture at useEfcct========>>>>',
        data.coords.longitude,
        data.coords.latitude,
      );
    });
  };

  useEffect(() => {
    setMobileNumber(userPhoneNUmber);
  }, []);

  const getCurrentLocation = async () => {
    setontabRefresh(!ontabRefresh);
    SetCurrentLocationLoadingButton(true);
    if (latitude && longitude) {
      const dataObj = {
        lat: latitude,
        long: longitude,
      };
      const res = await handleGetCurrentLocation(dataObj);
      console.log(
        'res of getCurrentLocation====>>',
        res?.data?.address?.address,
      );
      if (res.data) {
        Toast.showWithGravity(
          'Coordinates update successfully',
          Toast.SHORT,
          Toast.BOTTOM,
        );
        setCity(res?.data?.address?.address?.city);
        setState(res?.data?.address?.address?.state);
        setpincode(res?.data?.address?.address?.postcode);
        setShopLocation(res?.data?.address?.address?.buildinglimit);
        setShopAddress(res?.data?.address?.address?.state_district);
        SetCurrentLocationLoadingButton(false);
      } else {
        SetCurrentLocationLoadingButton(false);
        console.log('error in getCurrentLocation====>', res);
      }
    } else {
      SetCurrentLocationLoadingButton(false);
      Toast.showWithGravity(
        'Your location will help us serve you better – mind turning it on?',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    }
  };

  const develperModeOn = () => {
    setfirstname('saurabh');
    setLastname('kumar');
    // setDate('03/08/2000');
    setGender('male');
    setemailId('saurya8979@gmail.com');
    setMobileNumber(8979995967);
    setAlternatNumber(8979995966);
    setShopName('saurabh super mall');
    setShopLocation('Rohini, Delhi, sector 2');
    setShopAddress('near axis band , pilar no 69');
    setState('delhi');
    setCity('delhi');
    setpincode(262401);
  };

  console.log('date-----', date);
  const handleNextStep = () => {
    setCurrentStep(prevStep => Math.min(prevStep + 1, stepCount - 1));
  };

  const handlePreviousStep = () => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 0));
  };

  const handleDateChange = (event, selectedDate) => {
    console.log('selectedDate and event', event, selectedDate);
    const currentDate = selectedDate;
    setShowPicker(false);
    setDate(currentDate);
  };

  const handlePress = () => {
    setShowPicker(true);
  };

  const PersonalDetailVerification = async () => {
    setButtonLoading(true);
    let PersonalDetailObj = {
      firstName: Firstname,
      lastName: Lastname,
      DOB: formattedDate,
      email: emailId,
      gender: gender,
      alternateNumber: alternateNumber.toString(),
      shopsDetails: {
        shopName: shopName,
        shopLocation: shopLocation,
        shopFullAddress: shopAddress,
        city: city,
        pin: pincode,
        state: state,
      },
      location: {
        type: 'Point',
        coordinates: [latitude, longitude],
      },
    };
    console.log('====PersonalDetailObj====', PersonalDetailObj);
    const res = await PersonlDetialVerification(PersonalDetailObj);
    if (res?.data) {
      setButtonLoading(false);
      console.log('response of PersonalDetailVerification===> :', res?.data);
      if (res.data.status) {
        if (res.data.message == 'Profile Updated successfully') {
          Toast.show('Profile Updated successfully', Toast.LONG);
          dispatch(setCurrentStep(1));
        }
        // navigation.replace('Registration');
      }
    } else {
      setButtonLoading(false);
      Toast.show(res?.response?.data?.message, Toast.SHORT, {
        backgroundColor: 'blue',
      });
      console.log('catch error of PersonalDetailVerification ===>:', res);
      console.log(
        'catch error(response.message) of  PersonalDetailVerification:',
        res?.response?.data?.message,
      );
    }
  };

  const GetCurrentLocation = async () => {
    const res = await handleGetNotificationCount();
    console.log(
      '++++++++++++++++++++++++++++==res of GetNotificationCount====>',
      res.data,
    );
    if (res.data.status) {
      setNotificationCount(res.data.count);
    } else {
      console.log('error==', res);
    }
  };

  return (
    <View style={{paddingBottom: 30}}>
      <KeyboardAvoidingView>
        <TouchableOpacity
          onPress={getCurrentLocation}
          style={{
            height: '4.3%',
            // width: '100%',
            // backgroundColor: 'red',
            marginHorizontal: 20,
            borderColor: Colors.purple,
            borderWidth: 0.5,
            borderRadius: 6,
            // paddingHorizontal: 30,
            // marginVertical: 15,
            color: 'black',
            marginTop: 8,
            // paddingVertical: 13,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
            // marginVertical: 10,
          }}>
          {currentLocationLoadingButton ? (
            <ActivityIndicator size={21} color={Color.Green_Top} />
          ) : (
            <Text style={{color: '#000', fontSize: 17}}>
              Use Current location
            </Text>
          )}
        </TouchableOpacity>
        {/* ..................First Name and Last Name.................... */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 10,
          }}>
          <Text style={{color: Colors.BLACK, fontWeight: 'bold'}}>
            First Name
          </Text>
          <Text
            style={{
              color: Colors.BLACK,
              right: width / 4.7,
              fontWeight: 'bold',
            }}>
            Last Name
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 5,
          }}>
          <TextInput
            placeholder="First name"
            value={Firstname}
            // isValid={true}
            // errors={true}
            onChangeText={text => {
              setfirstname(text);
            }}
            // onChangeText={text => {
            //   _validateMobileNumber(text);
            // }}
            placeholderTextColor={Colors.DARK_GRAY}
            style={{
              borderWidth: 1,
              borderColor: Colors.LIGHT_Gray,
              paddingHorizontal: 15,
              backgroundColor: Colors.WHITE,
              borderRadius: 4,
              width: '45%',
              height: '90%',
              color: Colors.BLACK,
            }}
          />
          <TextInput
            placeholder="Last name"
            value={Lastname}
            onChangeText={text => {
              setLastname(text);
            }}
            placeholderTextColor={Colors.DARK_GRAY}
            style={{
              borderWidth: 1,
              borderColor: Colors.LIGHT_Gray,
              borderRadius: 4,
              paddingHorizontal: 15,
              backgroundColor: Colors.WHITE,
              width: '45%',
              height: '90%',
              color: Colors.BLACK,
            }}
          />
        </View>

        {/* .....................Date of Birth............................. */}

        <View style={{marginHorizontal: 20, marginTop: 10}}>
          <Text style={{color: Colors.BLACK, fontWeight: 'bold'}}>
            Date of Birth
          </Text>
          <View
            style={{
              height: 45,
              borderWidth: 1,
              borderColor: Colors.LIGHT_Gray,
              borderRadius: 4,
              marginTop: 0,
              backgroundColor: Colors.WHITE,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

                marginHorizontal: 15,
                alignItems: 'center',
                top: 8,
              }}>
              <Text style={{color: Colors.BLACK}}>{formattedDate}</Text>
              <TouchableOpacity onPress={handlePress}>
                <FontAwesome5Icon
                  name="calendar-alt"
                  color="#a9a9a9"
                  size={28}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          {showPicker && (
            <DateTimePickerr
              value={date}
              mode="date"
              dateFormat="DD-MM-YYYY"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
              // onConfirm={handleConfirm}
              // onCancel={hideDatePicker}
            />
          )}
        </View>

        {/* .........................Gender................................. */}

        <View style={{marginHorizontal: 20, marginTop: 15}}>
          <Text style={{color: Colors.BLACK, fontWeight: 'bold'}}>Gender</Text>
          <TextInput
            placeholder="Gender"
            value={gender}
            onChangeText={text => {
              setGender(text);
            }}
            placeholderTextColor={Colors.DARK_GRAY}
            style={{
              borderWidth: 1,
              borderColor: Colors.LIGHT_Gray,
              borderRadius: 4,
              paddingHorizontal: 15,
              backgroundColor: Colors.WHITE,
              marginTop: 7,
              color: Colors.BLACK,
            }}
          />
        </View>

        {/* ...................................Email Id........................... */}

        <View style={{marginHorizontal: 20, marginTop: 15}}>
          <Text style={{color: Colors.BLACK, fontWeight: 'bold'}}>
            E-mail ID
          </Text>
          <TextInput
            placeholder="Email Id"
            value={emailId}
            onChangeText={text => {
              setemailId(text);
            }}
            placeholderTextColor={Colors.DARK_GRAY}
            style={{
              borderWidth: 1,
              borderColor: Colors.LIGHT_Gray,
              borderRadius: 4,
              paddingHorizontal: 15,
              backgroundColor: Colors.WHITE,
              marginTop: 7,
              color: Colors.BLACK,
            }}
          />
        </View>

        {/* ..........................................Mobile number.......................... */}

        <View style={{marginHorizontal: 20, marginTop: 15}}>
          <Text style={{color: Colors.BLACK, fontWeight: 'bold'}}>
            Mobile number
          </Text>
          <TextInput
            placeholder="Plese enter mobile number"
            value={mobileNumber?.toString()}
            onChangeText={text => {
              setMobileNumber(text);
            }}
            editable={false}
            placeholderTextColor={Colors.DARK_GRAY}
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              borderColor: Colors.LIGHT_Gray,
              borderRadius: 4,
              paddingHorizontal: 15,
              backgroundColor: Colors.WHITE,
              marginTop: 7,
              color: Colors.BLACK,
            }}
          />
        </View>

        {/* ..........................................Mobile Alternate number.......................... */}

        <View style={{marginHorizontal: 20, marginTop: 15}}>
          <Text style={{color: Colors.BLACK, fontWeight: 'bold'}}>
            Alternate Mobile Number
          </Text>
          <TextInput
            maxLength={10}
            placeholder="Alternate mobile number"
            value={alternateNumber.toString()}
            onChangeText={text => {
              setAlternatNumber(text);
            }}
            placeholderTextColor={Colors.DARK_GRAY}
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              borderColor: Colors.LIGHT_Gray,
              borderRadius: 4,
              paddingHorizontal: 15,
              backgroundColor: Colors.WHITE,
              marginTop: 7,
              color: Colors.BLACK,
            }}
          />
        </View>

        {/* ..........................................Shop full Address.......................... */}
        <View style={{marginHorizontal: 20, marginTop: 15}}>
          <Text style={{color: Colors.BLACK, fontWeight: 'bold'}}>
            Shop Name
          </Text>
          <TextInput
            value={shopName}
            onChangeText={text => {
              setShopName(text);
            }}
            placeholder="shop name"
            placeholderTextColor={Colors.DARK_GRAY}
            style={{
              borderWidth: 1,
              borderColor: Colors.LIGHT_Gray,
              borderRadius: 4,
              paddingHorizontal: 15,
              backgroundColor: Colors.WHITE,
              marginTop: 7,
              color: Colors.BLACK,
            }}
          />
        </View>

        <View style={{marginHorizontal: 20, marginTop: 15}}>
          <Text style={{color: Colors.BLACK, fontWeight: 'bold'}}>
            Location
          </Text>
          <TextInput
            placeholder=" Shop Loacation"
            value={shopLocation}
            onChangeText={text => {
              setShopLocation(text);
            }}
            placeholderTextColor={Colors.DARK_GRAY}
            style={{
              borderWidth: 1,
              borderColor: Colors.LIGHT_Gray,
              borderRadius: 4,
              paddingHorizontal: 15,
              backgroundColor: Colors.WHITE,
              marginTop: 7,
              color: Colors.BLACK,
            }}
          />
        </View>
        <View style={{marginHorizontal: 20, marginTop: 15}}>
          <Text style={{color: Colors.BLACK, fontWeight: 'bold'}}>
            Shop full Address
          </Text>
          <TextInput
            placeholder=" Shop Address"
            value={shopAddress}
            onChangeText={text => {
              setShopAddress(text);
            }}
            placeholderTextColor={Colors.DARK_GRAY}
            style={{
              borderWidth: 1,
              borderColor: Colors.LIGHT_Gray,
              borderRadius: 4,
              paddingHorizontal: 15,
              backgroundColor: Colors.WHITE,
              marginTop: 7,
              color: Colors.BLACK,
            }}
          />
        </View>

        {/* ..........................................State......................................... */}
        <View style={{marginHorizontal: 20, marginTop: 15}}>
          <Text style={{color: Colors.BLACK, fontWeight: 'bold'}}>State</Text>
          <TextInput
            editable={false}
            placeholder="State"
            value={state}
            onChangeText={text => {
              setState(text);
            }}
            placeholderTextColor={Colors.DARK_GRAY}
            style={{
              borderWidth: 1,
              borderColor: Colors.LIGHT_Gray,
              borderRadius: 4,
              paddingHorizontal: 15,
              backgroundColor: Colors.WHITE,
              marginTop: 7,
              color: Colors.BLACK,
            }}
          />

          {/* <Dropdown
          style={[Styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={Styles.placeholderStyle}
          selectedTextStyle={Styles.selectedTextStyle}
          inputSearchStyle={Styles.inputSearchStyle}
          iconStyle={Styles.iconStyle}
          data={statedata}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={Styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        /> */}
        </View>

        {/* ..................Permanent address City Name and Pincode.................... */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 10,
          }}>
          <Text style={{color: Colors.BLACK, fontWeight: 'bold'}}>City</Text>
          <Text
            style={{
              color: Colors.BLACK,
              right: width / 4.7,
              fontWeight: 'bold',
            }}>
            Pincode
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 10,
          }}>
          <TextInput
            editable={false}
            // keyboardType=""
            placeholder="City"
            onChangeText={text => {
              setCity(text);
            }}
            value={city}
            placeholderTextColor={Colors.DARK_GRAY}
            style={{
              borderWidth: 1,
              borderColor: Colors.LIGHT_Gray,
              paddingHorizontal: 15,
              backgroundColor: Colors.WHITE,
              borderRadius: 4,
              width: '45%',
              height: '90%',
              color: Colors.BLACK,
            }}
          />

          <TextInput
            editable={false}
            placeholder="Pin Code"
            value={pincode.toString()}
            onChangeText={text => {
              setpincode(text);
            }}
            maxLength={6}
            placeholderTextColor={Colors.DARK_GRAY}
            style={{
              borderWidth: 1,
              borderColor: Colors.LIGHT_Gray,
              borderRadius: 4,
              paddingHorizontal: 15,
              backgroundColor: Colors.WHITE,
              width: '45%',
              height: '90%',
              color: Colors.BLACK,
            }}
          />
        </View>
        <View style={{paddingHorizontal: 20, marginTop: 15}}>
          <Custombtn
            title={'NEXT'}
            color={'#ffff'}
            onPress={() => {
              PersonalDetailVerification();
            }}
            loadingColor={'#ffff'}
            loadingSize={27}
            loading={buttonLoading}
          />
        </View>
        {/* <TouchableOpacity
        onPress={() => personalDetail()}
        style={{
          backgroundColor: 'purple',
          height: responsiveHeight(2),
          width: responsiveWidth(90),
        }}>
      </TouchableOpacity> */}
      </KeyboardAvoidingView>
    </View>
  );
}

const Styles = StyleSheet.create({
  docTitle: {
    margin: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  stepContentContainer: {
    paddingBottom: 90,
  },
});
