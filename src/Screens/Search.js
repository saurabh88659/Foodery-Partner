import {View, Text} from 'react-native';
import React from 'react';
import {Searchbar} from 'react-native-paper';

export default function Search() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    </View>
  );
}
