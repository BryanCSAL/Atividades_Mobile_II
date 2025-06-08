import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import MenuHeader from '../components/MenuHeader';
import { HistoryContext } from '../context/HistoryContext';
import { fetchRandomQuote } from '../services/quoteApi';

export default function HistoryScreen() {
  const { history } = useContext(HistoryContext);
  const [quote, setQuote] = useState('');

  useEffect(() => { fetchRandomQuote().then(setQuote); }, []);

  return (
    <View style={styles.container}>
      <MenuHeader title="Roll History" />
      <Text style={styles.quote}>{quote}</Text>
      <FlatList
        data={history}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{`${item.date.split('T')[0]} • D${item.sides} = ${item.result}`}</Text>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No rolls yet.</Text>}  
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  quote: { fontStyle: 'italic', textAlign: 'center', margin: 12 },
  item: { padding: 8, borderBottomWidth: 1, borderColor: '#eee' },
  empty: { padding: 16, textAlign: 'center' }
});