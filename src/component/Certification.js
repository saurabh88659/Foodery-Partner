import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Colors from '../Utils/Color';
import DocumentPicker from 'react-native-document-picker';
import Custombtn from './CustomButton/Custombtn';
import Color from '../Utils/Color';
import {handleCertification} from '../features/APIs/apiRequest';
import Toast from 'react-native-simple-toast';
import {setCurrentStep} from '../features/requireDataReducer/requiredata.reducer';
import {useDispatch} from 'react-redux';

export default function Certification() {
  const dispatch = useDispatch();
  // const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectedFssai, setSelectedFssai] = React.useState(null);
  const [selectedIso, setSelectedIso] = React.useState(null);
  const [selectedFPO, setSelectedFPO] = React.useState(null);
  const [selectedFssc, setSelectedFssc] = React.useState(null);
  const [selectedAgmark, setSelectedAgmark] = React.useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  // const pickDocument = async () => {
  //   try {
  //     const doc = await DocumentPicker.pick();
  //     // setSelectedFile(doc);
  //     console.log(doc);
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(e))
  //       console.log('user cancelled the upload', e);
  //     else console.log(err);
  //   }
  // };

  const picksFssai = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // Allow the selection of all types of files
      });
      setSelectedFssai(doc);
      console.log('Selected FSSC file:', {
        uri: doc[0].uri,
        type: doc[0].type,
        name: doc[0].name,
        size: doc[0].size,
      });
      console.log('selectedFssai====>', doc);
    } catch (e) {
      if (DocumentPicker.isCancel(e))
        console.log('user cancelled the upload', e);
      else console.log(e);
    }
  };

  const pickIso = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedIso(doc);
      console.log('selectedFssai====>', doc);
    } catch (e) {
      if (DocumentPicker.isCancel(e))
        console.log('user cancelled the upload', e);
      else console.log(e);
    }
  };

  const pickFpo = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // Allow the selection of all types of files
      });
      setSelectedFPO(doc);
      console.log('selectedFssai====>', doc);
    } catch (e) {
      if (DocumentPicker.isCancel(e))
        console.log('user cancelled the upload', e);
      else console.log(e);
    }
  };

  const pickFssc = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // Allow the selection of all types of files
      });
      setSelectedFssc(doc);
      console.log('selectedFssai====>', doc);
    } catch (e) {
      if (DocumentPicker.isCancel(e))
        console.log('user cancelled the upload', e);
      else console.log(e);
    }
  };
  const pickFAgmark = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // Allow the selection of all types of files
      });
      setSelectedAgmark(doc);
      console.log('selectedFssai====>', doc);
    } catch (e) {
      if (DocumentPicker.isCancel(e))
        console.log('user cancelled the upload', e);
      else console.log(e);
    }
  };

  const HandleuploadAllCertificate = async () => {
    // Toast.show('Please Wait...', Toast.LONG);
    let formData = new FormData();

    // ====================fssaiLicence================
    formData.append('fssaiLicence', {
      uri: selectedFssai[0].uri,
      type: selectedFssai[0].type,
      name: selectedFssai[0].name,
    });

    // ==================IsoCertificate==================
    formData.append('IsoCertificate', {
      uri: selectedIso[0].uri,
      type: selectedIso[0].type,
      name: selectedIso[0].name,
    });

    // ==================fpoMark==================
    formData.append('fpoMark', {
      uri: selectedFPO[0].uri,
      type: selectedFPO[0].type,
      name: selectedFPO[0].name,
    });

    // ==================fsscCertificate==================
    formData.append('fsscCertificate', {
      uri: selectedFssc[0].uri,
      type: selectedFssc[0].type,
      name: selectedFssc[0].name,
    });

    // ==================agMarkCertificate==================
    formData.append('agMarkCertificate', {
      uri: selectedAgmark[0].uri,
      type: selectedAgmark[0].type,
      name: selectedAgmark[0].name,
    });
    return formData;
  };

  const submitCertification = async () => {
    Toast.show('Please wait...', Toast.LONG);
    setButtonLoading(true);
    const formData = await HandleuploadAllCertificate();
    console.log('formData===>', formData);
    const res = await handleCertification(formData);
    if (res?.data) {
      setButtonLoading(false);
      console.log('response data:===', res?.data);
      if (res.data.status) {
        Toast.show(res.data.message, Toast.SHORT);
        dispatch(setCurrentStep(3));
      }
    } else {
      setButtonLoading(false);
      console.log('catch error:==', result);
    }
  };

  return (
    <View>
      {/* -----------------------------Upload fssai licence-------------------- */}
      <Text
        style={{
          color: Colors.BLACK,
          fontWeight: '500',
          fontSize: 12,
          textAlign: 'left',
          paddingVertical: 5,
          marginLeft: 12,
          marginTop: 15,
        }}>
        Upload FSSAI Licence
      </Text>
      <View
        style={{
          backgroundColor: '#fff',
          width: responsiveWidth(95),
          height: responsiveHeight(6),
          alignSelf: 'center',
          flexDirection: 'row',
          borderRadius: 4,
          borderColor: 'gray',
          borderWidth: 1,
          marginTop: 5,
        }}>
        <TouchableOpacity
          onPress={picksFssai}
          style={{
            //backgroundColor: 'pink',
            width: responsiveWidth(25),
            height: responsiveHeight(5),
            alignSelf: 'center',
            marginLeft: 10,
            justifyContent: 'center',
            borderRadius: 2,
            borderColor: 'gray',
            borderWidth: 1,
          }}>
          <Text
            style={{
              color: Colors.BLACK,
              fontWeight: 'bold',
              fontSize: 12,
              textAlign: 'left',
              paddingVertical: 5,
              marginLeft: 2,
            }}>
            Choose a File
          </Text>
        </TouchableOpacity>
        {selectedFssai && (
          <View
            style={{
              //backgroundColor: 'pink',
              width: responsiveWidth(60),
              height: responsiveHeight(5),
              alignSelf: 'center',
              marginLeft: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.LIGHT_Gray,
              }}
              numberOfLines={1}>
              File name: {selectedFssai[0].name}
            </Text>
          </View>
        )}
      </View>

      {/* -------------------------------------U----------------pload ISO Certification-------------------- */}

      <Text
        style={{
          color: Colors.BLACK,
          fontWeight: '500',
          fontSize: 12,
          textAlign: 'left',
          paddingVertical: 5,
          marginLeft: 12,
          marginTop: 15,
        }}>
        Upload ISO Certificate
      </Text>
      <View
        style={{
          backgroundColor: '#fff',
          width: responsiveWidth(95),
          height: responsiveHeight(6),
          alignSelf: 'center',
          flexDirection: 'row',
          borderRadius: 4,
          borderColor: 'gray',
          borderWidth: 1,
          marginTop: 5,
        }}>
        <TouchableOpacity
          onPress={pickIso}
          style={{
            //backgroundColor: 'pink',
            width: responsiveWidth(25),
            height: responsiveHeight(5),
            alignSelf: 'center',
            marginLeft: 10,
            justifyContent: 'center',
            borderRadius: 2,
            borderColor: 'gray',
            borderWidth: 1,
          }}>
          <Text
            style={{
              color: Color.BLACK,
              fontWeight: 'bold',
              fontSize: 12,
              textAlign: 'left',
              paddingVertical: 5,
              marginLeft: 2,
            }}>
            Choose a File
          </Text>
        </TouchableOpacity>
        {selectedIso && (
          <View
            style={{
              //backgroundColor: 'pink',
              width: responsiveWidth(60),
              height: responsiveHeight(5),
              alignSelf: 'center',
              marginLeft: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.LIGHT_Gray,
              }}
              numberOfLines={1}>
              File Name: {selectedIso[0].name}
            </Text>
          </View>
        )}
      </View>

      {/* -----------------------------Upload FPO Mark Certificate-------------------- */}
      <Text
        style={{
          color: Colors.BLACK,
          fontWeight: '500',
          fontSize: 12,
          textAlign: 'left',
          paddingVertical: 5,
          marginLeft: 12,
          marginTop: 15,
        }}>
        Upload FPO Mark Certificate
      </Text>
      <View
        style={{
          backgroundColor: '#fff',
          width: responsiveWidth(95),
          height: responsiveHeight(6),
          alignSelf: 'center',
          flexDirection: 'row',
          borderRadius: 4,
          borderColor: 'gray',
          borderWidth: 1,
          marginTop: 5,
        }}>
        <TouchableOpacity
          onPress={pickFpo}
          style={{
            //backgroundColor: 'pink',
            width: responsiveWidth(25),
            height: responsiveHeight(5),
            alignSelf: 'center',
            marginLeft: 10,
            justifyContent: 'center',
            borderRadius: 2,
            borderColor: 'gray',
            borderWidth: 1,
          }}>
          <Text
            style={{
              color: Colors.BLACK,
              fontWeight: 'bold',
              fontSize: 12,
              textAlign: 'left',
              paddingVertical: 5,
              marginLeft: 2,
            }}>
            Choose a File
          </Text>
        </TouchableOpacity>
        {selectedFPO && (
          <View
            style={{
              //backgroundColor: 'pink',
              width: responsiveWidth(60),
              height: responsiveHeight(5),
              alignSelf: 'center',
              marginLeft: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.LIGHT_Gray,
              }}
              numberOfLines={1}>
              File Name: {selectedFPO[0].name}
            </Text>
          </View>
        )}
      </View>

      {/* -----------------------------Upload FSSC 22000 Certificate-------------------- */}
      <Text
        style={{
          color: Colors.BLACK,
          fontWeight: '500',
          fontSize: 12,
          textAlign: 'left',
          paddingVertical: 5,
          marginLeft: 12,
          marginTop: 15,
        }}>
        Upload FSSC 22000 Certificate
      </Text>
      <View
        style={{
          backgroundColor: '#fff',
          width: responsiveWidth(95),
          height: responsiveHeight(6),
          alignSelf: 'center',
          flexDirection: 'row',
          borderRadius: 4,
          borderColor: 'gray',
          borderWidth: 1,
          marginTop: 5,
        }}>
        <TouchableOpacity
          onPress={pickFssc}
          style={{
            //backgroundColor: 'pink',
            width: responsiveWidth(25),
            height: responsiveHeight(5),
            alignSelf: 'center',
            marginLeft: 10,
            justifyContent: 'center',
            borderRadius: 2,
            borderColor: 'gray',
            borderWidth: 1,
          }}>
          <Text
            style={{
              color: Colors.BLACK,
              fontWeight: 'bold',
              fontSize: 12,
              textAlign: 'left',
              paddingVertical: 5,
              marginLeft: 2,
            }}>
            Choose a File
          </Text>
        </TouchableOpacity>
        {selectedFssc && (
          <View
            style={{
              //backgroundColor: 'pink',
              width: responsiveWidth(60),
              height: responsiveHeight(5),
              alignSelf: 'center',
              marginLeft: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.LIGHT_Gray,
              }}
              numberOfLines={1}>
              File Name: {selectedFssc[0].name}
            </Text>
          </View>
        )}
      </View>

      {/* -----------------------------Upload AG Mark Certificate-------------------- */}
      <Text
        style={{
          color: Colors.BLACK,
          fontWeight: '500',
          fontSize: 12,
          textAlign: 'left',
          paddingVertical: 5,
          marginLeft: 12,
          marginTop: 15,
        }}>
        Upload AG Mark Certificate
      </Text>
      <View
        style={{
          backgroundColor: '#fff',
          width: responsiveWidth(95),
          height: responsiveHeight(6),
          alignSelf: 'center',
          flexDirection: 'row',
          borderRadius: 4,
          borderColor: 'gray',
          borderWidth: 1,
          marginTop: 5,
        }}>
        <TouchableOpacity
          onPress={pickFAgmark}
          style={{
            //backgroundColor: 'pink',
            width: responsiveWidth(25),
            height: responsiveHeight(5),
            alignSelf: 'center',
            marginLeft: 10,
            justifyContent: 'center',
            borderRadius: 2,
            borderColor: 'gray',
            borderWidth: 1,
          }}>
          <Text
            style={{
              color: Colors.BLACK,
              fontWeight: 'bold',
              fontSize: 12,
              textAlign: 'left',
              paddingVertical: 5,
              marginLeft: 2,
            }}>
            Choose a File
          </Text>
        </TouchableOpacity>
        {selectedAgmark && (
          <View
            style={{
              //backgroundColor: 'pink',
              width: responsiveWidth(60),
              height: responsiveHeight(5),
              alignSelf: 'center',
              marginLeft: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.LIGHT_Gray,
              }}
              numberOfLines={1}>
              File Name: {selectedAgmark[0].name}
            </Text>
          </View>
        )}
      </View>

      <View style={{paddingHorizontal: 20, marginTop: 15}}>
        <Custombtn
          title={'NEXT'}
          color={'#ffff'}
          onPress={submitCertification}
          loadingColor={'#ffff'}
          loadingSize={27}
          loading={buttonLoading}
        />
      </View>
    </View>
  );
}
