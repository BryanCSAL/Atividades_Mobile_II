import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useTheme } from '../theme';
import MovieCard from '../components/MovieCard';

const HomeScreen = () => {
  const { colors } = useTheme();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://sujeitoprogramador.com/r-api/?api=filmes')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error('Erro:', err));
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>App de Filmes</Text>
      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <MovieCard filme={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;
