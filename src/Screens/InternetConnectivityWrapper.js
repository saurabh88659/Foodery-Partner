// InternetConnectivityWrapper.js
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const InternetConnectivityWrapper = ({children}) => {
  const [isConnected, setIsConnected] = useState(true); // Assuming initially connected

  useEffect(() => {
    const checkNetInfo = async () => {
      const netInfoState = await NetInfo.fetch();
      console.log('Internet Connection Status:', netInfoState.isConnected);
      setIsConnected(netInfoState.isConnected);
    };

    checkNetInfo();
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('state=====>', state);
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (!isConnected) {
    return (
      <View
        style={{
          //   backgroundColor: 'red',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MaterialIcons name={'wifi-off'} size={31} color={'red'} />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            color: '#000',
            marginTop: 20,
          }}>
          No Internet Connection
        </Text>
      </View>
    );
  }
  return <>{children}</>;
};

export default InternetConnectivityWrapper;
