// import {Platform} from 'react-native';
// import NetInfo from '@react-native-community/netinfo';
// // import {SimpleToast} from '../Const';
// import axios from 'axios';

// export const checkInternetConnection = () => {
//   return new Promise(resolve => {
//     if (Platform.OS === 'android') {
//       NetInfo.fetch().then(state => {
//         resolve(state.isInternetReachable);
//       });
//     }
//   });
// };

// export const Instance = async (method, url, header, data) => {
//   const isInternet = await checkInternetConnection();
//   console.log('isInternet', isInternet);
//   if (isInternet) {
//     try {
//       const result = await axios({
//         method: method,
//         url: url,
//         headers: header,
//         data: data,
//       });
//       return result;
//     } catch (e) {
//       return e;
//     }
//   } else {
//     console.log('no Internet Connection');
//     // SimpleToast({title: 'No Internet Connection!', isLong: true});
//   }
// };
