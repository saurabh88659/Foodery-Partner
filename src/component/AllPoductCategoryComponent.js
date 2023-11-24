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
// import Lottie from 'lottie-react-native';

function AllPoductCategoryComponent({navigation, onPress}) {
  const userData = useSelector(state => state.requiredata.userData);
  const selectedItems = useSelector(state => state.requiredata.selectedItem);

  console.log('home.js userData===>', userData);
  const [allCategory, setAllCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const GetAllCategoryList = async () => {
    setLoading(true);
    const res = await handleGetAllCategoryList();
    if (res.data.result) {
      setLoading(false);
      setAllCategory(res.data.result);
    } else {
      setLoading(false);
      console.log('error==', res);
    }
  };

  useEffect(() => {
    GetAllCategoryList();
  }, []);

  const renderItem = ({item}) => {
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
            onPress({
              itemId: item._id,
              categoryName: item.categoryName,
            })
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

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View
          style={{
            height: '75%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Lottie
            source={require('../Assests/Lottie/greenLoadingLine.json')}
            autoPlay
            loop={true}
            style={{height: 100, width: 100}}
          /> */}
          <ActivityIndicator color={Color.DARK_GREEN} size={32} />
        </View>
      ) : allCategory && allCategory.length > 0 ? (
        <View style={{paddingBottom: '28%'}}>
          <FlatList data={allCategory} renderItem={renderItem} />
          {/* {selectedItems.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SelectedTempProductsScreen');
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
          ) : null} */}
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

export default AllPoductCategoryComponent;
