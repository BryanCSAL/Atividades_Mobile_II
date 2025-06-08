import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../theme';
import { Picker } from '@react-native-picker/picker';

export default function CurrencySelect({ label, selected, onChange }) {
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <View style={[styles.pickerContainer, { backgroundColor: colors.inputBg }]}>
        <Picker
          selectedValue={selected}
          onValueChange={onChange}
          style={[styles.picker, { color: colors.text }]}
          mode="dropdown"
        >
          <Picker.Item label="Real (BRL)" value="BRL" />
          <Picker.Item label="Dólar (USD)" value="USD" />
          <Picker.Item label="Euro (EUR)" value="EUR" />
          <Picker.Item label="Bitcoin (BTC)" value="BTC" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  pickerContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: Platform.OS === 'android' ? 50 : undefined,
    width: '100%',
  },
});
