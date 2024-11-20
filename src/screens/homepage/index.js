import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomSearchBar from '../../components/CustomSearchBar';
import DogDetailsBottomSheet from './widgets/DogDetailBottomSheet';
import DogItems from './widgets/DogItems';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  const [inputValue, setInputValue] = useState('');
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [dogs, setDogs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchMode, setSearchMode] = useState(false);

  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const BASE_URL = 'https://api.thedogapi.com/v1/breeds';

  useEffect(() => {
    fetchDogs(true);
  }, []);

  const fetchDogs = async (reset = false) => {
    try {
      setLoading(true);

      const url = searchMode
        ? `${BASE_URL}/search?q=${inputValue}`
        : `${BASE_URL}?limit=10&page=${reset ? 1 : page}`;

      const response = await axios.get(url);

      const newDogs = response.data.map((dog, index) => ({
        ...dog,
        id: dog.id || `${dog.name}-${index}`,
      }));

      setDogs(
        reset
          ? newDogs
          : [...dogs, ...newDogs].filter(
              (dog, index, self) =>
                self.findIndex(d => d.id === dog.id) === index,
            ),
      );
      setPage(reset ? 2 : page + 1);
      setSearchMode(false);
    } catch (error) {
      console.error('Error fetching dog data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setSearchMode(true);
    setPage(1);
    await fetchDogs(true);
  };

  const handleLoadMore = async () => {
    if (!loading && !searchMode) {
      await fetchDogs();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setSearchMode(false);
    setPage(1);
    await fetchDogs(true);
    setIsRefreshing(false);
  };

  const handleForm = item => {
    setSelectedItem(item);
    setIsBottomSheetVisible(true);
  };

  const handleClearPress = async () => {
    setInputValue('');
    setSortCriteria(null);
    setSortOrder('asc');
    await fetchDogs(true);
  };

  const sortDogs = () => {
    if (!sortCriteria) return;

    const getAverage = value => {
      const [min, max] = value.split(' - ').map(Number);
      return (min + max) / 2;
    };

    const sortedDogs = [...dogs].sort((a, b) => {
      const aValue = getAverage(a[sortCriteria].metric);
      const bValue = getAverage(b[sortCriteria].metric);

      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    setDogs(sortedDogs);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dogs</Text>

      <CustomSearchBar
        value={inputValue}
        onChangeText={setInputValue}
        onSearchPress={handleSearch}
      />

      <View style={styles.topRow}>
        <TouchableOpacity onPress={handleClearPress}>
          <Text
            style={{
              textDecorationColor: '#000',
              textDecorationStyle: 'solid',
              textDecorationLine: 'underline',
            }}>
            Reset
          </Text>
        </TouchableOpacity>
        <View style={styles.sortContainer}>
          <TouchableOpacity
            style={[
              styles.selectableText,
              sortCriteria === 'height' && styles.selectedText,
            ]}
            onPress={() => {
              setSortCriteria('height');
              setSortOrder('asc');
              sortDogs();
            }}>
            <Text
              style={[
                styles.text,
                sortCriteria === 'height' && styles.selectedText,
              ]}>
              Height
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.selectableText]}
            onPress={() => {
              setSortCriteria('weight');
              setSortOrder('asc');
              sortDogs();
            }}>
            <Text
              style={[
                styles.text,
                sortCriteria === 'weight' && styles.selectedText,
              ]}>
              Weight
            </Text>
          </TouchableOpacity>

          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => {
                if (sortCriteria) {
                  setSortOrder('asc');
                  sortDogs();
                }
              }}>
              <FontAwesome
                name="arrow-up"
                size={14}
                color={sortOrder === 'asc' && sortCriteria ? '#007BFF' : '#ccc'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (sortCriteria) {
                  setSortOrder('desc');
                  sortDogs();
                }
              }}>
              <FontAwesome
                name="arrow-down"
                size={14}
                color={
                  sortOrder === 'desc' && sortCriteria ? '#007BFF' : '#ccc'
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.flatListContainer}>
        <FlatList
          data={dogs}
          renderItem={({item}) => (
            <DogItems item={item} onPress={() => handleForm(item)} />
          )}
          keyExtractor={item => item.id}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          ListFooterComponent={
            loading && <ActivityIndicator size="large" color="#EB9DF8" />
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={true}
        />
      </View>

      <DogDetailsBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        item={selectedItem}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  listContent: {
    paddingBottom: 10,
  },
  flatListContainer: {
    flex: 1,
  },
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
  bottomSheetContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    height: 400,
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
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectableText: {
    paddingHorizontal: 5,
    color: 'red',
  },
  selectedText: {
    color: 'blue',
    // backgroundColor: 'blue',
  },
  text: {
    fontSize: 12,
    // color: '#333',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
