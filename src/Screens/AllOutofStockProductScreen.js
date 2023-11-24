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
import {
  handleGetAllOutOfStock,
  handleInStockOutStockFunctionality,
} from '../features/APIs/apiRequest';
import Header from '../component/Header';
import {useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function AllOutofStockProductScreen({navigation, route}) {
  const userData = useSelector(state => state.requiredata.userData);
  const [refreshKey, setRefreshKey] = useState(0);

  const [getAllOutOfStockPrduct, setGetAllOutOfStockPrduct] = useState([]);
  useEffect(() => {
    getAllOutOfStock();
  }, [refreshKey]);

  const getAllOutOfStock = async () => {
    const res = await handleGetAllOutOfStock();
    console.log('res of get all out of stock=====>', res.data);
    if (res.data.status) {
      setGetAllOutOfStockPrduct(res.data.result);
    }
  };

  const InStockStockFun = async productId => {
    console.log('run InStockStockFun');

    const handleInStockOutStockFunctionalityObj = {
      inStock: true,
      vendorId: userData._id,
      productId: productId,
    };
    console.log(
      'handleInStockOutStockFunctionalityObj iobject===>',
      handleInStockOutStockFunctionalityObj,
    );
    const res = await handleInStockOutStockFunctionality({
      handleInStockOutStockFunctionalityObj,
    });
    console.log('res of InstockOutStockFun', res);
    if (res.data.status) {
      setRefreshKey(refreshKey + 1);
      Toast.show(res.data.message, Toast.SHORT);
    } else {
      console.log('error of InstockOutStockFun==', res);
    }
  };

  const renderItem = ({item}) => {
    console.log('item of Out of stock of Catagory====>', item);
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          //   padding: 10,
          backgroundColor: Color.BG,
          justifyContent: 'space-between',
          paddingBottom: 10,
          // height: 200,
        }}>
        <View
          style={{
            // height: 170,
            backgroundColor: '#fff',
            marginHorizontal: 16,
            marginVertical: 6,
            alignItems: 'center',
            width: responsiveWidth(42),
            borderRadius: 5,
            elevation: 4,
            paddingHorizontal: 10,
            //backgroundColor: 'pin',
            //paddingHorizontal: responsiveWidth(6),
          }}>
          <Image
            // source={require('../Assests/Images/fruits.png')}
            source={{uri: item.productImage}}
            style={{
              height: responsiveWidth(15),
              width: responsiveWidth(24),
              marginHorizontal: responsiveWidth(2),
              marginVertical: responsiveHeight(2),
            }}
          />
          <View style={{width: responsiveWidth(37)}}>
            <Text numberOfLines={1} style={styles.texting4}>
              {item.productName}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              //backgroundColor: 'purple',
              width: responsiveWidth(37),
              paddingVertical: responsiveHeight(1),
            }}>
            <Text style={styles.texting4}>₹ {item.productPrice}</Text>
            <TouchableOpacity
              onPress={() => InStockStockFun(item._id)}
              // activeOpacity={0.7}
              style={{
                alignItems: 'center',
                backgroundColor: Color.WHITE,
                borderColor: Color.red,
                borderWidth: 0.5,
                borderRadius: 2,
              }}>
              <Text
                style={{
                  padding: 2,
                  fontSize: responsiveFontSize(1.5),
                  color: Color.red,
                }}>
                Out Stock
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const [text, onChangeText] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Header Title={'Out of Stock'} />
      <View
        style={{
          paddingBottom: responsiveHeight(1),
          paddingTop: 20,
          // backgroundColor: 'red',
          flex: 1,
        }}>
        {getAllOutOfStockPrduct.length < 0 ? (
          <View
            style={{
              // backgroundColor: 'red',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: Color.DARK_GRAY}}>
              No Data Found
            </Text>
          </View>
        ) : (
          <FlatList
            numColumns={2}
            data={getAllOutOfStockPrduct}
            renderItem={renderItem}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    backgroundColor: Color.BG,
  },
  loginbox: {
    width: responsiveWidth(100),
    backgroundColor: '#CBECE1',
    paddingVertical: responsiveHeight(2),
    alignSelf: 'center',
    //marginTop: responsiveHeight(2),
    flexDirection: 'row',
    elevation: 3,
    justifyContent: 'space-between',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  img: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    //backgroundColor: 'pink',
    borderRadius: responsiveWidth(15),
    marginLeft: responsiveWidth(2.8),
    borderWidth: 1,
    borderColor: Color.LIGHT_Gray,
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
    color: Color.BLACK,
    fontWeight: 'bold',
  },
  texting3: {
    fontSize: responsiveFontSize(2),
    alignSelf: 'center',
    color: Color.BLACK,
  },
  texting1: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginVertical: 8,
    color: '#000',
  },
  texting2: {
    fontSize: responsiveFontSize(2),
    paddingLeft: responsiveWidth(3),
  },
  texting4: {
    fontSize: responsiveFontSize(1.5),
    color: '#000',
  },
  store: {
    //backgroundColor: 'teal',
    padding: 8,
    //marginLeft: responsiveWidth(2),
  },
});

export default AllOutofStockProductScreen;
