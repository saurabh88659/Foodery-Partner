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
import CustomButton from './src/component/CustomButton/CustomButton';
import Color from './src/Utils/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';

function Store() {
  const items = [
    {
      id: 0,
      //productImg: bannerIcon,
      ProductName: 'Soap',
      farms: 'Pick up from organic farms',
      star: '⭐⭐⭐⭐⭐',
      Avaliable: '6 Pcs',
      qty: 0,
      itemWeight: 'Approx. 1.2Kg - 1.4kg',
    },
    {
      id: 1,
      //productImg: bannerIcon,
      ProductName: 'Butter',
      farms: 'Pick up from organic farms',
      star: '⭐⭐⭐',
      Avaliable: '4 Pcs',
      qty: 0,
      itemWeight: 'Approx. 1.2Kg - 1.4kg',
    },

    {
      id: 2,
      // productImg: bannerIcon,
      ProductName: 'Bread',
      farms: 'Pick up from organic farms',
      star: '⭐⭐⭐⭐',
      Avaliable: '3 Pcs',
      qty: 0,
      itemWeight: 'Approx. 1.2Kg - 1.4kg',
    },
    {
      id: 3,
      // productImg: bannerIcon,
      ProductName: 'Milk',
      farms: 'Pick up from organic farms',
      star: '⭐⭐⭐⭐⭐',
      Avaliable: '1 Pcs',
      qty: 0,
      itemWeight: 'Approx. 1.2Kg - 1.4kg',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          //borderBottomWidth: 0.5,

          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          //backgroundColor: 'blue',
          //borderStyle: 'dotted',
          //borderRadius: 1,
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
            activeOpacity={0.7}
            style={{
              alignItems: 'center',
              backgroundColor: Color.LIGHT_Gray,
              //backgroundColor: 'green',
            }}>
            <Text
              style={{
                alignItems: 'flex-end',
                padding: 5,
                fontSize: responsiveFontSize(1.5),
                color: Color.red,
              }}>
              Out of Stock
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
      <StatusBar />
      <View style={styles.loginbox}>
        <View style={styles.img}></View>
        <View style={styles.store}>
          <Text style={styles.texting}>Store Name</Text>
          <View style={{flexDirection: 'row'}}>
            <Ionicons name="location" color={'black'} size={20} />
            <Text style={styles.texting}>Noida</Text>
          </View>
        </View>
      </View>
      <Text style={styles.texting1}>Sub Listing</Text>

      <FlatList data={items} renderItem={renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    //backgroundColor: 'green',
  },
  loginbox: {
    width: responsiveWidth(100),
    backgroundColor: '#fff',
    paddingVertical: responsiveHeight(2),
    alignSelf: 'center',
    //marginTop: responsiveHeight(2),
    flexDirection: 'row',
    elevation: 2,
  },
  img: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    backgroundColor: 'pink',
    borderRadius: responsiveWidth(15),
    marginLeft: responsiveWidth(1.5),
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
    fontSize: responsiveFontSize(2.5),
    alignSelf: 'center',
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
    marginLeft: responsiveWidth(2),
  },
});

export default Store;
