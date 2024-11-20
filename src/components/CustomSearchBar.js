import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from '@rneui/themed';

const CustomSearchBar = ({value, onChangeText, onSearchPress}) => {
  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search by name or breed..."
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
      />
      <TouchableOpacity onPress={onSearchPress}>
        <Icon
          name="search"
          type="feather"
          color="#666"
          size={20}
          containerStyle={styles.iconContainer}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 30,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  iconContainer: {
    marginLeft: 10,
  },
});

export default CustomSearchBar;
