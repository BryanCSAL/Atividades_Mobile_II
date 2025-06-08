import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

export default function CurrencyInput({ value, onChange }) {
  const { colors } = useTheme();

  return (
    <TextInput
      style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text }]}
      placeholder="Digite o valor"
      placeholderTextColor={colors.placeholder}
      keyboardType="numeric"
      value={value}
      onChangeText={onChange}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
});
