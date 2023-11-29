import {
  StyleSheet,
  Text,
  View,
  Pressable,
  BackHandler,
  TouchableOpacity,
} from 'react-native';

import React, {useState} from 'react';
import Modal from 'react-native-modal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setAdminIsAccepted} from '../features/requireDataReducer/requiredata.reducer';
import {setLoggedIn} from '../features/auth/auth.reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminAcceptedModal = ({onCancel}) => {
  const navigation = useNavigation();
  const adminIsAccepted = useSelector(
    state => state.requiredata.adminIsAccepted,
  );
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const exitAndRefreshApp = async () => {
    BackHandler.exitApp();
    // navigation.navigate('SplashScreen');
    dispatch(setAdminIsAccepted(false));
    dispatch(setLoggedIn(false));
    await AsyncStorage.clear();
  };

  return (
    <Modal
      transparent={false}
      animationIn={'shake'}
      isVisible={adminIsAccepted}>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          height: 200,
          width: '100%',
          justifyContent: 'space-between',
          borderRadius: 15,
          // paddingVertical: 30,
          paddingHorizontal: 15,
          alignItems: 'center',
          paddingTop: 15,
          paddingBottom: 15,
        }}>
        <EvilIcons name="exclamation" color={'#f0ad4e'} size={60} />
        <Text style={{color: '#000', fontSize: 20, fontWeight: '500'}}>
          Your Appication is under review
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <TouchableOpacity
            // onPress={onCancel}
            onPress={exitAndRefreshApp}
            style={{
              // elevation:10,
              height: 40,
              width: 100,
              backgroundColor: '#ffff',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              borderColor: '#000',
              borderWidth: 1,
              // alignSelf:'flex-end'
            }}>
            <Text style={{fontSize: 15, fontWeight: '900', color: '#000'}}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AdminAcceptedModal;

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    // backgroundColor: 'rgba(1, 1, 1, 0.1)',
    height: '100%',
    // backgroundColor: 'red',
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
  },
});
