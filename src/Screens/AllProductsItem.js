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
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Color from '../Utils/Color';

import {
  handleGetAllproductCategory,
  handleInStockOutStockFunctionality,
} from '../features/APIs/apiRequest';
import Toast from 'react-native-simple-toast';
import Header from '../component/Header';
import {useDispatch, useSelector} from 'react-redux';
import {toggleSelection} from '../features/requireDataReducer/requiredata.reducer';
function AllProductsItem({navigation, route}) {
  const selectedItems = useSelector(state => state.requiredata.selectedItem);
  console.log('####selected items======>', selectedItems);
  const dispatch = useDispatch();
  const [allCategoryProducts, setAllCategoryProducts] = useState();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    GetAllproductItems();
  }, [refreshKey]);
  const requireData = route.params.data;
  console.log('requireData====>>>====>', requireData);

  const GetAllproductItems = async () => {
    const res = await handleGetAllproductCategory(requireData.itemId);
    console.log('GetAllproductCategory res =====>', res.data);
    if (res.data) {
      setAllCategoryProducts(res.data.result);
    } else {
      console.log('GetAllproductCategory error===', res);
    }
  };

  useEffect(() => {
    if (requireData) {
      GetAllproductItems();
    }
  }, [requireData]);

  const InStockStockFun = async productId => {
    console.log('run InStockStockFun');
    const handleInStockOutStockFunctionalityObj = {
      productStock: 'yes',
    };
    const res = await handleInStockOutStockFunctionality({
      productId,
      handleInStockOutStockFunctionalityObj,
    });
    console.log('res of InstockOutStockFun', res.data);
    if (res.data.status) {
      setRefreshKey(refreshKey + 1);
      Toast.show(res.data.message, Toast.SHORT);
    } else {
      console.log('error of InstockOutStockFun==', res);
    }
  };

  const OutStockStockFun = async productId => {
    console.log('run OutStockStockFun');
    const handleInStockOutStockFunctionalityObj = {
      productStock: 'no',
    };
    const res = await handleInStockOutStockFunctionality({
      productId,
      handleInStockOutStockFunctionalityObj,
    });
    console.log('res of InstockOutStockFun', res.data);
    if (res.data.status) {
      setRefreshKey(refreshKey + 1);

      Toast.show(res.data.message, Toast.SHORT);
    } else {
      console.log('error of InstockOutStockFun==', res);
    }
  };

  const handlePress = item => {
    dispatch(toggleSelection(item));
  };

  const renderItem = ({item}) => {
    console.log('item of getproductof Catagory', item);
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
          // backgroundColor: 'red',
        }}>
        <TouchableOpacity
          onPress={() => handlePress(item)}
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
            // backgroundColor: 'red',
            borderColor: selectedItems.some(
              selectedItem => selectedItem._id === item._id,
            )
              ? 'green'
              : 'red',

            // selectedItems.includes(item._id) ? 'green' : 'red',
            borderWidth: 1,

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

            {/* <TouchableOpacity
              onPress={() =>
                item.productStock == 'yes'
                  ? OutStockStockFun(item._id)
                  : InStockStockFun(item._id)
              }
              activeOpacity={0.7}
              style={{
                alignItems: 'center',
                backgroundColor: Color.WHITE,
                borderColor:
                  item.productStock == 'yes' ? Color.LIGHT_GREEN : Color.red,
                borderWidth: 0.5,
                borderRadius: 2,
              }}>
              <Text
                style={{
                  padding: 2,
                  fontSize: responsiveFontSize(1.5),
                  color:
                    item.productStock == 'yes' ? Color.LIGHT_GREEN : Color.red,
                }}>
                {item.productStock == 'yes' ? 'In Stock' : 'Out Stock'}
              </Text>
            </TouchableOpacity> */}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const [text, onChangeText] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <SafeAreaView key={refreshKey} style={styles.container}>
      <StatusBar />
      <Header Title={'Products'} onPress={() => navigation.goBack()} />
      <Text style={styles.texting1}>{requireData.categoryName}</Text>
      <View style={{paddingBottom: responsiveHeight(22)}}>
        <FlatList
          numColumns={2}
          data={allCategoryProducts}
          renderItem={renderItem}
        />
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

export default AllProductsItem;
