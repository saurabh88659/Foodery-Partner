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
  handleGetNotificationCount,
} from '../features/APIs/apiRequest';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useSelector} from 'react-redux';
import Header from '../component/Header';
import AllProductSubCategory from './AllProductSubCategory';
import SelectedTempProductsMain from './SelectedTempProductsMain';
// import Lottie from 'lottie-react-native';
// import {ActivityIndicator} from 'react-native-paper';

function AllProductCategoryMain({navigation}) {
  const userData = useSelector(state => state.requiredata.userData);
  const selectedItems = useSelector(state => state.requiredata.selectedItem);

  console.log('home.js userData===>', userData);
  const [allCategory, setAllCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const items = [
    {
      id: 0,
      //productImg: bannerIcon,
      ProductName: 'Fruits & Vegetables',
      farms: 'Pick up from organic farms',
      star: '⭐⭐⭐⭐⭐',
      Avaliable: '6 Pcs',
      qty: 0,
      itemWeight: 'Approx. 1.2Kg - 1.4kg',
    },
    {
      id: 1,
      //productImg: bannerIcon,
      ProductName: 'Atta,Rice ,Oil',
      farms: 'Pick up from organic farms',
      star: '⭐⭐⭐',
      Avaliable: '4 Pcs',
      qty: 0,
      itemWeight: 'Approx. 1.2Kg - 1.4kg',
    },

    {
      id: 2,
      // productImg: bannerIcon,
      ProductName: 'Masala & Dry fruits',
      farms: 'Pick up from organic farms',
      star: '⭐⭐⭐⭐',
      Avaliable: '3 Pcs',
      qty: 0,
      itemWeight: 'Approx. 1.2Kg - 1.4kg',
    },
    {
      id: 3,
      // productImg: bannerIcon,
      ProductName: 'Sweet craving',
      farms: 'Pick up from organic farms',
      star: '⭐⭐⭐⭐⭐',
      Avaliable: '1 Pcs',
      qty: 0,
      itemWeight: 'Approx. 1.2Kg - 1.4kg',
    },
  ];

  //   {
  //     "_id": "652fbbf83eabc5820f3715c3",
  //     "categoryName": "category",
  //     "categoryIcon": "https://kickrproject.s3.amazonaws.com/84959b81-3f1f-4b69-9f8d-7756ea690de4.png",
  //     "categoryBanner": "https://kickrproject.s3.ap-northeast-1.amazonaws.com/64229ae4-6811-41c2-834c-6e50019a0163.png",
  //     "createdAt": "2023-10-18T11:05:28.964Z",
  //     "updatedAt": "2023-10-18T11:05:28.964Z",
  //     "__v": 0
  // }

  const GetAllCategoryList = async () => {
    setLoading(true);
    const res = await handleGetAllCategoryList();
    if (res.data.result) {
      setLoading(false);
      // console.log('res of GetAllCategoryList', res.data.result);
      setAllCategory(res.data.result);
    } else {
      setLoading(false);
      console.log('error==', res);
    }
  };

  useEffect(() => {
    // getProduct();
    // clear();
    GetAllCategoryList();
  }, []);

  const clear = async () => {
    await AsyncStorage.clear();
  };

  const renderItem = ({item}) => {
    // console.log('item', item);
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          // paddingBottom: 30,
          // backgroundColor: 'red',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
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
          </View>
          <Text
            style={{
              marginLeft: 15,
              color: 'black',
              fontWeight: '600',
              fontSize: 15,
            }}>
            {item.categoryName}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              'AllProductSubCategory',
              {
                itemId: item._id,
                categoryName: item.categoryName,
              },

              // navigation.navigate('ViewList', {
              //   itemId: item._id,
              //   categoryName: item.categoryName,
              // }
            )
          }
          activeOpacity={0.7}
          style={{
            alignItems: 'center',
            backgroundColor: Color.LIGHT_GREEN,
            //backgroundColor: 'green',
            borderRadius: 5,
            // marginVertical: 10,
          }}>
          <Text
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
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const [text, onChangeText] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#29C17E'} barStyle={Color.WHITE} />
      <Header Title={'Select Products'} />
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
      ) : allCategory && allCategory.length > 0 ? (
        <View style={{paddingBottom: '28%'}}>
          <FlatList data={allCategory} renderItem={renderItem} />
          {selectedItems.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SelectedTempProductsMain');
              }}
              style={{
                width: '100%',
                height: 45,
                backgroundColor: Color.DARK_GREEN,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: Color.WHITE, fontSize: 19}}>Continue</Text>
            </TouchableOpacity>
          ) : null}
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

export default AllProductCategoryMain;
