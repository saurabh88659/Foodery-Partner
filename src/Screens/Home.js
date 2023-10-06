import React from 'react';

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

function Home({navigation}) {
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

  const getProduct = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token, '---------->i am token');
    try {
      const response = await axios(mobileRecharge, {
        headers: {Authorization: `Bearer ${token}`},
      });
      console.log('resp--->>>', response.data.data);
    } catch (err) {
      console.log('errrr----->>>', err);

      //Toast.show('server error.');
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   getProduct();
  // }, []);

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: responsiveWidth(12),
              height: responsiveWidth(12),
              borderRadius: responsiveWidth(12),
              backgroundColor: 'pink',
            }}></View>
          <Text style={{marginLeft: 8, color: 'black'}}>
            {item.ProductName}
          </Text>
        </View>
        {item.qty >= 1 && (
          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: 'green',
            }}>
            <Text
              style={{
                alignItems: 'flex-end',
                padding: 5,
                fontSize: responsiveFontSize(1.5),
              }}>
              {item.qty}
            </Text>
          </TouchableOpacity>
        )}

        {item.qty == 0 && (
          <TouchableOpacity
            onPress={() => navigation.navigate('ViewList')}
            activeOpacity={0.7}
            style={{
              alignItems: 'center',
              backgroundColor: Color.LIGHT_GREEN,
              //backgroundColor: 'green',
              borderRadius: 5,
            }}>
            <Text
              style={{
                alignItems: 'flex-end',
                padding: 5,
                fontSize: responsiveFontSize(1.5),
                color: Color.WHITE,
              }}>
              View List
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const [text, onChangeText] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#29C17E'} barStyle={Color.WHITE} />
      <View style={styles.loginbox}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.img}></View>
          <View style={styles.store}>
            <Text style={styles.texting}>Store Name</Text>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="location" color={'black'} size={18} />
              <Text style={styles.texting3}>Noida</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            padding: 5,
            //backgroundColor: 'pink',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Ionicons
              name="search"
              color={'black'}
              size={20}
              style={{margin: responsiveWidth(2)}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Ionicons
              name="notifications"
              color={'black'}
              size={20}
              style={{margin: responsiveWidth(2)}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList data={items} renderItem={renderItem} />
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
    backgroundColor: '#CBECE1',
    paddingVertical: responsiveHeight(2),
    alignSelf: 'center',
    //marginTop: responsiveHeight(2),
    flexDirection: 'row',
    elevation: 3,
    justifyContent: 'space-between',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  img: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    //backgroundColor: 'pink',
    borderRadius: responsiveWidth(15),
    marginLeft: responsiveWidth(1.5),
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
  },
  texting2: {
    fontSize: responsiveFontSize(2),
    paddingLeft: responsiveWidth(3),
  },
  store: {
    //backgroundColor: 'teal',
    padding: 5,
    //marginLeft: responsiveWidth(2),
  },
});

export default Home;
