import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

const AddItemModal = ({ visible, onClose, onSave }) => {
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  // Limpa os campos toda vez que o modal for aberto
  useEffect(() => {
    if (visible) {
      setName('');
      setQuantity('');
    }
  }, [visible]);

  const handleSave = () => {
    if (name.trim() && quantity.trim()) {
      onSave({ name: name.trim(), quantity: quantity.trim() });
    }
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.accent }]}
            placeholder="Mercadoria"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.accent }]}
            placeholder="Quantidade"
            placeholderTextColor="#888"
            value={quantity}
            onChangeText={setQuantity}
          />
          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose}>
              <Text style={{ color: colors.text }}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text style={{ color: colors.accent }}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 12,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 18,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AddItemModal;
