import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Stylesheet,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import Colors from '../Utils/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

//import {format} from 'date-fns';
//import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Entypo';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import CustomRadioButton from './CustomRadioButton';
import ImagePicker from 'react-native-image-crop-picker';
import Custombtn from './CustomButton/Custombtn';
import {RadioButton} from 'react-native-paper';
import Color from '../Utils/Color';
import {docsVerification} from '../features/APIs/apiRequest';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import {setCurrentStep} from '../features/requireDataReducer/requiredata.reducer';

// {onPress, selected, children}

export default function Verification() {
  const [selectedOption, setSelectedOption] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [shouldShowNo, setShouldShowNo] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [frontAdhar, setFrontAdhar] = useState('');

  const [selectedImage1, setSelectedImage1] = useState(null);
  const [backAdhar, setBackAdhar] = useState('');

  const [selectedImage2, setSelectedImage2] = useState(null);
  const [pancard, setPan] = useState('');
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [selfie, setSelfie] = useState('');
  const [selectedImage4, setSelectedImage4] = useState(null);
  const [rentBill, setRentBill] = useState('');
  const [uploadRent, setUploadRent] = useState('');
  const [electricityBill, setElectricityBill] = useState('');
  const [UploadElectricity, setUploadElectricity] = useState('');

  const [selectedImage5, setSelectedImage5] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [checked, setChecked] = React.useState('');
  const [isStoreRented, setIsStoreRented] = useState('');
  const dispatch = useDispatch();
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedFile(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the document picker
      } else {
        console.log('Error selecting document:', err);
      }
    }
  };

  const handleUpload = () => {
    // Implement your file upload logic here
    if (selectedFile) {
      // Perform the upload process, e.g., send the file to your server or cloud storage
      console.log('Uploading:', selectedFile.uri);
    }
  };

  const handleRadioButtonPress = value => {
    setSelectedOption(value);
  };

  const HandleuploadAlldocs = async () => {
    Toast.show('Please Wait...', Toast.LONG);
    let formData = new FormData();
    // ====================frontAdhar================
    formData.append('aadharFront', {
      name: frontAdhar?.path?.replace(/^.*[\\\/]/, ''),
      type: frontAdhar?.mime,
      uri:
        Platform.OS === 'android'
          ? frontAdhar?.path
          : frontAdhar?.path?.replace('file://', ''),
    });

    // ==================backAdhar==================
    formData.append('aadharBack', {
      name: backAdhar?.path?.replace(/^.*[\\\/]/, ''),
      type: backAdhar?.mime,
      uri:
        Platform.OS === 'android'
          ? backAdhar?.path
          : backAdhar?.path?.replace('file://', ''),
    });

    // ==================pancard==================
    formData.append('pancard', {
      name: pancard?.path?.replace(/^.*[\\\/]/, ''),
      type: pancard?.mime,
      uri:
        Platform.OS === 'android'
          ? pancard?.path
          : pancard?.path?.replace('file://', ''),
    });

    // ==================selfie==================
    formData.append('selfie', {
      name: selfie?.path?.replace(/^.*[\\\/]/, ''),
      type: selfie?.mime,
      uri:
        Platform.OS === 'android'
          ? selfie?.path
          : selfie?.path?.replace('file://', ''),
    });

    if (isStoreRented == 'Yes') {
      // ==================rentBill==================
      formData.append('image', {
        name: rentBill?.path?.replace(/^.*[\\\/]/, ''),
        type: rentBill?.mime,
        uri:
          Platform.OS === 'android'
            ? rentBill?.path
            : rentBill?.path?.replace('file://', ''),
      });
    } else {
      // ====================================
      formData.append('image', {
        name: electricityBill?.path?.replace(/^.*[\\\/]/, ''),
        type: electricityBill?.mime,
        uri:
          Platform.OS === 'android'
            ? electricityBill?.path
            : electricityBill?.path?.replace('file://', ''),
      });
    }

    formData.append('isStoreRented', isStoreRented);
    console.log(formData, '=====formdata');
    return formData;
    // const result = await _getUploadProfilePic(formData);

    // if (result?.data) {
    //   console.log('UPLOAD Profile Pic', result?.data?.message);
    //   SimpleToast({title: result?.data?.message, isLong: true});
    //   setState({...state, profileImg: null});
    //   setState({
    //     ...state,
    //     isLoading: false,
    //   });
    // } else {
    //   console.log('catch error update profile pic', result?.data);
    //   SimpleToast({title: 'Server Error:', isLong: true});
    //   setState({...state, profileImg: null});
    //   setState({
    //     ...state,
    //     isLoading: false,
    //   });
    // }
  };

  const uploadFrontAdhar = () => {
    ImagePicker.openPicker({
      width: responsiveWidth(40),
      height: responsiveHeight(18),
      cropping: true,
    })
      .then(image => {
        console.log('image===>', image);
        // setSelectedImage(image);
        setFrontAdhar(image);
      })
      .catch(error => {
        console.log('Error selecting image: ', error);
      });
  };

  const uploadBackAdhar = () => {
    ImagePicker.openPicker({
      width: responsiveWidth(40),
      height: responsiveHeight(18),
      cropping: true,
    })
      .then(image => {
        console.log(image);
        // setSelectedImage1(image);
        setBackAdhar(image);
      })
      .catch(error => {
        console.log('Error selecting image: ', error);
      });
  };

  const uploadPan = () => {
    ImagePicker.openPicker({
      width: responsiveWidth(40),
      height: responsiveHeight(18),
      cropping: true,
    })
      .then(image => {
        console.log(image);
        // setSelectedImage2(image);
        setPan(image);
      })
      .catch(error => {
        console.log('Error selecting image: ', error);
      });
  };

  const uploadRentBill = () => {
    ImagePicker.openPicker({
      width: responsiveWidth(30),
      height: responsiveHeight(15),
      cropping: true,
    })
      .then(image => {
        console.log(image);
        //setSelectedImage(image.path);
        // setSelectedImage4(image);
        setRentBill(image);
      })
      .catch(error => {
        console.log('Error selecting image: ', error);
      });
  };

  const uploadElectricityBill = () => {
    ImagePicker.openPicker({
      width: responsiveWidth(30),
      height: responsiveHeight(15),
      cropping: true,
    })
      .then(image => {
        console.log(image);
        //setSelectedImage(image.path);
        // setSelectedImage4(image);
        setElectricityBill(image);
      })
      .catch(error => {
        console.log('Error selecting image: ', error);
      });
  };

  const pickImage3 = () => {
    ImagePicker.openPicker({
      width: responsiveWidth(30),
      height: responsiveHeight(15),
      cropping: true,
    })
      .then(image => {
        console.log(image);
        //setSelectedImage(image.path);
        setSelectedImage5(image);
      })
      .catch(error => {
        console.log('Error selecting image: ', error);
      });
  };

  const uploadSelfie = () => {
    ImagePicker.openCamera({
      width: responsiveWidth(40),
      height: responsiveHeight(18),
      cropping: true,
    })
      .then(image => {
        console.log('uploadSelfie ===image', image);
        // setSelectedImage3(image);
        setSelfie(image);
      })
      .catch(error => {
        console.log('Error taking image: ', error);
      });
  };

  const _updateFrontAadhar = async () => {
    console.log(selectedImage);
    const tokenObj = await AsyncStorage.getItem('token');
    const axiosConfig = {
      Authorization: `Bearer ${tokenObj}`,
    };

    axiosConfig['Content-type'] = 'multipart/form-data'; // add new key and its value to a object
    // console.log(axiosConfig, 'meeeeeeeeeeeeeeeee');
    var filename = selectedImage?.path?.replace(/^.*[\\\/]/, ''); // for both platforms
    let newImageData = new FormData();
    newImageData.append('aadharFront', {
      name: filename,
      type: selectedImage.mime,
      uri:
        Platform.OS === 'android'
          ? selectedImage.path
          : selectedImage.path.replace('file://', ''),
    });

    //////////////////////////Second image//////////////////////////

    var filename1 = selectedImage1?.path?.replace(/^.*[\\\/]/, ''); // for both platforms
    newImageData.append('aadharBack', {
      name: filename1,
      type: selectedImage1.mime,
      uri:
        Platform.OS === 'android'
          ? selectedImage1.path
          : selectedImage1.path.replace('file://', ''),
    });

    /////////////////////////third image//////////////////////////////

    var filename2 = selectedImage2?.path?.replace(/^.*[\\\/]/, ''); // for both platforms
    newImageData.append('pancard', {
      name: filename2,
      type: selectedImage2.mime,
      uri:
        Platform.OS === 'android'
          ? selectedImage2.path
          : selectedImage2.path.replace('file://', ''),
    });

    /////////////////////////////take selfie///////////////////////

    var filename3 = selectedImage3?.path?.replace(/^.*[\\\/]/, ''); // for both platforms

    newImageData.append('selfie', {
      name: filename3,
      type: selectedImage3.mime,
      uri:
        Platform.OS === 'android'
          ? selectedImage3.path
          : selectedImage3.path.replace('file://', ''),
    });

    //////////////////////////store rent image////////////////////////////////

    var filename4 = selectedImage4?.path?.replace(/^.*[\\\/]/, ''); // for both platforms

    newImageData.append('image', {
      name: filename4,
      type: selectedImage4.mime,
      uri:
        Platform.OS === 'android'
          ? selectedImage4.path
          : selectedImage4.path.replace('file://', ''),
    });
    newImageData.append('isStoreRented', 'No');
    console.log(newImageData, 'purpleeeeeeeeeeeeeeeeeeeeeeeeee');
    try {
      //setLoading(true);
      const response = await axios({
        url: 'http://192.168.68.123:8000/api/vendor/vendorUploadDocs',
        headers: axiosConfig,
        data: newImageData,
        method: 'PUT',
      });

      console.log('Image RESSS====>>>>', response.data);
    } catch (error) {
      console.log('Image errror --->>> ', error);
      //ToastAndroid.show('Server error❗', ToastAndroid.LONG);
    }
  };

  const validateFields = () => {
    return (
      frontAdhar &&
      backAdhar &&
      selfie &&
      pancard &&
      (electricityBill || uploadRent)
    );
  };

  // const test = () => {
  //   if (validateFields()) {
  //     console.log('if==');
  //   } else {
  //     console.log('else===');
  //   }
  // };

  const HandleDocsVerification = async () => {
    if (validateFields()) {
      console.log('if==');
      setButtonLoading(true);
      const formData = await HandleuploadAlldocs();
      console.log(formData, 'formData=========>');
      const res = await docsVerification(formData);
      if (res.data) {
        setButtonLoading(false);
        console.log('response of HandleDocsVerification :', res.data);
        if (res.data.status) {
          dispatch(setCurrentStep(2));
          Toast.show(res.data.message, Toast.SHORT);
        }
      } else {
        setButtonLoading(false);
        console.log(
          'catch error(response.message) of  HandleDocsVerification:',
          res,
        );
      }
    } else {
      Toast.show('All fields are required', Toast.SHORT);
      console.log('else===');
    }
  };

  return (
    <View>
      <Text
        style={{
          color: 'black',
          marginTop: 12,
          textAlign: 'left',
          fontWeight: 'bold',
          fontSize: responsiveFontSize(1.8),
          marginLeft: 12,
        }}>
        Upload Aadhar Card
      </Text>

      <View
        style={{
          flexDirection: 'row',
          //backgroundColor: 'teal',
          width: responsiveWidth(95),
          height: responsiveHeight(22),
          alignSelf: 'center',
          marginTop: responsiveHeight(2),
          justifyContent: 'space-between',
        }}>
        <View>
          {frontAdhar ? (
            <TouchableOpacity onPress={uploadFrontAdhar}>
              <Image source={{uri: frontAdhar?.path}} style={styles.image} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={uploadFrontAdhar}
              style={{
                width: responsiveWidth(40),
                height: responsiveHeight(18),
                alignSelf: 'center',
                backgroundColor: '#545454',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: frontAdhar ? null : 'red',
              }}>
              <Icon color={'#000'} name="camera" size={55} />
            </TouchableOpacity>
          )}
          <Text
            style={{
              color: 'black',

              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: responsiveFontSize(1.5),
              //marginLeft: 12,
            }}>
            Upload Front Image
          </Text>
        </View>

        <View>
          {backAdhar ? (
            (console.log(backAdhar, '===================on view backAdhar'),
            (
              <Image
                source={{uri: backAdhar?.path}}
                style={styles.image}
                //onPress={pickImages}
              />
            ))
          ) : (
            <TouchableOpacity
              // onPress={pickImages}
              onPress={uploadBackAdhar}
              style={{
                width: responsiveWidth(40),
                height: responsiveHeight(18),
                alignSelf: 'center',
                backgroundColor: '#545454',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: backAdhar ? null : 'red',
              }}>
              <Icon color={'#000'} name="camera" size={55} />
            </TouchableOpacity>
          )}

          <Text
            style={{
              color: 'black',

              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: responsiveFontSize(1.5),
              //marginLeft: 12,
            }}>
            Upload back Image
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            color: 'black',
            marginTop: 12,
            textAlign: 'left',
            fontWeight: 'bold',
            fontSize: responsiveFontSize(1.8),
            marginLeft: 12,
          }}>
          Upload Pan Card
        </Text>
        <Text
          style={{
            color: 'black',
            marginTop: 12,
            marginRight: 35,
            fontWeight: 'bold',
            fontSize: responsiveFontSize(1.8),
          }}>
          Upload Selfie
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          //backgroundColor: 'teal',
          width: responsiveWidth(95),
          height: responsiveHeight(20),
          alignSelf: 'center',
          marginTop: responsiveHeight(2),
          justifyContent: 'space-between',
        }}>
        <View>
          <View>
            {pancard ? (
              <Image
                source={{uri: pancard?.path}}
                style={styles.image}
                // onPress={pickImage1}
                onPress={uploadPan}
              />
            ) : (
              <TouchableOpacity
                onPress={uploadPan}
                style={{
                  width: responsiveWidth(40),
                  height: responsiveHeight(18),
                  alignSelf: 'center',
                  backgroundColor: '#545454',
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: pancard ? null : 'red',
                }}>
                <Icon color={'#000'} name="camera" size={55} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View>
          {selfie ? (
            (console.log(selfie, '===================on view selfie'),
            (
              <Image
                source={{uri: selfie?.path}}
                style={styles.image}
                //onPress={takeImage}
              />
            ))
          ) : (
            <TouchableOpacity
              // onPress={takeImage}
              onPress={uploadSelfie}
              style={{
                width: responsiveWidth(40),
                height: responsiveHeight(18),
                alignSelf: 'center',
                backgroundColor: '#545454',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: selfie ? null : 'red',
              }}>
              <Icon color={'#000'} name="camera" size={55} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text
        style={{
          color: 'black',
          marginTop: 12,
          textAlign: 'center',
          fontWeight: '900',
          fontSize: responsiveFontSize(2),
          marginLeft: 12,
        }}>
        Is the Store rented?
      </Text>
      <View style={styles.container}>
        {/* <CustomRadioButton
          label={
            <View style={{margin: 10, padding: 5}}>
              <Text style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
                Yes
              </Text>
            </View>
          }
          selected={selectedOption === 'Yes'}
          onPress={() => {
            handleRadioButtonPress('Yes'), setShouldShow(!shouldShow);
          }}
        />

        <CustomRadioButton
          label={
            <View style={{margin: 10, padding: 5}}>
              <Text style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
                No
              </Text>
            </View>
          }
          selected={selectedOption === 'No'}
          onPress={() => {
            handleRadioButtonPress('No'), setShouldShowNo(!shouldShowNo);
          }}
        /> */}

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton
            color={Colors.Green_Top}
            uncheckedColor={Colors.DARK_GRAY}
            value="Yes"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('first'),
                setUploadElectricity(false),
                setUploadRent(true);
              setIsStoreRented('Yes');
            }}
          />
          <Text style={{color: Colors.BLACK, fontSize: 15, fontWeight: '700'}}>
            Yes
          </Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton
            color={Colors.Green_Top}
            uncheckedColor={Colors.DARK_GRAY}
            value="Yes"
            status={checked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('second'),
                setUploadElectricity(true),
                setUploadRent(false);
              setIsStoreRented('No');
            }}
          />
          <Text style={{color: Colors.BLACK, fontSize: 15, fontWeight: '700'}}>
            No
          </Text>
        </View>
      </View>

      {uploadRent ? (
        <>
          <View
            style={{
              //backgroundColor: 'teal',
              width: responsiveWidth(90),
              height: responsiveHeight(19),
              alignSelf: 'center',
              // backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                // alignSelf: 'center',
                color: 'black',
                // marginTop: 3,
                // marginRight: 35,
                //fontWeight: 'bold',
                fontSize: responsiveFontSize(1.8),
                marginVertical: 5,
                fontWeight: '600',
              }}>
              Upload Rent/Lease Bill
            </Text>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                {rentBill ? (
                  <Image
                    source={{uri: rentBill?.path}}
                    style={styles.image1}
                    //onPress={takeImage}
                  />
                ) : (
                  <TouchableOpacity
                    // onPress={pickImage2}
                    onPress={uploadRentBill}
                    style={{
                      width: responsiveWidth(30),
                      height: responsiveHeight(15),
                      alignSelf: 'center',
                      backgroundColor: '#545454',
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: rentBill ? null : 'red',
                    }}>
                    <Icon color={'#000'} name="camera" size={40} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </>
      ) : null}

      {UploadElectricity ? (
        <>
          <View
            style={{
              //backgroundColor: 'teal',
              width: responsiveWidth(90),
              height: responsiveHeight(19),
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                // alignSelf: 'center',
                color: 'black',
                // marginTop: 3,
                // marginRight: 35,
                //fontWeight: 'bold',
                fontSize: responsiveFontSize(1.8),
                marginVertical: 5,
                fontWeight: '600',
              }}>
              Upload Electricity Bill
            </Text>
            <View
              style={{
                // backgroundColor: 'green',
                //height: responsiveHeight(),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <View
                style={{
                  flexDirection: 'row',
                  //backgroundColor: 'orange',
                  alignItems: 'center',
                }}>
                {selectedFile && (
                  <View style={styles.selectedFileContainer}>
                    <Text style={styles.selectedFileName} numberOfLines={1}>
                      File Name: {selectedFile.name}
                    </Text>
                  </View>
                )}
                <TouchableOpacity style={styles.button} onPress={pickDocument}>
                  <Icon color={'#fff'} name="attachment" size={20} />
                </TouchableOpacity>
              </View> */}

              {/* <TouchableOpacity
                style={[
                  styles.button,
                  selectedFile ? styles.uploadButton : styles.disabledButton,
                ]}
                disabled={!selectedFile}
                onPress={handleUpload}>
                <Text style={styles.buttonText}>Upload</Text>
              </TouchableOpacity> */}

              <View>
                {electricityBill ? (
                  <Image
                    source={{uri: electricityBill?.path}}
                    style={styles.image1}
                    //onPress={takeImage}
                  />
                ) : (
                  // <TouchableOpacity
                  //   onPress={pickImage3}
                  //   style={{
                  //     width: responsiveWidth(30),
                  //     height: responsiveHeight(15),
                  //     alignSelf: 'center',
                  //     backgroundColor: '#545454',
                  //     borderRadius: 8,
                  //     alignItems: 'center',
                  //     justifyContent: 'center',
                  //   }}>
                  //   <Icon color={'#000'} name="camera" size={40} />
                  // </TouchableOpacity>
                  <TouchableOpacity
                    onPress={uploadElectricityBill}
                    style={{
                      width: responsiveWidth(30),
                      height: responsiveHeight(15),
                      alignSelf: 'center',
                      backgroundColor: '#545454',
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: electricityBill ? null : 'red',
                    }}>
                    <Icon color={'#000'} name="camera" size={40} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </>
      ) : null}

      <View style={{paddingHorizontal: 20, marginTop: 15}}>
        <Custombtn
          title={'NEXT'}
          color={'#ffff'}
          onPress={HandleDocsVerification}
          loadingColor={'#ffff'}
          loadingSize={27}
          loading={buttonLoading}
        />
      </View>
    </View>
  );
}

{
  /* <Text style={styles.selectedFileSize}>
                        File Size: {selectedFile.size} bytes
                      </Text> */
}
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: 'green',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: responsiveWidth(75),
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
    // backgroundColor: 'red',
  },

  button: {
    backgroundColor: Colors.LIGHT_ORANGE,
    paddingHorizontal: 16,
    paddingVertical: 7.2,
    //borderRadius: 5,
    marginVertical: 7,
  },
  disabledButton: {
    backgroundColor: '#BDBDBD', // or any other color for disabled state
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  selectedFileContainer: {
    alignItems: 'center',
    //backgroundColor: 'teal',
    width: responsiveWidth(60),
    height: responsiveHeight(4.5),
    //borderRadius: 4,
    borderColor: Colors.BLACK,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  selectedFileName: {
    fontSize: 16,
  },
  selectedFileSize: {
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: '#4CAF50', // or any other color for enabled state
  },
  image: {
    width: responsiveWidth(40),
    height: responsiveHeight(18),
    borderRadius: 8,
  },
  image1: {
    width: responsiveWidth(30),
    height: responsiveHeight(15),
    borderRadius: 8,
  },
});
