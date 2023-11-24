import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
//import CustomButton from '../component/CustomButton/CustomButton';
import Color from '../Utils/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderHome from '../component/HeaderHome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  handleGetAllCategoryList,
  handleGetAllproductCategory,
  handleGetAllSubCategoryList,
  handleGetNotificationCount,
} from '../features/APIs/apiRequest';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useSelector} from 'react-redux';
import Header from '../component/Header';
// import Lottie from 'lottie-react-native';
// import {ActivityIndicator} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

function AllPoductSubCategoryComponent({data, onPress}) {
  console.log('data====>', data);

  // const ProductId = route.params;
  // console.log('ProductIddata===>', ProductId);
  //   const ProductId = route.params.data.itemId;
  //   const categoryName = route.params.data.categoryName;
  //   console.log('ProductId=====>', ProductId);
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const GetAllSubCategoryList = async () => {
    setLoading(true);
    const res = await handleGetAllSubCategoryList(data.ProductId);
    console.log('res of GetAllSubCategoryList===>', res.data);
    if (res.data.status) {
      setLoading(false);
      setAllSubCategory(res.data.getAll);
    } else {
      setLoading(false);
      console.log('error============>', res);
    }
  };

  useEffect(() => {
    GetAllSubCategoryList();
  }, []);

  const clear = async () => {
    await AsyncStorage.clear();
  };

  const renderItem = ({item}) => {
    console.log('item of subCategory====>', item);
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: Color.grayShade,
          //   paddingBottom: 30,
          //   backgroundColor: 'red',
          paddingVertical: 15,
          backgroundColor: Color.WHITE,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {/* <View
            style={{
              width: responsiveWidth(14),
              height: responsiveWidth(14),
              borderRadius: responsiveWidth(14),
              backgroundColor: Color.LIGHT_GREEN_TOP,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: responsiveWidth(8),
                height: responsiveWidth(8),
                // borderRadius: responsiveWidth(12),
              }}
              source={{uri: item.categoryIcon}}
            />
          </View> */}

          <Text
            style={{
              marginLeft: 15,
              color: 'black',
              fontWeight: '600',
              fontSize: 15,
            }}>
            {item.subCategoryName}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            onPress({
              itemId: item._id,
              categoryName: item.categoryName,
            })
          }
          //   onPress={() =>
          //     navigation.navigate('AllProductsItem', {
          //       itemId: item._id,
          //       categoryName: item.categoryName,
          //     })
          //   }

          activeOpacity={0.7}
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center',
            // backgroundColor: Color.LIGHT_GREEN,
            flex: 1,
            //backgroundColor: 'green',
            // borderRadius: 5,
            // marginVertical: 10,
          }}>
          <AntDesign name={'right'} color={'#000'} size={20} />

          {/* <Text
            style={{
              alignItems: 'flex-end',
              // padding: 5,
              paddingHorizontal: 11,
              paddingVertical: 7,
              fontSize: responsiveFontSize(1.5),
              color: Color.WHITE,
              fontWeight: '400',
            }}>
            View List
          </Text> */}
        </TouchableOpacity>
      </View>
    );
  };

  const [text, onChangeText] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#29C17E'} barStyle={Color.WHITE} />
      {loading ? (
        <View
          style={{
            height: '75%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Lottie
            source={require('../Assests/Lottie/Waiting.json')}
            autoPlay
            loop={true}
            style={{height: 100, width: 100}}
          /> */}

          <ActivityIndicator color={Color.DARK_GREEN} size={32} />
        </View>
      ) : allSubCategory && allSubCategory.length > 0 ? (
        <View style={{paddingBottom: '17%'}}>
          <FlatList data={allSubCategory} renderItem={renderItem} />
        </View>
      ) : (
        <Text style={{color: '#000'}}>No data found</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    backgroundColor: '#F4F7FA',
  },
  loginbox: {
    width: responsiveWidth(100),
    // backgroundColor: '#CBECE1',
    backgroundColor: '#29C17E',
    paddingVertical: responsiveHeight(2.5),
    alignSelf: 'center',
    //marginTop: responsiveHeight(2),
    flexDirection: 'row',
    elevation: 3,
    justifyContent: 'space-between',
    borderBottomRightRadius: responsiveHeight(2),
    borderBottomLeftRadius: responsiveHeight(2),
  },
  img: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    //backgroundColor: 'pink',
    borderRadius: responsiveWidth(15),
    marginLeft: responsiveWidth(1.5),
    borderWidth: 3,
    borderColor: Color.WHITE,
  },
  btnStyle: {
    backgroundColor: 'purple',
    height: responsiveHeight(8),
    width: responsiveWidth(70),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(3),
    borderWidth: 1,
    borderColor: 'purple',
    marginTop: responsiveHeight(6),
  },
  texting: {
    fontSize: responsiveFontSize(2.2),
    alignSelf: 'center',
    color: Color.WHITE,
    fontWeight: 'bold',
  },
  texting3: {
    fontSize: responsiveFontSize(2),
    alignSelf: 'center',
    color: Color.WHITE,
  },
  texting1: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  texting2: {
    fontSize: responsiveFontSize(2),
    paddingLeft: responsiveWidth(3),
  },
  store: {
    //backgroundColor: 'teal',
    padding: 5,
    marginLeft: responsiveWidth(8),
  },
});

export default AllPoductSubCategoryComponent;
