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
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import CustomButton from './src/component/CustomButton/CustomButton';

function Login() {
  const [text, onChangeText] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <StatusBar />
        <View style={styles.loginbox}>
          <Text style={styles.texting}>Login Your Account</Text>
          <Text style={styles.texting1}>
            We've sent an email and password to your ab****************gmail.com
            account
          </Text>
        </View>

        <View style={styles.loginbox}>
          <Text style={styles.texting2}>UserName</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
          <Text style={styles.texting2}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            keyboardType="numeric"
          />
        </View>
        <CustomButton
          Title={'Login'}
          onPress={() => navigation.navigate('Passport')}
          style={styles.btnStyle}
        />
      </KeyboardAvoidingView>
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
    width: responsiveWidth(95),
    //backgroundColor: 'purple',
    paddingVertical: responsiveHeight(2),
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
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
    fontSize: responsiveFontSize(2),
    alignSelf: 'center',
  },
  texting2: {
    fontSize: responsiveFontSize(2),
    paddingLeft: responsiveWidth(3),
  },
  input: {
    height: responsiveHeight(8),
    margin: 12,
    borderWidth: 0.8,
    borderRadius: 4,
    padding: 10,
  },
});

export default Login;
