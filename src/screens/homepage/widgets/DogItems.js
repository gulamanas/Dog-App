import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

const DogItems = ({item, onPress}) => (
  <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(item)}>
    <Image
      source={{
        uri: `https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`,
      }}
      style={styles.image}
    />
    <View style={styles.textItemContainer}>
      <Text style={styles.dogName}>{item.name}</Text>
      <Text style={styles.dogBreed}>{item.breed_group}</Text>
    </View>
  </TouchableOpacity>
);

export default DogItems;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 12,
  },
  textItemContainer: {},
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  dogName: {
    fontSize: 16,
    fontWeight: '500',
  },
  dogBreed: {
    color: '#EB9DF8',
  },
});
