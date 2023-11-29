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
  handleGetAllCategoryList,
  handleGetAllproductCategory,
  handleInStockOutStockFunctionality,
  SelectedItemSubmit,
} from '../features/APIs/apiRequest';
import Toast from 'react-native-simple-toast';
import Header from '../component/Header';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAdminIsAccepted,
  setSelectedItemnull,
  toggleSelection,
} from '../features/requireDataReducer/requiredata.reducer';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {setLoggedIn} from '../features/auth/auth.reducer';
import SelectedTempProductsScreenComponent from '../component/SelectedTempProductsScreenComponent';

function SelectedTempProductsScreen({navigation, route}) {
  const desireFunctionKey = useSelector(
    state => state.requiredata.desireFunctionKey,
  );
  console.log(
    '++++++++++++++++++++++++++++++++desireFunctionKey+++++++=',
    desireFunctionKey,
  );
  // const differKey = route.params;
  // console.log('++++d++++++ifferkey===>', differKey);
  const userData = useSelector(state => state.requiredata.userData);
  const vendorId = useSelector(state => state.requiredata.vendorId);
  console.log('+++vendor id on seleted item temp list', vendorId);
  console.log('userData at SelectedTempProductsScreen=====>>', userData);
  const selectedItems = useSelector(state => state.requiredata.selectedItem);
  console.log('####selected items=============>', selectedItems);
  const dispatch = useDispatch();
  const [allCategoryProducts, setAllCategoryProducts] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleSelectedItemSubmit = async () => {
    setButtonLoading(true);
    const res = await SelectedItemSubmit({
      selectedItems: selectedItems,
      userId: vendorId,
    });
    console.log('res of handleSelectedItemSubmit ===>', res.data);
    if (res.data.status) {
      Toast.show('Products added successfully', Toast.SHORT);
      dispatch(setLoggedIn(true));
      dispatch(setAdminIsAccepted(true));
      setButtonLoading(false);
    } else {
      setButtonLoading(false);
      console.log('error==', res);
    }
  };

  const DesireFunction = async () => {
    if (desireFunctionKey) {
      console.log('desireFunctionKey=====>>>>', desireFunctionKey);
      setButtonLoading(true);
      const res = await SelectedItemSubmit({
        selectedItems: selectedItems,
        userId: userData._id,
      });
      console.log('res of handleSelectedItemSubmit ===>', res.data);
      if (res.data.status) {
        navigation.navigate('Home');
        Toast.show('Products added successfully', Toast.SHORT);
        setButtonLoading(false);
        dispatch(setSelectedItemnull([]));
      } else {
        setButtonLoading(false);
        console.log('error==', res);
      }
      console.log('++++++DesireFunction if==');
    } else {
      handleSelectedItemSubmit();
      console.log('+++++DesireFunction else=');
    }
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
          activeOpacity={1}
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
            // borderColor: selectedItems.some(
            //   selectedItem => selectedItem._id === item._id,
            // )
            //   ? 'green'
            //   : 'red',

            // selectedItems.includes(item._id) ? 'green' : 'red',
            // borderWidth: 1,

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
  const checkTest = () => {
    console.log('tesing function');
  };

  return (
    <SafeAreaView key={refreshKey} style={styles.container}>
      <StatusBar />
      <Header Title={'Selected Products'} onPress={() => navigation.goBack()} />
      {/* <Text style={styles.texting1}>Selected Products</Text> */}
      {/* <View style={{paddingBottom: responsiveHeight(22)}}>
        <FlatList numColumns={2} data={selectedItems} renderItem={renderItem} />
      </View> */}
      <SelectedTempProductsScreenComponent
        onPress={DesireFunction}
        buttonLoading={buttonLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: responsiveHeight(100),
    // width: responsiveWidth(100),
    backgroundColor: Color.BG,
    // backgroundColor: 'red',
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

export default SelectedTempProductsScreen;
