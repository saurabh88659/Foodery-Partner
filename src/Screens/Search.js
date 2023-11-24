import {View, Text} from 'react-native';
import React from 'react';
import {Searchbar} from 'react-native-paper';
import Color from '../Utils/Color';

export default function Search() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  return (
    <View style={{paddingHorizontal: 10}}>
      <View style={{marginVertical: 20}}>
        <Searchbar
          style={{backgroundColor: Color.grayShade}}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
    </View>
  );
}
