import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Searchbar} from 'react-native-paper';
import Color from '../Utils/Color';
import {
  handleInStockOutStockFunctionality,
  handleOnSearchQuery,
  handleVEndorCurrentBalance,
} from '../features/APIs/apiRequest';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import {setSearchQuerySave} from '../features/requireDataReducer/requiredata.reducer';
import Header from '../component/Header';

export default function Search({navigation}) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.requiredata.userData);
  const searchQuerySave = useSelector(
    state => state.requiredata.searchQuerySave,
  );

  const [refreshKey, setRefreshKey] = useState(0);
  const [nullMessage, setNullMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  console.log('##searchQuery===>', searchQuery);
  useEffect(() => {
    const fetchSearchResults = async () => {
      setNullMessage('');

      if (searchQuery.trim() === '') {
        // dispatch(setSearchQuerySave(searchQuery));
        // setLoading(true);
        setSearchResults([]);
        return;
      }
      const res = await handleOnSearchQuery(searchQuery);
      setLoading(false);
      console.log('@@@@res of fetchSearchResults', res?.data);
      if (res.data?.result) {
        setSearchResults(res?.data?.result);
      } else {
        console.log('@@@error of fetchSearchResults>>>>', res);
        // setNullMessage(res.response.data.message);
        setNullMessage(res?.response?.data?.message);
      }
    };
    const delayDebounceFn = setTimeout(() => {
      fetchSearchResults();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, refreshKey]);

  // const OnSearchQuery = async () => {
  //   setLoading(true);
  //   const res = await handleOnSearchQuery(searchQuery);
  //   if (res.data) {
  //     setLoading(false);
  //     console.log(
  //       'res of GetVendorCurrentBalance===>at wallet',
  //       res.data.vendorBalance,
  //     );
  //   } else {
  //     setLoading(false);
  //     console.log(' GetVendorCurrentBalance error==', res);
  //   }
  // };

  const InStockStockFun = async productId => {
    console.log('run InStockStockFun at search=====>>');
    const handleInStockOutStockFunctionalityObj = {
      inStock: true,
      vendorId: userData._id,
      productId: productId,
    };
    const res = await handleInStockOutStockFunctionality({
      handleInStockOutStockFunctionalityObj,
    });
    console.log('res of InstockOutStockFun at search', res.data);
    if (res.data.status) {
      setRefreshKey(refreshKey + 1);
      Toast.show(res.data.message, Toast.SHORT);
    } else {
      console.log('error of InstockOutStockFun==', res);
    }
  };

  const OutStockStockFun = async productId => {
    console.log('run OutStockStockFun at search==>');
    const handleInStockOutStockFunctionalityObj = {
      inStock: false,
      vendorId: userData._id,
      productId: productId,
    };
    const res = await handleInStockOutStockFunctionality({
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

  const renderItem = ({item}) => {
    console.log('item of searchqueryProduct', item);
    return (
      <View
        key={refreshKey}
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          //   padding: 10,
          backgroundColor: Color.BG,
          justifyContent: 'space-between',
          paddingBottom: 10,
          // height: 200,
          // backgroundColor: 'red',
          width: '49%',
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
              // onPress={() => navigation.navigate('ViewDetails')}
              onPress={() =>
                item.inStock
                  ? OutStockStockFun(item._id)
                  : InStockStockFun(item._id)
              }
              activeOpacity={0.7}
              style={{
                alignItems: 'center',
                backgroundColor: Color.WHITE,
                borderColor: item.inStock ? Color.LIGHT_GREEN : Color.red,
                borderWidth: 0.5,
                borderRadius: 2,
              }}>
              <Text
                style={{
                  padding: 2,
                  fontSize: responsiveFontSize(1.5),
                  color: item.inStock ? Color.LIGHT_GREEN : Color.red,
                }}>
                {/* {item.productStock == 'yes' ? 'In Stock' : 'Out Stock'} */}
                {item.inStock ? 'In Stock' : 'Out Stock'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View
          style={{
            backgroundColor: '#fff',
            marginHorizontal: 12,
            marginVertical: 5,
            alignItems: 'center',
            width: responsiveWidth(40),
            borderRadius: 5,
            elevation: 4,
            paddingHorizontal: 10,
            //backgroundColor: 'pin',
            //paddingHorizontal: responsiveWidth(6),
          }}>
          <Image
            source={require('../Assests/Images/coconut.png')}
            style={{
              height: responsiveWidth(15),
              width: responsiveWidth(24),
              marginHorizontal: responsiveWidth(2),
              marginVertical: responsiveHeight(2),
            }}
          />
          <View style={{width: responsiveWidth(37)}}>
            <Text style={styles.texting4}>{item.ProductName}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              //backgroundColor: 'purple',
              width: responsiveWidth(37),
              paddingVertical: responsiveHeight(1),
            }}>
            <Text style={styles.texting4}>{item.Rate}</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('ViewList')}
              activeOpacity={0.7}
              style={{
                alignItems: 'center',
                backgroundColor: Color.WHITE,
                borderColor: Color.LIGHT_GREEN,
                borderWidth: 0.5,
                borderRadius: 2,
              }}>
              <Text
                style={{
                  padding: 2,
                  fontSize: responsiveFontSize(1.5),
                  color: Color.LIGHT_GREEN,
                }}>
                In Stock
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    );
  };
  return (
    <View style={{paddingHorizontal: 10}}>
      <Header
        Title={'Search Product'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{marginVertical: 20}}>
        <Searchbar
          style={{backgroundColor: Color.grayShade}}
          placeholder="Search for product.."
          onChangeText={text => {
            setSearchQuery(text);
          }}
          value={searchQuery}
        />
        {loading ? (
          <View
            style={{
              height: '80%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={Color.DARK_GREEN} size={32} />
          </View>
        ) : nullMessage ? (
          <View style={{height: '60%', marginTop: 30}}>
            <Text
              style={{
                color: Color.DARK_GRAY,
                fontSize: 18,
                textAlign: 'center',
              }}>
              {nullMessage}
              {/* No products found for {searchQuery}. */}
            </Text>
          </View>
        ) : searchResults && searchResults.length > 0 ? (
          <View style={{paddingTop: 20}}>
            <FlatList
              numColumns={2}
              data={searchResults}
              renderItem={renderItem}
            />
          </View>
        ) : (
          <View style={{backgroundColor: 'red', flex: 1}}></View>
        )}
      </View>
    </View>
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
