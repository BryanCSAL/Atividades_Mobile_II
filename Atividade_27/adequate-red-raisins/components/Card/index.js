import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import api from '../../Services/api';
import { useNavigation } from '@react-navigation/native';

function Card({ data, funcCarregarTarefas }) {
  const [id] = useState(data?.id);
  const [title] = useState(data?.title);
  const [description] = useState(data?.description);

  const navigation = useNavigation();

  async function irFormulario() {
    navigation.navigate('Formulario', {
      id,
      title,
      description,
      atualizarLista: funcCarregarTarefas,
    });
  }

  const confirmarExclusao = () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja excluir esta tarefa?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/tasks/${id}`);
              await funcCarregarTarefas();
            } catch (error) {
              console.error("Erro ao excluir:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View>
      <View style={styles.card}>
        <Text style={styles.titulo}>{title}</Text>
        <Text style={styles.descricao}>{description}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonEditar} onPress={irFormulario}>
            <Text style={styles.buttonText}>✏️ Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonExcluir} onPress={confirmarExclusao}>
            <Text style={styles.buttonText}>🗑️ Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e2f',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00f0ff',
    marginBottom: 10,
  },
  descricao: {
    fontSize: 14,
    color: '#d1d1e0',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonEditar: {
    backgroundColor: '#4f46e5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonExcluir: {
    backgroundColor: '#ff3d71',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#ff3d71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Card;
