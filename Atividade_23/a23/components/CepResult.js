import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

const CepResult = ({ data }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.resultContainer}>
      <Text style={[styles.text, { color: colors.text }]}>CEP: {data.cep}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Logradouro: {data.logradouro}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Bairro: {data.bairro}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Cidade: {data.localidade}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Estado: {data.uf}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#1E1E2E',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default CepResult;
