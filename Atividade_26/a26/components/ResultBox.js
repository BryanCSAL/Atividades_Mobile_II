import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

export default function ResultBox({ result }) {
  const { colors } = useTheme();

  if (!result) return null;

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.text, { color: colors.accent }]}>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});
