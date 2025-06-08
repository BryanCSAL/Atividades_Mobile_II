import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { useTheme } from '../theme';
import CepResult from '../components/CepResult';

const CepScreen = () => {
  const { colors } = useTheme();
  const [cep, setCep] = useState('');
  const [data, setData] = useState(null);

  const fetchCep = async () => {
    if (cep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const json = await res.json();
        setData(json);
        Keyboard.dismiss();
      } catch (error) {
        alert('Erro ao buscar CEP');
      }
    } else {
      alert('CEP inválido');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>      
      <Text style={[styles.title, { color: colors.text }]}>Cep x Endereço</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text }]}
          placeholder="Digite o CEP..."
          placeholderTextColor="#999"
          keyboardType="numeric"
          maxLength={8}
          value={cep}
          onChangeText={setCep}
        />
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.accent }]} onPress={fetchCep}>
          <Text style={{ fontSize: 18, color: '#000' }}>🔍</Text>
        </TouchableOpacity>
      </View>
      {data && <CepResult data={data} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CepScreen;
