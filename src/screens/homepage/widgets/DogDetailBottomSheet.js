import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {BottomSheet} from '@rneui/themed';
import {getHeightInFeet, getWeightInKg} from '../../../utils/unitCalculation';

const DogDetailsBottomSheet = ({isVisible, onClose, item}) => (
  <BottomSheet isVisible={isVisible} onBackdropPress={onClose}>
    <View style={styles.bottomSheetContainer}>
      {item && (
        <View style={styles.content}>
          <View style={styles.handle}></View>
          <Image
            source={{
              uri: `https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`,
            }}
            style={styles.bottomSheetImage}
          />
          <Text style={styles.bottomSheetText}>{item.name}</Text>
          <View style={styles.details}>
            <Text style={styles.detail}>
              Weight: ({getWeightInKg(item?.weight?.metric ?? 0)})Kg
            </Text>
            <Text style={styles.detail}>
              Height: ({getHeightInFeet(item?.height?.metric ?? 0)})Ft
            </Text>
            <Text style={styles.detail}>Life Span: ({item.life_span})</Text>
            <Text style={styles.detail}>Breed: {item.breed_group}</Text>
            <Text style={styles.detail}>Bred For: {item.bred_for}</Text>
          </View>
        </View>
      )}
    </View>
  </BottomSheet>
);

export default DogDetailsBottomSheet;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    height: 400,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  handle: {
    width: 60,
    height: 5,
    backgroundColor: '#9B9B9B',
    marginBottom: 20,
    borderRadius: 10,
  },
  bottomSheetImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  bottomSheetText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  detail: {
    backgroundColor: '#F0F0F0',
    padding: 5,
    borderRadius: 4,
  },
});
