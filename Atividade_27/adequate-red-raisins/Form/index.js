import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../Services/api/index';

export default function Form({ route }) {
  const [id] = useState(route.params?.id);
  const [newTitle, setNewTitle] = useState(route.params?.title || '');
  const [newDescription, setNewDescription] = useState(route.params?.description || '');

  const navigation = useNavigation();

  const salvarTarefa = async () => {
    const body = JSON.stringify({ title: newTitle, description: newDescription });

    try {
      if (id !== undefined) {
        await api.put(`/tasks/${id}`, body, {
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        await api.post('/tasks', body, {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      await route.params?.atualizarLista();
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a tarefa.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Formulário </Text>

      <TextInput
        style={styles.input}
        value={newTitle}
        onChangeText={setNewTitle}
        placeholder="Título da tarefa"
        placeholderTextColor="#888"
      />

      <TextInput
        style={[styles.input, styles.inputDescricao]}
        value={newDescription}
        onChangeText={setNewDescription}
        placeholder="Descrição da tarefa"
        placeholderTextColor="#888"
        multiline
      />

      <TouchableOpacity style={styles.buttonSalvar} onPress={salvarTarefa}>
        <Text style={styles.buttonText}>💾 Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  title: {
    color: '#00f0ff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2f2f44',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#555',
    marginBottom: 15,
  },
  inputDescricao: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonSalvar: {
    backgroundColor: '#4f46e5',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
