import {typesAreEqual} from 'react-native-document-picker/lib/typescript/fileTypes';
import {CONSTANTS} from '../../Utils/constants';
import {
  BASE_URL,
  getAuthHeaders,
  getOfflineData,
  Instance,
} from '../commonservice';

export const LoginWithPhone = obj => {
  // const header = await getAuthHeaders();
  try {
    const result = Instance(
      'POST',
      BASE_URL + 'vendor/loginVendorApp',
      null,
      obj,
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const OtpVerification = data => {
  console.log(data, '==');
  try {
    const result = Instance(
      'POST',
      BASE_URL + 'vendor/verifyOTPVendorApp',
      null,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const PersonlDetialVerification = async data => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = Instance(
      'PUT',
      BASE_URL + 'vendor/signUpVendorApp',
      authHeaders,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const docsVerification = async data => {
  const authHeaders = await getAuthHeaders();
  authHeaders['Content-type'] = 'multipart/form-data';

  console.log('authHeaders=====>at docsVerification', authHeaders);

  console.log('=docsVerification data=====', data);

  try {
    const result = Instance(
      'PUT',
      BASE_URL + 'vendor/vendorUploadDocs',
      authHeaders,
      data,
    );
    return result;
  } catch (error) {
    // console.log('erreo====', error.response.data);
    return error;
  }
};

export const handleCertification = async data => {
  const authHeaders = await getAuthHeaders();
  console.log('token===', authHeaders);
  authHeaders['Content-type'] = 'multipart/form-data';
  try {
    const result = await Instance(
      'PUT',
      BASE_URL + 'vendor/vendorCertification',
      authHeaders,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const handleBankDetail = async data => {
  const authHeaders = await getAuthHeaders();
  console.log('token===', authHeaders);
  try {
    const result = await Instance(
      'PUT',
      BASE_URL + 'vendor/addBankAccount',
      authHeaders,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const handleAdminIsAccepted = async data => {
  const authHeaders = await getAuthHeaders();
  console.log('token===', authHeaders);
  try {
    const result = await Instance(
      'GET',
      BASE_URL + 'vendor/isAccepted',
      authHeaders,
    );
    console.log('result', result);
    return result;
  } catch (error) {
    console.log('error', error);
    return error;
  }
};

export const handleUserGetData = async data => {
  const authHeaders = await getAuthHeaders();
  console.log('token===', authHeaders);
  try {
    const result = await Instance(
      'GET',
      BASE_URL + 'vendor/getMyProfile',
      authHeaders,
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const handleGetAllCategoryList = async data => {
  const authHeaders = await getAuthHeaders();
  console.log('token===', authHeaders);
  try {
    const result = await Instance(
      'GET',
      BASE_URL + 'vendor/getAllCategoryList',
      authHeaders,
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const SelectedItemSubmit = async data => {
  console.log('data of SelectedItemSubmit==> ', data);
  const object = {
    vendorId: data.userId,
    products: data.selectedItems,
  };
  console.log('++++++object of SelectedItemSubmit===>', object);
  const authHeaders = await getAuthHeaders();
  console.log('token===', authHeaders);
  try {
    const result = await Instance(
      'POST',
      BASE_URL + 'vendor/addProducts',
      authHeaders,
      object,
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const handleGetAllSubCategoryList = async data => {
  const authHeaders = await getAuthHeaders();
  console.log('token===???', authHeaders);
  console.log('data of handleGetAllSubCategoryList==>', data);
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `vendor/getAllSubCategory1/${data}`,
      authHeaders,
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const handleGetAllproductCategory = async data => {
  console.log(' handleGetAllproductCategory data====>>===', data);
  const authHeaders = await getAuthHeaders();
  console.log('token===', authHeaders);
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `vendor/getAllproductCategory/${data}`,
      authHeaders,
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const handleGetSelectedproducts = async data => {
  console.log(' handleGetSelectedproducts data====>>===', data);
  const authHeaders = await getAuthHeaders();
  console.log('token===', authHeaders);
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `vendor/getVendorProduct/${data}`,
      authHeaders,
    );
    console.log('hello bro');
    return result;
  } catch (error) {
    return error;
  }
};

export const handleGetOrder = async () => {
  const authHeaders = await getAuthHeaders();
  console.log('token===', authHeaders);
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `vendor/vendorGetOrderDetails`,
      authHeaders,
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const handleVEndorCurrentBalance = async () => {
  const authHeaders = await getAuthHeaders();
  console.log('token===', authHeaders);
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `vendor/vendorAllbalance`,
      authHeaders,
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const handleGetAllOutOfStock = async () => {
  const authHeaders = await getAuthHeaders();
  console.log('token===', authHeaders);
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `vendor/getAllOutOfStock`,
      authHeaders,
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const handleInStockOutStockFunctionality = async ProductData => {
  const object = ProductData.handleInStockOutStockFunctionalityObj;
  console.log('=======>>>object', object);
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'PUT',
      BASE_URL + `vendor/editVendorStock`,
      authHeaders,
      object,
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const handleAcceptNotification = async orderId => {
  const object = {
    orderId: orderId,
  };
  console.log('onject of handleAcceptNotification', object);
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'PUT',
      BASE_URL + `vendor/vendorAcceptedNotifiaction`,
      authHeaders,
      object,
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const handleRejectNotification = async orderId => {
  console.log('order id====>', orderId);
  const object = {};
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'PUT',
      BASE_URL + `vendor/vendorRejected/${orderId}`,
      authHeaders,
      object,
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const handleGetVendorOrderNotification = async () => {
  const authHeaders = await getAuthHeaders();

  try {
    const result = await Instance(
      'GET',
      BASE_URL + `vendor/vendorGetNotification`,
      authHeaders,
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const handleGetNotificationCount = async () => {
  const authHeaders = await getAuthHeaders();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + 'vendor/notificationCount',
      authHeaders,
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const handleUpdateProfilePic = async image => {
  const object = {image: image};
  console.log('object =======>', object);
  const authHeaders = await getAuthHeaders();

  const MainHeaders = {
    Authorization: `Bearer ${await getOfflineData(CONSTANTS.TOKEN)}`,
    'Content-Type': 'multipart/form-data',
  };
  console.log('token=====>', authHeaders);
  console.log('MainHeaders=====>', MainHeaders);

  try {
    const result = await Instance(
      'PUT',
      BASE_URL + `vendor/editProfile`,
      MainHeaders,
      image,
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const handleGetTransactionHiostory = async data => {
  const authHeaders = await getAuthHeaders();
  console.log('token===', authHeaders);
  try {
    const result = await Instance(
      'GET',
      BASE_URL + `vendor/getTransaction`,
      authHeaders,
    );
    return result;
  } catch (error) {
    return error;
  }
};
