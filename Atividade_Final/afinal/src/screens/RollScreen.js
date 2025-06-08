import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Alert,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Button from '../components/Button';
import DiceImage from '../components/DiceImage';
import MenuHeader from '../components/MenuHeader';
import { HistoryContext } from '../context/HistoryContext';
import { fetchRandomQuote } from '../services/quoteApi';

export default function RollScreen({ route }) {
  const { sides } = route.params;
  const { addRoll } = useContext(HistoryContext);
  const [quote, setQuote] = useState('');
  const [spin, setSpin] = useState(false);
  const [modifier, setModifier] = useState('0');

  useEffect(() => {
    fetchRandomQuote().then(setQuote);
  }, []);

  const rollDice = () => {
    setSpin(true);
    const base = Math.floor(Math.random() * sides) + 1;
    const mod = parseInt(modifier, 10) || 0;
    const result = base + mod;

    addRoll({ sides, base, modifier: mod, result, date: new Date().toISOString() });

    setTimeout(() => {
      Alert.alert(`Result`, `${base} + ${mod} = ${result}\n\n"${quote}"`);
      setSpin(false);
    }, 600);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}
    >
      <MenuHeader title={`Roll D${sides}`} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <DiceImage sides={sides} spinTrigger={spin} />
          <View style={styles.inputRow}>
            <Text style={styles.label}>Modifier</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={modifier}
              onChangeText={setModifier}
              placeholder="+0"
              placeholderTextColor="#999"
            />
          </View>
          <Button title="Roll" onPress={rollDice} style={styles.rollButton} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 4,
      },
    }),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 44,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FAFAFA',
  },
  rollButton: {
    width: '100%',
    marginTop: 16,
  },
});
