import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Color from '../Utils/Color';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import CustomButton from '../component/CustomButton/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {BottomSheet} from 'react-native-btr';
import {useIsFocused} from '@react-navigation/native';
import {
  setAdminIsAccepted,
  setUserData,
} from '../features/requireDataReducer/requiredata.reducer';
import {
  handleGetAllproductCategory,
  handleUpdateProfilePic,
  handleUserGetData,
} from '../features/APIs/apiRequest';
import Toast from 'react-native-simple-toast';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export default function EditProfile({navigation}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const userData = useSelector(state => state.requiredata.userData);
  console.log('userData on edit profile=====>>', JSON.stringify(userData));
  const [text, onChangeText] = React.useState('Amit kumar');
  const [text1, onChangeText1] = React.useState('10/08/1989');
  const [text2, onChangeText2] = React.useState('Vmart');
  const [text3, onChangeText3] = React.useState('Lakshmi Nagar');
  const [text4, onChangeText4] = React.useState('Delhi');
  const [profileData, setProfileData] = useState('');
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrlPath, setImageUrlPath] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [profileUrl, setProfileUrl] = useState('');

  // useEffect(() => {
  //   if (isFocused || profileUrl) {
  //     getUserData();
  //     console.log('+======================run run run');
  //   }
  // }, [isFocused || profileUrl]);

  const getUserData = async () => {
    console.log('+++++okay---->>');
    const res = await handleUserGetData();
    console.log(
      'res.data of getUserData at Mainstack ====>',
      JSON.stringify(res.data.result),
    );
    if (res.data.success) {
      if (res.data.result) {
        dispatch(setUserData(res.data.result));
      }
    } else {
      console.log('getUserData error ==>', res);
    }
  };

  const onGallary = () => {
    console.log('=====onGallary=====');
    ImagePicker.openPicker({
      cropping: true,
      quality: 0.6,
      mediaType: 'any',
    })
      .then(async image => {
        console.log('image.path', image);
        setImageUrlPath(image.path);
        setImageData(image);
        setVisible(!visible);
      })
      .catch(err => {
        console.log('Img picker Error--->>>', err);
      });
  };

  const onCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      mediaType: 'any',
      width: 300,
      height: 400,
    })
      .then(image => {
        setImageUrlPath(image.path);
        setImageData(image);
        setVisible(!visible);
        console.log('hey', image);
      })
      .catch(err => {
        console.log('Img picker Error--->>>', err);
      });
  };

  const UpdateProfilePic = async () => {
    setIsLoading(true);
    var filename = imageData?.path?.replace(/^.*[\\\/]/, '');
    console.log('=======filename=====', filename);
    const profilePic = new FormData();
    profilePic.append('image', {
      name: filename,
      type: imageData.mime,
      uri: imageData.path,
    });

    console.log('profile pic====>', JSON.stringify(profilePic));
    const res = await handleUpdateProfilePic(profilePic);
    if (res.data.status) {
      console.log('++=UpdateProfilePic res2 =====>', res.data);
      setImageData(null);
      setProfileUrl(res?.data?.profileImageUrl);
      getUserData();
      setImageUrlPath(null);
      setIsLoading(false);
      Toast.show(res.data.message, Toast.SHORT);
    } else {
      console.log('UpdateProfilePic error===', res);
    }
  };

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor={Color.Green_Top} />
      {/* -------------------------header--------------------------- */}
      <View style={styles.header}>
        <View style={styles.one}></View>

        <View style={styles.main}>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={toggleBottomNavigationView}>
              <ImageBackground
                source={require('../Assests/Images/profilePicture123.png')}
                style={styles.imagebox}>
                {
                  userData || imageUrlPath ? (
                    <Image
                      source={
                        imageUrlPath
                          ? {uri: imageUrlPath}
                          : {uri: userData.profileImageUrl}
                      }
                      style={{
                        width: responsiveWidth(27),
                        height: responsiveWidth(27),
                        borderRadius: responsiveWidth(32),
                        resizeMode: 'cover',
                        alignSelf: 'center',
                      }}
                    />
                  ) : null
                  // <Image source={{uri: imageUrlPath}} />
                }
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.one}></View>
      </View>
      {/* ------------------------------body------------------------------ */}
      <TouchableOpacity activeOpacity={1} style={styles.card}>
        <Icon name="user" color={Color.DARK_PURPLE} size={18} />
        <TextInput
          editable={false}
          style={{
            //backgroundColor: 'skyblue',
            width: responsiveWidth(72),
            height: responsiveHeight(5),
            marginLeft: 2,
            padding: 5,
            color: Color.BLACK,
          }}
          onChangeText={onChangeText}
          value={userData.firstName + ' ' + userData.lastName}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} style={styles.card1}>
        <Icon name="gift" color={Color.DARK_PURPLE} size={19} />
        <TextInput
          editable={false}
          style={{
            //backgroundColor: 'skyblue',
            width: responsiveWidth(72),
            height: responsiveHeight(5),
            marginLeft: 2,
            padding: 5,
            color: Color.BLACK,
          }}
          onChangeText={onChangeText1}
          value={new Date(userData.DOB).toDateString()}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} style={styles.card1}>
        <Icon name="building" color={Color.DARK_PURPLE} size={19} />
        <TextInput
          editable={false}
          style={{
            //backgroundColor: 'skyblue',
            width: responsiveWidth(72),
            height: responsiveHeight(5),
            marginLeft: 2,
            padding: 5,
            color: Color.BLACK,
          }}
          onChangeText={onChangeText2}
          value={userData.shopsDetails.state}
        />
      </TouchableOpacity>

      {/* <TouchableOpacity activeOpacity={1} style={styles.card1}>
        <Icon name="map-marked-alt" color={Color.DARK_PURPLE} size={19} />

        <TextInput
          editable={false}
          style={{
            //backgroundColor: 'skyblue',
            width: responsiveWidth(72),
            height: responsiveHeight(5),
            marginLeft: 2,
            padding: 5,
            color: Color.BLACK,
          }}
          onChangeText={onChangeText3}
          value={userData.shopsDetails.shopFullAddress}
        />
      </TouchableOpacity> */}

      <TouchableOpacity activeOpacity={1} style={styles.card1}>
        <MaterialIcons
          name="location-city"
          color={Color.DARK_PURPLE}
          size={19}
        />
        <TextInput
          editable={false}
          style={{
            //backgroundColor: 'skyblue',
            width: responsiveWidth(72),
            height: responsiveHeight(5),
            marginLeft: 2,
            padding: 5,
            color: Color.BLACK,
          }}
          onChangeText={onChangeText4}
          value={userData.shopsDetails.city}
        />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={1} style={styles.card1}>
        <FontAwesome6 name="location-dot" color={Color.DARK_PURPLE} size={19} />
        <TextInput
          editable={false}
          style={{
            //backgroundColor: 'skyblue',
            width: responsiveWidth(72),
            height: responsiveHeight(5),
            marginLeft: 2,
            padding: 5,
            color: Color.BLACK,
          }}
          onChangeText={onChangeText4}
          value={userData.shopsDetails.pin.toString()}
        />
      </TouchableOpacity>

      {/* <TouchableOpacity activeOpacity={1} style={styles.card1}>
        <FontAwesome name="bank" color={Color.DARK_PURPLE} size={19} />
        <TextInput
          editable={false}
          style={{
            //backgroundColor: 'skyblue',
            width: responsiveWidth(72),
            height: responsiveHeight(5),
            marginLeft: 2,
            padding: 5,
            color: Color.BLACK,
          }}
          onChangeText={onChangeText4}
          value={'Change Your Bank Details'}
        />
        <TouchableOpacity>
          <FontAwesome name="pencil-square-o" color={Color.BLACK} size={19} />
        </TouchableOpacity>
      </TouchableOpacity> */}
      {imageData && (
        <CustomButton
          Title={'Save Changes'}
          onPress={UpdateProfilePic}
          style={styles.btnStyle}
          loading={isLoading}
          loadingColor={'#fff'}
          loadingSize={26}
        />
      )}
      {/* <CustomButton
        Title={'Change Your Bank Details'}
        //onPress={() => navigation.navigate('Store')}
        style={styles.btnStyle}
      /> */}

      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}>
        <View style={styles.bottomNavigationView}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                color: Color.BLACK,
                fontSize: 20,
                fontWeight: '500',
                top: 20,
              }}>
              Upload Photo
            </Text>
            <Text
              style={{
                color: Color.DARK_GRAY,
                fontSize: 15,
                top: 25,
              }}>
              Choose Your Profile Picture
            </Text>
          </View>
          <TouchableOpacity
            onPress={onCamera}
            style={{
              backgroundColor: Color.Green_Top,
              height: 50,
              top: 40,
              marginHorizontal: 20,
              borderRadius: 7,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{color: Color.WHITE, fontSize: 17, fontWeight: 'bold'}}>
              Take Photos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onGallary}
            style={{
              backgroundColor: Color.Green_Top,
              height: 50,
              marginHorizontal: 20,
              borderRadius: 7,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 50,
            }}>
            <Text
              style={{color: Color.WHITE, fontSize: 17, fontWeight: 'bold'}}>
              Choose From Gellery
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            style={{
              backgroundColor: Color.Green_Top,
              height: 50,
              marginHorizontal: 20,
              borderRadius: 7,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{color: Color.WHITE, fontSize: 17, fontWeight: 'bold'}}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Color.BG,
  },
  header: {
    height: responsiveHeight(18),
    width: responsiveWidth(100),
    backgroundColor: Color.Green_Top,
    flexDirection: 'row',
  },
  one: {
    height: responsiveHeight(20),
    width: responsiveWidth(15),
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: responsiveHeight(5),
    // backgroundColor: 'red',
  },
  main: {
    height: responsiveHeight(20),
    width: responsiveWidth(70),
    //backgroundColor: 'blue',
  },

  card: {
    marginHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1),
    flexDirection: 'row',
    elevation: 1,
    marginTop: responsiveHeight(11.5),
    paddingLeft: responsiveWidth(5),
    backgroundColor: Color.WHITE,
    alignItems: 'center',
  },
  card1: {
    marginHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1),
    flexDirection: 'row',
    elevation: 1,
    marginTop: responsiveHeight(1),
    paddingLeft: responsiveWidth(5),
    backgroundColor: Color.WHITE,
    alignItems: 'center',
  },
  texting: {
    color: Color.BLACK,
    fontSize: responsiveFontSize(2),
    textAlignVertical: 'center',
    marginLeft: 10,
  },
  btnStyle: {
    backgroundColor: Color.Green_Top,
    height: responsiveHeight(6),
    width: responsiveWidth(80),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(2),
    // borderWidth: 1,
    // borderColor:Color.Green_Top,
    marginTop: responsiveHeight(2),
  },
  imagebox: {
    borderWidth: 1,
    height: responsiveWidth(28),
    width: responsiveWidth(28),
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 0,
    borderColor: 'grey',
    backgroundColor: 'white',
    // borderColor: 'grey',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },

  imageContainer: {
    height: responsiveWidth(32),
    width: responsiveWidth(32),
    backgroundColor: Color.WHITE,
    alignSelf: 'center',
    borderRadius: responsiveWidth(32),
    marginTop: responsiveHeight(8),
    borderWidth: 10,
    borderColor: Color.Green_Top,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 280,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
