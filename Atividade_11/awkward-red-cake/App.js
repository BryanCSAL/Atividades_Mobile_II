import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Picker, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';

export default function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [result, setResult] = useState('');

  // Taxas de câmbio fixas (simulação)
  const exchangeRates = {
    USD: { BRL: 5.25, EUR: 0.85 },
    BRL: { USD: 0.19, EUR: 0.16 },
    EUR: { USD: 1.18, BRL: 6.15 }
  };

  const convertCurrency = () => {
    const numericValue = parseFloat(amount);
    
    if (!numericValue) {
      setResult('Insira um valor válido');
      return;
    }
    
    if (fromCurrency === toCurrency) {
      setResult('Selecione moedas diferentes');
      return;
    }
    
    const rate = exchangeRates[fromCurrency][toCurrency];
    const converted = numericValue * rate;
    
    setResult(`${numericValue.toFixed(2)} ${fromCurrency} = ${converted.toFixed(2)} ${toCurrency}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversor de Moedas</Text>
      <Text style={styles.subtitle}>Dólar, Real e Euro</Text>

      {/* Campo de valor */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor:</Text>
        <TextInput
          style={styles.input}
          value={amount}
          keyboardType="numeric"
          onChangeText={setAmount}
          placeholder="0.00"
        />
      </View>

      {/* Seleção de moeda "De" */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>De:</Text>
        <Picker
          selectedValue={fromCurrency}
          onValueChange={setFromCurrency}
          style={styles.picker}
        >
          <Picker.Item label="Dólar (USD)" value="USD" />
          <Picker.Item label="Real (BRL)" value="BRL" />
          <Picker.Item label="Euro (EUR)" value="EUR" />
        </Picker>
      </View>

      {/* Seleção de moeda "Para" */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Para:</Text>
        <Picker
          selectedValue={toCurrency}
          onValueChange={setToCurrency}
          style={styles.picker}
        >
          <Picker.Item label="Dólar (USD)" value="USD" />
          <Picker.Item label="Real (BRL)" value="BRL" />
          <Picker.Item label="Euro (EUR)" value="EUR" />
        </Picker>
      </View>

      {/* Botão de conversão */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={convertCurrency}
      >
        <Text style={styles.buttonText}>Converter</Text>
      </TouchableOpacity>

      {/* Resultado */}
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          {result || 'Resultado aqui'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  picker: {
    width: 200,
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 10,
  },
  resultText: {
    color: '#1B5E20',
    fontSize: 18,
    fontStyle: 'italic',
  },
});