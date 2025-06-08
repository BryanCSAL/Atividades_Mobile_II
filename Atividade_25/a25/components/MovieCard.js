import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';

const MovieCard = ({ filme }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  if (!filme) return null; // evita erro se filme for undefined

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>{filme.nome}</Text>
      <Image source={{ uri: filme.foto }} style={styles.image} />
      <TouchableOpacity onPress={() => navigation.navigate('Details', { filme })}>
        <Text style={[styles.link, { color: colors.accent }]}>Leia mais →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
  },
  link: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MovieCard;
