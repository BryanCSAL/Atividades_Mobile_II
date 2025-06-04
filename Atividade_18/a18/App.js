import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { 
  NavigationContainer 
} from '@react-navigation/native';
import { 
  createBottomTabNavigator 
} from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const exchangeRates = {
  USD: 5.25,  
  EUR: 5.75,  
  BTC: 300000 
};

// Componente para cada aba
function CurrencyScreen({ name, symbol, toCurrency }) {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const convertCurrency = () => {
    if (!value || isNaN(value)) {
      setResult('Digite um valor válido');
      return;
    }

    const rate = exchangeRates[toCurrency];
    const converted = parseFloat(value) / rate;
    setResult(converted.toFixed(6));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Converter {name}</Text>
      
      <TextInput
        style={styles.input}
        placeholder={`Digite o valor em R$`}
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
      />

      <TouchableOpacity 
        style={styles.button}
        onPress={convertCurrency}
      >
        <Text style={styles.buttonText}>Converter</Text>
      </TouchableOpacity>

      <Text style={styles.result}>
        {result ? `${value} R$ = ${result} ${symbol}` : 'Resultado aqui'}
      </Text>
    </View>
  );
}

// Abas do Bottom Tab
function DolarScreen() {
  return <CurrencyScreen name="Dólar" symbol="$" toCurrency="USD" />;
}

function EuroScreen() {
  return <CurrencyScreen name="Euro" symbol="€" toCurrency="EUR" />;
}

function BitcoinScreen() {
  return <CurrencyScreen name="Bitcoin" symbol="₿" toCurrency="BTC" />;
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Dólar') {
              iconName = 'currency-usd';
            } else if (route.name === 'Euro') {
              iconName = 'euro';
            } else if (route.name === 'Bitcoin') {
              iconName = 'bitcoin';
            }
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#00B7FF',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: { backgroundColor: '#1A202C' },
          tabBarLabelStyle: { fontSize: 12 }
        })}
      >
        <Tab.Screen name="Dólar" component={DolarScreen} />
        <Tab.Screen name="Euro" component={EuroScreen} />
        <Tab.Screen name="Bitcoin" component={BitcoinScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Configuração do Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#1A202C',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00B7FF',
    marginBottom: 30
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#2D3436',
    color: '#FFF',
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4A5568',
    marginBottom: 20
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#00B7FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#1A202C',
    fontSize: 18,
    fontWeight: 'bold'
  },
  result: {
    marginTop: 20,
    color: '#9CA3AF',
    fontSize: 16,
    fontStyle: 'italic'
  }
});