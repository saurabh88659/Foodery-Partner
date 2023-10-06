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
// {onPress, selected, children}

export default function Verification() {
  const [selectedOption, setSelectedOption] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [shouldShowNo, setShouldShowNo] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [selectedImage4, setSelectedImage4] = useState(null);
  const [selectedImage5, setSelectedImage5] = useState(null);

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
  const pickImage = () => {
    ImagePicker.openPicker({
      width: responsiveWidth(40),
      height: responsiveHeight(18),
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setSelectedImage(image);
        //setSelectedImage1(image.path);
      })
      .catch(error => {
        console.log('Error selecting image: ', error);
      });
  };
  const pickImages = () => {
    ImagePicker.openPicker({
      width: responsiveWidth(40),
      height: responsiveHeight(18),
      cropping: true,
    })
      .then(image => {
        console.log(image);
        //setSelectedImage(image.path);
        setSelectedImage1(image);
      })
      .catch(error => {
        console.log('Error selecting image: ', error);
      });
  };

  const pickImage1 = () => {
    ImagePicker.openPicker({
      width: responsiveWidth(40),
      height: responsiveHeight(18),
      cropping: true,
    })
      .then(image => {
        console.log(image);
        //setSelectedImage(image.path);
        setSelectedImage2(image);
      })
      .catch(error => {
        console.log('Error selecting image: ', error);
      });
  };

  const pickImage2 = () => {
    ImagePicker.openPicker({
      width: responsiveWidth(30),
      height: responsiveHeight(15),
      cropping: true,
    })
      .then(image => {
        console.log(image);
        //setSelectedImage(image.path);
        setSelectedImage4(image);
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

  const takeImage = () => {
    ImagePicker.openCamera({
      width: responsiveWidth(40),
      height: responsiveHeight(18),
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setSelectedImage3(image);
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
          {selectedImage ? (
            <Image
              source={{uri: selectedImage?.path}}
              style={styles.image}
              // onPress={pickImage}
            />
          ) : (
            <TouchableOpacity
              onPress={pickImage}
              style={{
                width: responsiveWidth(40),
                height: responsiveHeight(18),
                alignSelf: 'center',
                backgroundColor: '#545454',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon color={'#000'} name="camera" size={40} />
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
          {selectedImage1 ? (
            <Image
              source={{uri: selectedImage1?.path}}
              style={styles.image}
              //onPress={pickImages}
            />
          ) : (
            <TouchableOpacity
              onPress={pickImages}
              style={{
                width: responsiveWidth(40),
                height: responsiveHeight(18),
                alignSelf: 'center',
                backgroundColor: '#545454',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon color={'#000'} name="camera" size={40} />
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
            {selectedImage2 ? (
              <Image
                source={{uri: selectedImage2?.path}}
                style={styles.image}
                //onPress={pickImage1}
              />
            ) : (
              <TouchableOpacity
                onPress={pickImage1}
                style={{
                  width: responsiveWidth(40),
                  height: responsiveHeight(18),
                  alignSelf: 'center',
                  backgroundColor: '#545454',
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon color={'#000'} name="camera" size={40} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View>
          {selectedImage3 ? (
            <Image
              source={{uri: selectedImage3?.path}}
              style={styles.image}
              //onPress={takeImage}
            />
          ) : (
            <TouchableOpacity
              onPress={takeImage}
              style={{
                width: responsiveWidth(40),
                height: responsiveHeight(18),
                alignSelf: 'center',
                backgroundColor: '#545454',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon color={'#000'} name="camera" size={40} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text
        style={{
          color: 'black',
          marginTop: 12,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: responsiveFontSize(1.8),
          marginLeft: 12,
        }}>
        Is the Store rented?
      </Text>
      <View style={styles.container}>
        <CustomRadioButton
          label="Yes"
          selected={selectedOption === 'Yes'}
          onPress={() => {
            handleRadioButtonPress('Yes'), setShouldShow(!shouldShow);
          }}
        />
        <CustomRadioButton
          label="No"
          selected={selectedOption === 'No'}
          onPress={() => {
            handleRadioButtonPress('No'), setShouldShowNo(!shouldShowNo);
          }}
        />
      </View>
      {shouldShow ? (
        <>
          <View
            style={{
              //backgroundColor: 'teal',
              width: responsiveWidth(90),
              height: responsiveHeight(17),
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                marginTop: 3,
                marginRight: 35,
                //fontWeight: 'bold',
                fontSize: responsiveFontSize(1.5),
              }}>
              Upload Rent/Lease Bill
            </Text>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                {selectedImage4 ? (
                  <Image
                    source={{uri: selectedImage5?.path}}
                    style={styles.image1}
                    //onPress={takeImage}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={pickImage2}
                    style={{
                      width: responsiveWidth(30),
                      height: responsiveHeight(15),
                      alignSelf: 'center',
                      backgroundColor: '#545454',
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon color={'#000'} name="camera" size={40} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </>
      ) : null}

      {shouldShowNo ? (
        <>
          <View
            style={{
              //backgroundColor: 'teal',
              width: responsiveWidth(90),
              height: responsiveHeight(17),
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                marginTop: 3,
                marginRight: 35,
                //fontWeight: 'bold',
                fontSize: responsiveFontSize(1.5),
              }}>
              Upload Electricity Bill
            </Text>
            <View
              style={{
                backgroundColor: 'green',
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
                {selectedImage5 ? (
                  <Image
                    source={{uri: selectedImage5?.path}}
                    style={styles.image1}
                    //onPress={takeImage}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={pickImage3}
                    style={{
                      width: responsiveWidth(30),
                      height: responsiveHeight(15),
                      alignSelf: 'center',
                      backgroundColor: '#545454',
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon color={'#000'} name="camera" size={40} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </>
      ) : null}

      <TouchableOpacity
        onPress={() => _updateFrontAadhar()}
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

{
  /* <Text style={styles.selectedFileSize}>
                        File Size: {selectedFile.size} bytes
                      </Text> */
}
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: 'green',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    width: responsiveWidth(80),
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
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
