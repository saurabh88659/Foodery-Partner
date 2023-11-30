import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONSTANTS} from '../Utils/constants';
// import {Instance} from '../Utils/Handler/InternetInfo';
export const BASE_URL = 'https://apigrocery.kickrtechnology.online/api/';
// export const BASE_URL = 'https://apigrocery.instacash.space/api/';
import {Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
export const getAuthHeaders = async () => {
  return {
    // headers: {
    Authorization: `Bearer ${await getOfflineData(CONSTANTS.TOKEN)}`,
    // },
  };
};

export const getRefreshToken = async () => {
  return {
    // headers: {
    Authorization: `Bearer ${await getOfflineData(CONSTANTS.REFRESH_TOKEN)}`,
    // },
  };
};

export const setOfflineData = async (key, value) => {
  const resp = await AsyncStorage.setItem(key, JSON.stringify(value));
  return resp;
};

export const getOfflineData = async key => {
  const resp = await AsyncStorage.getItem(key);
  return JSON.parse(resp);
};

export const checkInternetConnection = () => {
  return new Promise(resolve => {
    if (Platform.OS === 'android') {
      NetInfo.fetch().then(state => {
        resolve(state.isInternetReachable);
      });
    }
  });
};

export const Instance = async (method, url, header, data) => {
  const isInternet = await checkInternetConnection();
  console.log('isInternet', isInternet);
  // if (isInternet) {
  try {
    const result = await axios({
      method: method,
      url: url,
      headers: header,
      data: data,
    });
    return result;
  } catch (e) {
    return e;
  }
  // } else {
  //   console.log('no Internet Connection');
  //   // SimpleToast({title: 'No Internet Connection!', isLong: true});
  // }
};
