import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../theme';

const DetailsScreen = ({ route }) => {
  const { filme } = route.params;
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.accent }]}>{filme.nome} - Sinopse</Text>
      <Image source={{ uri: filme.foto }} style={styles.image} />
      <Text style={[styles.synopsis, { color: colors.text }]}>{filme.sinopse}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  synopsis: {
    fontSize: 16,
  },
});

export default DetailsScreen;
