import axios from 'axios';
import {CONSTANTS} from '../../Utils/constants';
import {handleUserGetData} from '../APIs/apiRequest';
import {getAuthHeaders, getOfflineData} from '../commonservice';

const checkLogin = async () => {
  // const authHeaders = await getAuthHeaders();
  const token = await getOfflineData(CONSTANTS.TOKEN);
  const authkey = await getOfflineData(CONSTANTS.AUTH_KEY);
  console.log('authkey===========================', authkey);
  const res = await handleUserGetData();
  console.log(
    '+++++++++++++++res in auth service====>',
    JSON.stringify(res.data.result.status),
  );

  // if (
  //   // res.data?.result?.shopsDetails &&
  //   // res.data?.result?.bankDetails &&
  //   token &&
  //   authkey
  // ) {
  //   return {
  //     loggedIn: true,
  //     currentUserData: res.data.result,
  //   };
  // } else {
  //   return {
  //     loggedIn: false,
  //   };
  // }

  if (res.data.result.status == 'accepted') {
    return {
      loggedIn: true,
      currentUserData: res.data.result,
    };
  } else if (res.data.result.status == 'underReview') {
    return {
      loggedIn: true,
      currentUserData: res.data.result,
    };
  } else if (res.data.result.status == 'complete') {
    return {
      loggedIn: false,
      currentUserData: res.data.result,
    };
  } else if (res.data.result.status == 'pending') {
    return {
      loggedIn: false,
      currentUserData: res.data.result,
    };
  } else if (res.data.result.status == 'rejected') {
    return {
      loggedIn: false,
      currentUserData: res.data.result,
    };
  } else {
    return {
      loggedIn: false,
      currentUserData: res.data.result,
    };
  }
};

export default AuthService = {checkLogin};
