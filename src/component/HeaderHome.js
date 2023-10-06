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

export default function HeaderHome({navigation}) {
  return (
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
        <TouchableOpacity onPress={() => navigation.navigate('ViewList')}>
          <Ionicons
            name="search"
            color={'black'}
            size={20}
            style={{margin: responsiveWidth(2)}}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="notifications"
            color={'black'}
            size={20}
            style={{margin: responsiveWidth(2)}}
          />
        </TouchableOpacity>
      </View>
    </View>
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
