import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import Color from '../Utils/Color';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import CustomButton from '../component/CustomButton/CustomButton';
export default function EditProfile({navigation}) {
  const [text, onChangeText] = React.useState('Amit kumar');
  const [text1, onChangeText1] = React.useState('10/08/1989');
  const [text2, onChangeText2] = React.useState('Vmart');
  const [text3, onChangeText3] = React.useState('Lakshmi Nagar');
  const [text4, onChangeText4] = React.useState('Delhi');
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor={Color.Green_Top} />

      {/* -------------------------header--------------------------- */}
      <View style={styles.header}>
        <View style={styles.one}></View>
        <View style={styles.main}>
          <View style={styles.imageContainer}>
            {/* <Image
                source={require('../Assests/Images/fruits.png')}
                style={{
                  width: responsiveWidth(100),
                  height: responsiveHeight(100),
                }}
              /> */}
          </View>
        </View>
        <View style={styles.one}></View>
      </View>
      {/* ------------------------------body------------------------------ */}
      <TouchableOpacity style={styles.card}>
        <Icon name="user" color={Color.DARK_PURPLE} size={18} />
        <TextInput
          style={{
            //backgroundColor: 'skyblue',
            width: responsiveWidth(72),
            height: responsiveHeight(5),
            marginLeft: 2,
            padding: 5,
            color: Color.BLACK,
          }}
          onChangeText={onChangeText}
          value={text}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.card1}>
        <Icon name="gift" color={Color.DARK_PURPLE} size={19} />
        <TextInput
          style={{
            //backgroundColor: 'skyblue',
            width: responsiveWidth(72),
            height: responsiveHeight(5),
            marginLeft: 2,
            padding: 5,
            color: Color.BLACK,
          }}
          onChangeText={onChangeText1}
          value={text1}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.card1}>
        <Icon name="building" color={Color.DARK_PURPLE} size={19} />
        <TextInput
          style={{
            //backgroundColor: 'skyblue',
            width: responsiveWidth(72),
            height: responsiveHeight(5),
            marginLeft: 2,
            padding: 5,
            color: Color.BLACK,
          }}
          onChangeText={onChangeText2}
          value={text2}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.card1}>
        <Icon name="map-marked-alt" color={Color.DARK_PURPLE} size={19} />
        <TextInput
          style={{
            //backgroundColor: 'skyblue',
            width: responsiveWidth(72),
            height: responsiveHeight(5),
            marginLeft: 2,
            padding: 5,
            color: Color.BLACK,
          }}
          onChangeText={onChangeText3}
          value={text3}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.card1}>
        <MaterialIcons
          name="location-city"
          color={Color.DARK_PURPLE}
          size={19}
        />
        <TextInput
          style={{
            //backgroundColor: 'skyblue',
            width: responsiveWidth(72),
            height: responsiveHeight(5),
            marginLeft: 2,
            padding: 5,
            color: Color.BLACK,
          }}
          onChangeText={onChangeText4}
          value={text4}
        />
      </TouchableOpacity>

      <CustomButton
        Title={'Save Changes'}
        //onPress={() => navigation.navigate('Store')}
        style={styles.btnStyle}
      />
      <CustomButton
        Title={'Change Your Bank Details'}
        //onPress={() => navigation.navigate('Store')}
        style={styles.btnStyle}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Color.BG,
  },
  header: {
    height: responsiveHeight(18),
    width: responsiveWidth(100),
    backgroundColor: Color.Green_Top,
    flexDirection: 'row',
  },
  one: {
    height: responsiveHeight(20),
    width: responsiveWidth(15),
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: responsiveHeight(5),
  },
  main: {
    height: responsiveHeight(20),
    width: responsiveWidth(70),
    //backgroundColor: 'blue',
  },
  imageContainer: {
    height: responsiveWidth(32),
    width: responsiveWidth(32),
    backgroundColor: Color.WHITE,
    alignSelf: 'center',
    borderRadius: responsiveWidth(32),
    marginTop: responsiveHeight(8),
    borderWidth: 10,
    borderColor: Color.Green_Top,
  },
  card: {
    marginHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1),
    flexDirection: 'row',
    elevation: 1,
    marginTop: responsiveHeight(11.5),
    paddingLeft: responsiveWidth(5),
    backgroundColor: Color.WHITE,
    alignItems: 'center',
  },
  card1: {
    marginHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1),
    flexDirection: 'row',
    elevation: 1,
    marginTop: responsiveHeight(1),
    paddingLeft: responsiveWidth(5),
    backgroundColor: Color.WHITE,
    alignItems: 'center',
  },
  texting: {
    color: Color.BLACK,
    fontSize: responsiveFontSize(2),
    textAlignVertical: 'center',
    marginLeft: 10,
  },
  btnStyle: {
    backgroundColor: Color.Green_Top,
    height: responsiveHeight(6),
    width: responsiveWidth(70),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(2),
    // borderWidth: 1,
    // borderColor:Color.Green_Top,
    marginTop: responsiveHeight(2),
  },
});
