// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Platform } from 'react-native';
import Button from '../components/Button';
import MenuHeader from '../components/MenuHeader';
import { fetchDiceSides } from '../services/diceApi';

export default function HomeScreen({ navigation }) {
  const [sides, setSides] = useState([]);

  useEffect(() => {
    fetchDiceSides().then(setSides);
  }, []);

  return (
    <View style={styles.screen}>
      <MenuHeader title="Select Dice" />
      <View style={styles.card}>
        <FlatList
          data={sides}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
          keyExtractor={item => item.toString()}
          renderItem={({ item }) => (
            <Button
              title={`D${item}`}
              onPress={() => navigation.navigate('Roll', { sides: item })}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    flex: 1,
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 4 },
    }),
  },
  listContainer: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginVertical: 8,
  },
});
