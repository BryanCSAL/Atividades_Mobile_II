import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import { useTheme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Item from '../components/item';
import AddItemModal from '../components/AddItemModal';

const HomeScreen = () => {
  const { colors, spacing } = useTheme();
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const storedItems = await AsyncStorage.getItem('items');
    if (storedItems) setItems(JSON.parse(storedItems));
  };

  const saveItems = async (newItems) => {
    setItems(newItems);
    await AsyncStorage.setItem('items', JSON.stringify(newItems));
  };

  const addItem = (item) => {
    const newItems = [...items, item];
    saveItems(newItems);
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>      
      <Text style={[styles.title, { color: colors.text }]}>Lista de Compras</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.accent }]} onPress={() => setModalVisible(true)}>
        <Text style={{ color: colors.text, fontSize: 24 }}>+</Text>
      </TouchableOpacity>
      <AddItemModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={addItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;