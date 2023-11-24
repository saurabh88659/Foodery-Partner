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
import {PersonlDetialVerification} from '../features/APIs/apiRequest';
import {getAuthHeaders} from '../features/commonservice';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentStep} from '../features/requireDataReducer/requiredata.reducer';
const {height, width} = Dimensions.get('window');
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
  const formattedDate = format(date, 'dd/MM/yyyy');

  console.log('formattedDate---->', formattedDate);
  // const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // develperModeOn();
  }, []);

  useEffect(() => {
    setMobileNumber(userPhoneNUmber);
  }, []);

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

  const handleSubmit = () => {
    // Handle form submission here
    // For example, you can call an API or save the form data
    alert('Form submitted successfully!');
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

  //.................................state...................................

  const statedata = [
    {label: 'Andhra Pradesh', value: '1'},
    {label: 'Arunachal Pradesh', value: '2'},
    {label: 'Assam', value: '3'},
    {label: 'Bihar', value: '4'},
    {label: 'Chhattisgarh', value: '5'},
    {label: 'Goa', value: '6'},
    {label: 'Gujarat', value: '7'},
    {label: 'Haryana', value: '8'},
    {label: 'Himachal Pradesh', value: '9'},
    {label: 'Jharkhand', value: '10'},
    {label: 'Karnataka', value: '11'},
    {label: 'Kerala', value: '12'},
    {label: 'Madhya Pradesh', value: '13'},
    {label: 'Maharashtra', value: '14'},
    {label: 'Manipur', value: '15'},
    {label: 'Meghalaya', value: '16'},
    {label: 'Mizoram', value: '17'},
    {label: 'Nagaland', value: '18'},
    {label: 'Odisha', value: '19'},
    {label: 'Punjab', value: '20'},
    {label: 'Rajasthan', value: '21'},
    {label: 'Sikkim', value: '22'},
    {label: 'Tamil Nadu', value: '23'},
    {label: 'Telangana', value: '24'},
    {label: 'Tripura', value: '25'},
    {label: 'Uttar Pradesh', value: '26'},
    {label: 'Uttarakhand', value: '27'},
    {label: 'West Bengal', value: '28'},
  ];

  // const fetchLocationInfo = () => {
  //   const CollectData = query.search(`${pincode}`);

  //   if (CollectData[0] == null) {
  //     ToastAndroid.show('Please Enter Correct Pincode', ToastAndroid.LONG);
  //   } else {
  //     setCityValue(CollectData[0].city);
  //     console.log('data', CollectData);
  //   }
  // };

  // const personalDetail = async () => {
  //   // if (!accountHolder || !bankAccount || !ifscCode || !bankName) {
  //   //   Alert.alert('Please fill all the fields!');
  //   //   return console.log('No field is filled up'); // do whatever you want to display
  //   // }
  //   const token = await AsyncStorage.getItem('token');
  //   console.log(
  //     token,
  //     '---------->i am token mai hu tokennnnnnnnnnnnnnnnnnnnnnnnnnn',
  //   );
  //   const mobnumber = await AsyncStorage.getItem('phone');
  //   console.log(
  //     mobnumber,
  //     '---------->i ammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm mobNuberqqq',
  //   );

  //   const axiosConfig = {
  //     Authorization: `Bearer ${token}`,
  //   };

  //   console.log('personal-------->', Personal);

  //   try {
  //     const resp = await axios({
  //       url: 'http://192.168.68.123:8000/api/vendor/signUpVendorApp',
  //       headers: axiosConfig,
  //       data: Personal,
  //       method: 'PUT',
  //     });
  //     console.log('resp--->>>', resp.data);
  //   } catch (error) {
  //     console.log('errrr----->>>', error.response?.data);
  //     //Toast.show(error.response?.data);
  //   }
  // };

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
    };

    console.log('====PersonalDetailObj====', PersonalDetailObj);
    const res = await PersonlDetialVerification(PersonalDetailObj);
    if (res?.data) {
      setButtonLoading(false);
      console.log('response of PersonalDetailVerification===> :', res.data);
      if (res.data.status) {
        if (res.data.message == 'Profile Updated successfully') {
          Toast.show('Profile Updated successfully', Toast.LONG);
          dispatch(setCurrentStep(1));
        }
        // navigation.replace('Registration');
      }
    } else {
      setButtonLoading(false);
      Toast.show(res.response.data.message, Toast.SHORT, {
        backgroundColor: 'blue',
      });
      console.log('catch error of PersonalDetailVerification ===>:', res);
      console.log(
        'catch error(response.message) of  PersonalDetailVerification:',
        res?.response?.data?.message,
      );
    }
  };

  return (
    <View style={{paddingBottom: 30}}>
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
              <FontAwesome5Icon name="calendar-alt" color="#a9a9a9" size={28} />
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
        <Text style={{color: Colors.BLACK, fontWeight: 'bold'}}>E-mail ID</Text>
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
          value={mobileNumber.toString()}
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
        <Text style={{color: Colors.BLACK, fontWeight: 'bold'}}>Shop Name</Text>
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
        <Text style={{color: Colors.BLACK, fontWeight: 'bold'}}>Location</Text>
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