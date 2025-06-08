import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../theme';

const HomeScreen = () => {
  const { colors } = useTheme();
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error(error);
      setData(null);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>      
      <Text style={[styles.title, { color: colors.text }]}>Perfil dos Devs</Text>
      {data?.avatar_url && (
        <Image source={{ uri: data.avatar_url }} style={styles.avatar} />
      )}
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
          placeholder="Digite o login git..."
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />
        <TouchableOpacity onPress={fetchProfile} style={[styles.button, { backgroundColor: colors.accent }]} />
      </View>
      {data && (
        <View style={[styles.card, { backgroundColor: colors.card }]}>          
          <Text style={[styles.label, { color: colors.text }]}>Id: {data.id}</Text>
          <Text style={[styles.label, { color: colors.text }]}>Nome: {data.name}</Text>
          <Text style={[styles.label, { color: colors.text }]}>Repositórios: {data.public_repos}</Text>
          <Text style={[styles.label, { color: colors.text }]}>Criado em: {new Date(data.created_at).toLocaleDateString()}</Text>
          <Text style={[styles.label, { color: colors.text }]}>Seguidores: {data.followers}</Text>
          <Text style={[styles.label, { color: colors.text }]}>Seguindo: {data.following}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  card: {
    width: '100%',
    borderRadius: 12,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
});

export default HomeScreen;
