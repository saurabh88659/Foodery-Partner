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
  ImageBackground,
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
import {useSelector} from 'react-redux';
import {
  handleGetNotificationCount,
  handleisReadNotification,
} from '../features/APIs/apiRequest';
import {useState, useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';

export default function HeaderHome({navigation}) {
  const [notificationCounts, setNotificationCount] = useState(0);
  const userData = useSelector(state => state.requiredata.userData);
  console.log('###userData at home header=======>>>', userData);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      GetNotificationCount();
    }
  }, [isFocused]);

  const GetNotificationCount = async () => {
    const res = await handleGetNotificationCount();
    if (res.data.status) {
      setNotificationCount(res.data.count);
    } else {
      console.log('error==', res);
    }
  };

  const isReadNotification = async () => {
    const res = await handleisReadNotification();
    console.log('++++++++++++++++++++++++++++==read ture====>', res.data);
    console.log('notification readed');
  };

  const GotoNotificationPage = () => {
    navigation.navigate('Notification');
    isReadNotification();
  };

  return (
    <View style={styles.loginbox}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.img}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require('../Assests/Images/profilePicture123.png')}
              style={styles.imagebox}>
              {userData?.profileImageUrl ? (
                <Image
                  source={{uri: userData.profileImageUrl}}
                  style={{
                    width: responsiveWidth(14),
                    height: responsiveWidth(14),
                    borderRadius: responsiveWidth(15),
                    resizeMode: 'cover',
                    alignSelf: 'center',
                  }}
                />
              ) : null}
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <View style={styles.store}>
          <Text style={styles.texting}>{userData?.shopsDetails?.shopName}</Text>
          <View
            style={{flexDirection: 'row', marginTop: 8, alignItems: 'center'}}>
            <Ionicons name="location" color={Color.WHITE} size={18} />
            <Text style={styles.texting3}>{userData?.shopsDetails?.city}</Text>
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
            color={Color.WHITE}
            size={22}
            style={{margin: responsiveWidth(2)}}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={GotoNotificationPage}>
          {notificationCounts > 0 && (
            <View
              style={{
                position: 'absolute',
                top: 2,
                right: 2,
                height: 18,
                width: 18,
                backgroundColor: 'red',
                zIndex: 2,
                borderRadius: 9,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff', fontWeight: '800', fontSize: 11}}>
                {notificationCounts}
              </Text>
            </View>
          )}
          <Ionicons
            name="notifications"
            color={Color.WHITE}
            size={22}
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
    // backgroundColor: 'pink',
    borderRadius: responsiveWidth(15),
    marginLeft: responsiveWidth(1.5),
    borderWidth: 3,
    borderColor: Color.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
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
  imagebox: {
    borderWidth: 1,
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 0,
    borderColor: 'grey',
    backgroundColor: 'white',
    // borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },

  imageContainer: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    backgroundColor: Color.WHITE,
    alignSelf: 'center',
    borderRadius: responsiveWidth(32),
    // marginTop: responsiveHeight(8),
    borderWidth: 10,
    borderColor: Color.Green_Top,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
