import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Switch, 
  StyleSheet, 
  Dimensions 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

// Frases pré-definidas
const quotes = [
  '"A vingança nunca é plena, mata a alma e envenena" (Seu Madruga)',
  '"O tempo é dinheiro, mas eu sou seu dono" (Futuro Programador)',
  '"Sonhos são como estrelas, você não pode tocá-las, mas elas guiam seu caminho" (Anônimo)'
];

export default function App() {
  const [quote, setQuote] = useState('');
  const [isDayMode, setIsDayMode] = useState(true);
  const [isSmallFont, setIsSmallFont] = useState(false);

  // Carrega as preferências do usuário ao iniciar
  useEffect(() => {
    loadPreferences();
    loadRandomQuote();
  }, []);

  // Salva as preferências no Async Storage
  const savePreferences = async () => {
    try {
      await AsyncStorage.setItem('dayMode', JSON.stringify(isDayMode));
      await AsyncStorage.setItem('smallFont', JSON.stringify(isSmallFont));
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
    }
  };

  // Recupera as preferências do Async Storage
  const loadPreferences = async () => {
    try {
      const dayMode = await AsyncStorage.getItem('dayMode');
      const smallFont = await AsyncStorage.getItem('smallFont');
      
      if (dayMode !== null) setIsDayMode(JSON.parse(dayMode));
      if (smallFont !== null) setIsSmallFont(JSON.parse(smallFont));
    } catch (error) {
      console.error('Erro ao carregar preferências:', error);
    }
  };

  // Gera uma frase aleatória
  const loadRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  return (
    <View style={[styles.container, isDayMode ? styles.dayBg : styles.nightBg]}>
      <View style={styles.header}>
        <Text style={styles.title}>Frases</Text>
      </View>

      <View style={styles.optionsContainer}>
        <View style={styles.switchItem}>
          <Text style={styles.label}>Dia</Text>
          <Switch 
            value={isDayMode} 
            onValueChange={(value) => {
              setIsDayMode(value);
              savePreferences();
            }} 
          />
        </View>

        <View style={styles.switchItem}>
          <Text style={styles.label}>Pequeno</Text>
          <Switch 
            value={isSmallFont} 
            onValueChange={(value) => {
              setIsSmallFont(value);
              savePreferences();
            }} 
          />
        </View>
      </View>

      <View style={styles.quoteContainer}>
        <Text 
          style={[
            styles.quoteText, 
            isSmallFont ? styles.smallFont : styles.largeFont
          ]}
        >
          {quote}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1A202C',
    transitionProperty: 'background-color',
    transitionDuration: '0.3s'
  },
  dayBg: {
    backgroundColor: '#E8F5E9'
  },
  nightBg: {
    backgroundColor: '#1A202C'
  },
  header: {
    marginBottom: 40,
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00B7FF',
    marginBottom: 10
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40
  },
  switchItem: {
    alignItems: 'center'
  },
  label: {
    color: '#00B7FF',
    fontSize: 16,
    marginBottom: 5
  },
  quoteContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#00B7FF20',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3
  },
  quoteText: {
    color: '#00B7FF',
    textAlign: 'center',
    lineHeight: 28
  },
  smallFont: {
    fontSize: 16
  },
  largeFont: {
    fontSize: 24
  }
});