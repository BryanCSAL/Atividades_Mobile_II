import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { 
  NavigationContainer 
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // ✅ Import correto

// Dados das vagas de emprego
const jobs = [
  {
    id: 1,
    title: "Desenvolvedor Backend",
    salary: "R$ 3000,00",
    description: "Desenvolver APIs RESTful usando Node.js e MongoDB. Experiência com Docker e AWS.",
    contact: "contato@empresa.com"
  },
  {
    id: 2,
    title: "Engenheiro de Dados",
    salary: "R$ 4500,00",
    description: "Analisar dados com Python e SQL. Criar dashboards no Power BI. Experiência com machine learning.",
    contact: "rh@dados.com.br"
  },
  {
    id: 3,
    title: "Analista de QA",
    salary: "R$ 2800,00",
    description: "Realizar testes manuais e automatizados. Conhecimento em Selenium e Jira.",
    contact: "vagas@qa.com"
  }
];

// Tela de Lista de Vagas
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, color: '#007AFF', marginBottom: 20 }}>Vagas</Text>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
      >
        {jobs.map(job => (
          <TouchableOpacity 
            key={job.id}
            style={{
              backgroundColor: '#F0F4FF',
              padding: 20,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#E0E7FF'
            }}
            onPress={() => navigation.navigate('Details', { job })}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{job.title}</Text>
            <Text style={{ color: '#6677FF', marginTop: 5 }}>Salário: {job.salary}</Text>
            <TouchableOpacity 
              style={{ 
                backgroundColor: '#007AFF', 
                padding: 10, 
                borderRadius: 5, 
                marginTop: 15 
              }}
              onPress={() => navigation.navigate('Details', { job })}
            >
              <Text style={{ color: '#FFF', textAlign: 'center' }}>Saiba mais</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// Tela de Detalhes da Vaga
function DetailsScreen({ route }) {
  const { job } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: '#F0F4FF', padding: 20 }}>
      <Text style={{ 
        fontSize: 20, 
        fontWeight: 'bold', 
        marginTop: 20, 
        color: '#333' 
      }}>{job.title}</Text>
      <Text style={{ 
        marginTop: 10, 
        color: '#6677FF', 
        lineHeight: 22 
      }}>Salário: {job.salary}</Text>
      <Text style={{ 
        marginTop: 15, 
        color: '#333', 
        lineHeight: 22 
      }}><Text style={{ fontWeight: 'bold' }}>Descrição:</Text> {job.description}</Text>
      <Text style={{ 
        marginTop: 15, 
        color: '#333', 
        lineHeight: 22 
      }}><Text style={{ fontWeight: 'bold' }}>Contato:</Text> {job.contact}</Text>
    </View>
  );
}

// Configuração da Navegação
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}