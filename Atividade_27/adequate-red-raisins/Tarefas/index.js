import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import api from '../Services/api';
import Card from '../components/Card';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const carregarTarefas = async () => {
    setLoading(true);  // ativa loader antes da requisição
    try {
      const response = await api.get('/tasks');
      setTarefas(response.data);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    } finally {
      setLoading(false);  // desativa loader após resposta ou erro
    }
  };

  // Sempre que a tela voltar a ficar focada, recarrega a lista
  useFocusEffect(
    useCallback(() => {
      carregarTarefas();
    }, [])
  );

  const irFormulario = () => {
    navigation.navigate('Formulario', { atualizarLista: carregarTarefas });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#00f0ff" size={40} />
        <Text style={styles.loadingText}>Carregando tarefas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botaoIncluir} onPress={irFormulario}>
        <Text style={styles.botaoTexto}>➕ Incluir Nova Tarefa</Text>
      </TouchableOpacity>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card data={item} funcCarregarTarefas={carregarTarefas} />
        )}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>Nenhuma tarefa encontrada.</Text>
        }
        refreshing={loading}
        onRefresh={carregarTarefas}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2f',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1e1e2f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#00f0ff',
    marginTop: 10,
    fontSize: 16,
  },
  botaoIncluir: {
    backgroundColor: '#4f46e5',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lista: {
    paddingBottom: 20,
  },
  emptyMessage: {
    color: '#777',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});
