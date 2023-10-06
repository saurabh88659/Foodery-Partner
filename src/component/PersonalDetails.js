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

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {he} from 'date-fns/locale';
const {height, width} = Dimensions.get('window');
var query = require('india-pincode-search');

export default function PersonalDetails({route}) {
  // const mobile = route.params.phoneNumber;
  //console.log('my phone is.............', mobile);
  const [currentStep, setCurrentStep] = useState(0);
  const [date, setDate] = useState(new Date());
  const [mobileNumber, setMobileNumber] = useState('');
  const [alternateNumber, setAlternatNumber] = useState('');

  const [showPicker, setShowPicker] = useState(false);
  const formattedDate = format(date, 'dd/MM/yyyy');

  const handleNextStep = () => {
    setCurrentStep(prevStep => Math.min(prevStep + 1, stepCount - 1));
  };

  const handlePreviousStep = () => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 0));
  };

  // useEffect(() => {
  //   var currentDate = new Date();
  //   // var day = new Date().getDate(); //Current Date
  //   // var month = new Date().getMonth() + 1; //Current Month
  //   // var year = new Date().getFullYear(); //Current Year
  //   var day = currentDate.getDate();
  //   var month = currentDate.getMonth() + 1; // Add 1 to get the correct month
  //   var year = currentDate.getFullYear();

  //   var formattedDate = `${day}/${month}/${year}`;

  //   setDate(formattedDate);
  // }, []);

  const handleSubmit = () => {
    // Handle form submission here
    // For example, you can call an API or save the form data
    alert('Form submitted successfully!');
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const handlePress = () => {
    setShowPicker(true);
  };

  const [Firstname, setfirstname] = useState('');
  const [Lastname, setLastname] = useState('');

  const [gender, setGender] = useState('');

  const [emailId, setemailId] = useState('');
  const [shopName, setShopName] = useState('');
  const [shopLocation, setShopLocation] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  // .................................state...................................

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

  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  //11111............................................City ........................................................

  const [cityvalue, setCityValue] = useState('');

  //22222............................................City ........................................................

  //....................................Pincode..........................

  const [pincode, setpincode] = useState(null);

  const fetchLocationInfo = () => {
    const CollectData = query.search(`${pincode}`);

    if (CollectData[0] == null) {
      ToastAndroid.show('Please Enter Correct Pincode', ToastAndroid.LONG);
    } else {
      setCityValue(CollectData[0].city);
      console.log('data', CollectData);
    }
  };

  const personalDetail = async () => {
    // if (!accountHolder || !bankAccount || !ifscCode || !bankName) {
    //   Alert.alert('Please fill all the fields!');
    //   return console.log('No field is filled up'); // do whatever you want to display
    // }
    const token = await AsyncStorage.getItem('token');
    console.log(
      token,
      '---------->i am token mai hu tokennnnnnnnnnnnnnnnnnnnnnnnnnn',
    );
    const mobnumber = await AsyncStorage.getItem('phone');
    console.log(
      mobnumber,
      '---------->i ammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm mobNuberqqq',
    );

    const axiosConfig = {
      Authorization: `Bearer ${token}`,
    };

    let Personal = {
      firstName: Firstname,
      lastName: Lastname,
      DOB: '03/04/1999',
      email: emailId,
      gender: gender,

      alternateNumber: alternateNumber,
      shopsDetails: {
        shopName: shopName,
        shopLocation: shopLocation,
        shopFullAddress: shopAddress,
        city: cityvalue,
        pin: pincode,
        state: value,
      },
    };
    console.log('personal-------->', Personal);

    try {
      const resp = await axios({
        url: 'http://192.168.68.123:8000/api/vendor/signUpVendorApp',
        headers: axiosConfig,
        data: Personal,
        method: 'PUT',
      });
      console.log('resp--->>>', resp.data);
    } catch (error) {
      console.log('errrr----->>>', error.response?.data);
      //Toast.show(error.response?.data);
    }
  };
  return (
    <View>
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
            color: Colors.black,
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
          // isValid={false}
          // errors={false}
          onChangeText={text => {
            setfirstname(text);
          }}
          // onChangeText={text => {
          //   _validateMobileNumber(text);
          // }}
          placeholderTextColor={Colors.darkGray}
          style={{
            borderWidth: 1,
            borderColor: Colors.lightGray,
            paddingHorizontal: 15,
            backgroundColor: Colors.white,
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
            borderColor: Colors.lightGray,
            borderRadius: 4,
            paddingHorizontal: 15,
            backgroundColor: Colors.white,
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
            borderColor: Colors.lightGray,
            borderRadius: 4,
            marginTop: 0,
            backgroundColor: Colors.white,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',

              marginHorizontal: 15,
              alignItems: 'center',
              top: 8,
            }}>
            <Text style={{color: Colors.black}}>{formattedDate}</Text>
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
          />
        )}
      </View>

      {/* .........................Gender................................. */}

      <View style={{marginHorizontal: 20, marginTop: 15}}>
        <Text style={{color: Colors.black, fontWeight: 'bold'}}>Gender</Text>
        <TextInput
          placeholder="Gender"
          value={gender}
          onChangeText={text => {
            setGender(text);
          }}
          placeholderTextColor={Colors.darkGray}
          style={{
            borderWidth: 1,
            borderColor: Colors.lightGray,
            borderRadius: 4,
            paddingHorizontal: 15,
            backgroundColor: Colors.white,
            marginTop: 7,
            color: Colors.black,
          }}
        />
      </View>

      {/* ...................................Email Id........................... */}

      <View style={{marginHorizontal: 20, marginTop: 15}}>
        <Text style={{color: Colors.black, fontWeight: 'bold'}}>E-mail ID</Text>
        <TextInput
          placeholder="Plese enter Email Id"
          value={emailId}
          onChangeText={text => {
            setemailId(text);
          }}
          placeholderTextColor={Colors.darkGray}
          style={{
            borderWidth: 1,
            borderColor: Colors.lightGray,
            borderRadius: 4,
            paddingHorizontal: 15,
            backgroundColor: Colors.white,
            marginTop: 7,
            color: Colors.black,
          }}
        />
      </View>

      {/* ..........................................Mobile number.......................... */}

      <View style={{marginHorizontal: 20, marginTop: 15}}>
        <Text style={{color: Colors.black, fontWeight: 'bold'}}>
          Mobile number
        </Text>
        <TextInput
          placeholder="Plese enter mobile number"
          value={mobileNumber}
          onChangeText={text => {
            setMobileNumber(text);
          }}
          placeholderTextColor={Colors.darkGray}
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            borderColor: Colors.lightGray,
            borderRadius: 4,
            paddingHorizontal: 15,
            backgroundColor: Colors.white,
            marginTop: 7,
            color: Colors.black,
          }}
        />
      </View>

      {/* ..........................................Mobile Alternate number.......................... */}

      <View style={{marginHorizontal: 20, marginTop: 15}}>
        <Text style={{color: Colors.black, fontWeight: 'bold'}}>
          Alternate Mobile Number
        </Text>
        <TextInput
          // placeholder="Plese enter mobile number"
          value={alternateNumber}
          onChangeText={text => {
            setAlternatNumber(text);
          }}
          placeholderTextColor={Colors.darkGray}
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            borderColor: Colors.lightGray,
            borderRadius: 4,
            paddingHorizontal: 15,
            backgroundColor: Colors.white,
            marginTop: 7,
            color: Colors.black,
          }}
        />
      </View>

      {/* ..........................................Shop full Address.......................... */}
      <View style={{marginHorizontal: 20, marginTop: 15}}>
        <Text style={{color: Colors.black, fontWeight: 'bold'}}>Shop Name</Text>
        <TextInput
          value={shopName}
          onChangeText={text => {
            setShopName(text);
          }}
          placeholderTextColor={Colors.darkGray}
          style={{
            borderWidth: 1,
            borderColor: Colors.lightGray,
            borderRadius: 4,
            paddingHorizontal: 15,
            backgroundColor: Colors.white,
            marginTop: 7,
            color: Colors.black,
          }}
        />
      </View>

      <View style={{marginHorizontal: 20, marginTop: 15}}>
        <Text style={{color: Colors.black, fontWeight: 'bold'}}>Location</Text>
        <TextInput
          value={shopLocation}
          onChangeText={text => {
            setShopLocation(text);
          }}
          placeholderTextColor={Colors.darkGray}
          style={{
            borderWidth: 1,
            borderColor: Colors.lightGray,
            borderRadius: 4,
            paddingHorizontal: 15,
            backgroundColor: Colors.white,
            marginTop: 7,
            color: Colors.black,
          }}
        />
      </View>
      <View style={{marginHorizontal: 20, marginTop: 15}}>
        <Text style={{color: Colors.black, fontWeight: 'bold'}}>
          Shop full Address
        </Text>
        <TextInput
          value={shopAddress}
          onChangeText={text => {
            setShopAddress(text);
          }}
          placeholderTextColor={Colors.darkGray}
          style={{
            borderWidth: 1,
            borderColor: Colors.lightGray,
            borderRadius: 4,
            paddingHorizontal: 15,
            backgroundColor: Colors.white,
            marginTop: 7,
            color: Colors.black,
          }}
        />
      </View>

      {/* ..........................................State......................................... */}

      <View style={{marginHorizontal: 20, marginTop: 15}}>
        <Text style={{color: Colors.black, fontWeight: 'bold'}}>State</Text>

        <Dropdown
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
        />
      </View>

      {/* ..................Permanent address City Name and Pincode.................... */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          marginTop: 10,
        }}>
        <Text style={{color: Colors.black, fontWeight: 'bold'}}>City</Text>
        <Text
          style={{
            color: Colors.black,
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
          marginTop: 5,
        }}>
        <TextInput
          placeholder="City"
          onChangeText={text => {
            setCityValue(text);
          }}
          value={cityvalue}
          placeholderTextColor={Colors.darkGray}
          style={{
            borderWidth: 1,
            borderColor: Colors.lightGray,
            paddingHorizontal: 15,
            backgroundColor: Colors.white,
            borderRadius: 4,
            width: '45%',
            height: '90%',
            color: Colors.black,
          }}
        />

        <TextInput
          placeholder="Pin Code"
          value={pincode}
          onChangeText={text => {
            setpincode(text);
          }}
          maxLength={6}
          onBlur={fetchLocationInfo}
          placeholderTextColor={Colors.darkGray}
          style={{
            borderWidth: 1,
            borderColor: Colors.lightGray,
            borderRadius: 4,
            paddingHorizontal: 15,
            backgroundColor: Colors.white,
            width: '45%',
            height: '90%',
            color: Colors.black,
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => personalDetail()}
        style={{
          backgroundColor: 'purple',
          height: responsiveHeight(2),
          width: responsiveWidth(90),
        }}>
        <Text>hiiii</Text>
      </TouchableOpacity>
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
