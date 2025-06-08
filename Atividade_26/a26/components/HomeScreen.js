import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';
import { useTheme } from '../theme';

import CurrencyInput from '../components/CurrencyInput';
import CurrencySelect from '../components/CurrencySelect';
import ResultBox from '../components/ResultBox';

export default function HomeScreen() {
  const { colors, spacing } = useTheme();

  const [value, setValue] = useState('');      // Valor a ser convertido
  const [from, setFrom] = useState('BRL');      // De: (BRL, USD, EUR, BTC)
  const [to, setTo] = useState('USD');          // Para: (BRL, USD, EUR, BTC)
  const [result, setResult] = useState(null);   // Resultado da conversão

  const convert = async () => {
    if (!value.trim()) {
      Alert.alert('Atenção', 'Informe um valor para converter.');
      return;
    }

    // Monta a chave da API, ex: "BRL-USD"
    const pair = `${from}-${to}`;

    try {
      const response = await fetch(
        `https://economia.awesomeapi.com.br/json/last/${pair}`
      );
      const data = await response.json();

      // A AwesomeAPI retorna a chave no formato "BRLUSD" ou "USDBRL", etc.
      const key = `${from}${to}`;
      const rate = parseFloat(data[key].ask);
      const calc = (parseFloat(value.replace(',', '.')) * rate).toFixed(2);

      setResult(`${value} ${from} = ${calc} ${to}`);
      Keyboard.dismiss();
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível obter a cotação.');
      console.error(err);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.accent }]}>
        Conversor de Moedas
      </Text>

      <CurrencyInput
        value={value}
        onChange={setValue}
      />

      <CurrencySelect
        label="De:"
        selected={from}
        onChange={setFrom}
      />

      <CurrencySelect
        label="Para:"
        selected={to}
        onChange={setTo}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.accent }]}
        onPress={convert}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, { color: '#000' }]}>
          Converter
        </Text>
      </TouchableOpacity>

      <ResultBox result={result} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
