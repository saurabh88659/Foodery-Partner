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
  Image,
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

function Store({navigation}) {
  const items = [
    {
      id: 0,
      //productImg: bannerIcon,
      ProductName: 'Mango',
      farms: 'Pick up from organic farms',
      star: '⭐⭐⭐⭐⭐',
      Avaliable: '6 Pcs',
      qty: 0,
      itemWeight: 'Approx. 1.2Kg - 1.4kg',
      Rate: 'Rs.610',
    },
    {
      id: 1,
      //productImg: bannerIcon,
      ProductName: 'Tender Coconut',
      farms: 'Pick up from organic farms',
      star: '⭐⭐⭐',
      Avaliable: '4 Pcs',
      qty: 0,
      itemWeight: 'Approx. 1.2Kg - 1.4kg',
      Rate: 'Rs.610',
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
      Rate: 'Rs.610',
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
      Rate: 'Rs.610',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          //   padding: 10,
          backgroundColor: Color.BG,
          justifyContent: 'space-between',
          paddingBottom: 10,
        }}>
        <View
          style={{
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
            source={require('../Assests/Images/fruits.png')}
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
              onPress={() => navigation.navigate('ViewDetails')}
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
        </View>
        <View
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
        </View>
      </View>
    );
  };

  const [text, onChangeText] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

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

      <Text style={styles.texting1}>Fruits & Vegetables</Text>
      <View style={{paddingBottom: responsiveHeight(22)}}>
        <FlatList data={items} renderItem={renderItem} />
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

export default Store;
