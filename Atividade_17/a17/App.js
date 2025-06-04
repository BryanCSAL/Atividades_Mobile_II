import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet 
} from 'react-native';
import { 
  NavigationContainer 
} from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'; // ✅ Import do Top Tab
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Dados do perfil
const personalData = {
  name: "João Silva",
  age: 28,
  email: "joao.silva@example.com",
  phone: "(11) 98765-4321"
};

const formationData = [
  {
    institution: "Universidade XYZ",
    course: "Ciência da Computação",
    year: "2018-2022"
  },
  {
    institution: "Bootcamp Tech",
    course: "Desenvolvimento Web Full-Stack",
    year: "2023"
  }
];

const experienceData = [
  {
    company: "Empresa A",
    position: "Desenvolvedor Junior",
    period: "2020-2022"
  },
  {
    company: "Startup B",
    position: "Desenvolvedor Frontend",
    period: "2022-Presente"
  }
];

// Componentes das telas
function PersonalScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Dados Pessoais</Text>
      <Text>Nome: {personalData.name}</Text>
      <Text>Idade: {personalData.age}</Text>
      <Text>Email: {personalData.email}</Text>
      <Text>Telefone: {personalData.phone}</Text>
    </View>
  );
}

function FormationScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Formação</Text>
      {formationData.map((item, index) => (
        <View key={index} style={styles.formationItem}>
          <Text><Text style={styles.bold}>Instituição:</Text> {item.institution}</Text>
          <Text><Text style={styles.bold}>Curso:</Text> {item.course}</Text>
          <Text><Text style={styles.bold}>Período:</Text> {item.year}</Text>
        </View>
      ))}
    </View>
  );
}

function ExperienceScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Experiência</Text>
      {experienceData.map((item, index) => (
        <View key={index} style={styles.experienceItem}>
          <Text><Text style={styles.bold}>Empresa:</Text> {item.company}</Text>
          <Text><Text style={styles.bold}>Cargo:</Text> {item.position}</Text>
          <Text><Text style={styles.bold}>Período:</Text> {item.period}</Text>
        </View>
      ))}
    </View>
  );
}

// Configuração do Top Tab Navigator
const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Pessoal') {
              iconName = focused ? 'account-circle' : 'account-circle-outline';
            } else if (route.name === 'Formação') {
              iconName = focused ? 'school' : 'school-outline';
            } else if (route.name === 'Experiência') {
              iconName = focused ? 'briefcase' : 'briefcase-outline';
            }
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: '#FFFFFF' },
          tabBarIndicatorStyle: { backgroundColor: '#2196F3' },
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: '#757575',
        })}
        tabBarPosition="top" // ✅ Define que as tabs ficam no topo
      >
        <Tab.Screen name="Pessoal" component={PersonalScreen} />
        <Tab.Screen name="Formação" component={FormationScreen} />
        <Tab.Screen name="Experiência" component={ExperienceScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  bold: {
    fontWeight: 'bold',
    color: '#666'
  },
  formationItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2
  },
  experienceItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2
  }
});