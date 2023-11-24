import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import Header from '../component/Header';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Color from '../Utils/Color';

const ViewTransactionDetailsScreen = ({navigation}) => {
  const data = [1, 3];
  const maindata = [1, 4, 5];
  return (
    <View style={{flex: 1}}>
      {/* <StatusBar backgroundColor={'#29C17E'} /> */}
      <Header
        Title={'Transaction Details'}
        onPress={() => navigation.goBack('')}
      />

      <ScrollView contentContainerStyle={{}}>
        {maindata.map(() => (
          <View
            style={{
              paddingHorizontal: 10,
              paddingTop: 20,
              // marginBottom: 15,
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 5,
                borderRadius: 7,
                elevation: 5,
              }}>
              <View style={{paddingTop: 5}}>
                <Text style={{color: Color.BLACK, fontSize: 16}}>
                  Order Id : 1234589
                </Text>
                {data.map((item, index) => (
                  <View
                    style={{
                      paddingVertical: 5,
                      borderBottomColor: Color.grayShade,
                      borderBottomWidth: 1,
                    }}
                    key={index}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{width: 80, color: Color.BLACK, fontSize: 15}}>
                        Item
                      </Text>
                      <Text style={{color: Color.DARK_GRAY, fontSize: 15}}>
                        Fruits
                      </Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{width: 80, color: Color.BLACK, fontSize: 15}}>
                        Quantity
                      </Text>
                      <Text style={{fontSize: 15, color: Color.DARK_GRAY}}>
                        2kg
                      </Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{width: 80, color: Color.BLACK, fontSize: 15}}>
                        Amount
                      </Text>
                      <Text style={{fontSize: 15, color: Color.DARK_GRAY}}>
                        $50
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          width: 140,
                          color: Color.BLACK,
                          fontSize: 15,
                          marginBottom: 3,
                        }}>
                        Payment Received
                      </Text>
                      <Text>+45</Text>
                    </View>
                  </View>
                ))}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  height: 40,
                  marginTop: 5,
                }}>
                <Text style={{color: Color.BLACK, fontSize: 18}}>
                  Grand Total
                </Text>
                <Text style={{color: Color.DARK_GRAY, fontSize: 18}}>$75</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ViewTransactionDetailsScreen;

const styles = StyleSheet.create({});
