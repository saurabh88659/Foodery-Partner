import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useEffect} from 'react';
import Color from '../Utils/Color';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import CustomButton from '../component/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setLoggedIn} from '../features/auth/auth.reducer';
import {handleGetAllOutOfStock} from '../features/APIs/apiRequest';
import {set} from 'date-fns';
import AllProductCategory from './AllProductCategory';
import {setDesireFunctionKey} from '../features/requireDataReducer/requiredata.reducer';

export default function Profile({}) {
  const userData = useSelector(state => state.requiredata.userData);

  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = React.useState(false);
  const navigation = useNavigation();

  const handleLogout = async () => {
    console.log('hello');
    await AsyncStorage.clear();
    dispatch(setLoggedIn(false));
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor={Color.Green_Top} />
      {/* -------------------------header--------------------------- */}
      <View style={styles.header}>
        <View style={styles.one}></View>
        <View style={styles.main}>
          {/* <View style={styles.imageContainer}></View> */}
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require('../Assests/Images/profilePicture123.png')}
              style={styles.imagebox}>
              {userData?.profileImageUrl ? (
                <Image
                  source={{uri: userData?.profileImageUrl}}
                  style={{
                    width: responsiveWidth(27),
                    height: responsiveWidth(27),
                    borderRadius: responsiveWidth(32),
                    resizeMode: 'cover',
                    alignSelf: 'center',
                  }}
                />
              ) : null}
            </ImageBackground>
          </View>
        </View>
        <TouchableOpacity
          style={styles.one}
          onPress={() => navigation.navigate('EditProfile')}>
          <Icon name="edit" color={'white'} size={18} />
        </TouchableOpacity>
      </View>

      {/* ------------------------------body------------------------------ */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Wallet')}>
        <Icon name="edit" color={Color.DARK_PURPLE} size={18} />
        <Text style={styles.texting}>Wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card1}
        // onPress={() => navigation.navigate('Order')}>
        onPress={() => navigation.navigate('Booking')}>
        <MaterialCommunityIcons
          name="calendar-text-outline"
          color={Color.DARK_PURPLE}
          size={19}
        />
        <Text style={styles.texting}>My Order</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card1}
        onPress={() => navigation.navigate('AllOutofStockProductScreen')}>
        <MaterialCommunityIcons
          name="cube-off-outline"
          color={Color.DARK_PURPLE}
          size={19}
        />
        <Text style={styles.texting}>Out Of stock Items</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card1}
        onPress={() => {
          navigation.navigate('AllProductCategory'),
            dispatch(setDesireFunctionKey(true));
        }}>
        <FontAwesome5 name="plus-square" color={Color.DARK_PURPLE} size={19} />
        <Text style={styles.texting}>Add Products</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card1}
        onPress={() => navigation.navigate('About')}>
        <MaterialCommunityIcons
          name="alert-circle"
          color={Color.DARK_PURPLE}
          size={19}
        />
        <Text style={styles.texting}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card1}
        onPress={() => navigation.navigate('Terms')}>
        <MaterialCommunityIcons
          name="clipboard-list"
          color={Color.DARK_PURPLE}
          size={19}
        />
        <Text style={styles.texting}>Terms & Condition</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card1}
        onPress={() => navigation.navigate('Privacy')}>
        <MaterialIcons
          name="verified-user"
          color={Color.DARK_PURPLE}
          size={19}
        />
        <Text style={styles.texting}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card1} onPress={toggleModal}>
        <MaterialCommunityIcons
          name="logout"
          color={Color.DARK_PURPLE}
          size={19}
        />
        <Text style={styles.texting}>Logout</Text>
      </TouchableOpacity>
      {/* /--------------------------------------Modal------------------------------/ */}

      <Modal
        isVisible={isModalVisible}
        swipeDirection="left"
        animationType="slide"
        transparent={true}>
        <View
          style={{
            backgroundColor: Color.WHITE,
            width: responsiveWidth(90),
            height: responsiveHeight(20),
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
            // marginVertical: 50,
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(2.3),
              color: Color.BLACK,
              marginTop: responsiveHeight(2),
              fontWeight: 'bold',
            }}>
            Are You sure you want to logout?
          </Text>

          <View
            style={{
              width: responsiveWidth(80),
              height: responsiveHeight(7),
              //backgroundColor: Color.WHITE,
              // marginTop: responsiveHeight(2),
              flexDirection: 'row',
              // justifyContent: 'space-evenly',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: responsiveHeight(3),
              // marginHorizontal: responsiveWidth(8),
              // marginHorizontal,
              paddingHorizontal: 15,
            }}>
            <CustomButton
              Title={'Yes'}
              onPress={() => handleLogout()}
              style={styles.btnStyle}
            />
            <CustomButton
              Title={'No'}
              onPress={() => toggleModal(false)}
              style={styles.btnStyle}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Color.BG,
  },
  header: {
    height: responsiveHeight(16),
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
  },

  main: {
    height: responsiveHeight(20),
    width: responsiveWidth(70),
    // backgroundColor: 'blue',
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
  },
  card: {
    marginHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
    flexDirection: 'row',
    elevation: 1,
    marginTop: responsiveHeight(11.5),
    paddingLeft: responsiveWidth(5),
    backgroundColor: Color.WHITE,
  },
  card1: {
    marginHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
    flexDirection: 'row',
    elevation: 1,
    marginTop: responsiveHeight(1),
    paddingLeft: responsiveWidth(5),
    backgroundColor: Color.WHITE,
  },
  texting: {
    color: Color.BLACK,
    fontSize: responsiveFontSize(2),
    textAlignVertical: 'center',
    marginLeft: 10,
  },
  btnStyle: {
    backgroundColor: Color.Green_Top,
    height: responsiveHeight(5),
    width: responsiveWidth(32),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(2),
    borderColor: Color.Green_Top,
    borderWidth: 1,
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
});
