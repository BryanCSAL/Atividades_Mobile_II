// App.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker'; // Importação correta do Picker
import Slider from '@react-native-community/slider'; // Importação correta do Slider

// Estilos globais
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1A202C',
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00B7FF',
    marginBottom: 30,
    textAlign: 'center'
  },
  label: {
    color: '#9CA3AF',
    fontSize: 16,
    marginBottom: 8
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
  picker: {
    width: '100%',
    height: 50,
    backgroundColor: '#2D3436',
    color: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4A5568',
    marginBottom: 20
  },
  sliderContainer: {
    marginBottom: 20
  },
  slider: {
    height: 40
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25
  },
  switchLabel: {
    color: '#9CA3AF',
    fontSize: 16,
    marginLeft: 10
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#00B7FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  buttonText: {
    color: '#1A202C',
    fontSize: 18,
    fontWeight: 'bold'
  },
  backButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#4A5568',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  fieldLabel: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15
  },
  fieldValue: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 10
  }
});

// Tela de Formulário
function FormScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Masculino',
    education: 'Ensino Fundamental',
    limit: 200,
    brazilian: true
  });

  const handleConfirm = () => {
    if (Object.values(formData).every(field => field !== '')) {
      navigation.navigate('Confirm', { data: formData });
    } else {
      alert('Por favor, preencha todos os campos');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Abertura de Conta</Text>

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={formData.name}
        onChangeText={(text) => setFormData({...formData, name: text})}
      />

      <Text style={styles.label}>Idade:</Text>
      <TextInput
        style={styles.input}
        value={formData.age}
        onChangeText={(text) => setFormData({...formData, age: text})}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Sexo:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.gender}
          onValueChange={(value) => setFormData({...formData, gender: value})}
          style={styles.picker}
          dropdownIconColor="#00B7FF"
        >
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Feminino" value="Feminino" />
          <Picker.Item label="Outro" value="Outro" />
        </Picker>
      </View>

      <Text style={styles.label}>Escolaridade:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.education}
          onValueChange={(value) => setFormData({...formData, education: value})}
          style={styles.picker}
          dropdownIconColor="#00B7FF"
        >
          <Picker.Item label="Ensino Fundamental" value="Ensino Fundamental" />
          <Picker.Item label="Ensino Médio" value="Ensino Médio" />
          <Picker.Item label="Ensino Superior" value="Ensino Superior" />
          <Picker.Item label="Pós-Graduação" value="Pós-Graduação" />
        </Picker>
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Limite: R$ {formData.limit.toFixed(2)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={100}
          maximumValue={1000}
          step={50}
          value={formData.limit}
          minimumTrackTintColor="#00B7FF"
          maximumTrackTintColor="#4A5568"
          thumbTintColor="#00B7FF"
          onValueChange={(value) => setFormData({...formData, limit: value})}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Brasileiro:</Text>
        <TouchableOpacity
          style={{
            width: 40,
            height: 25,
            borderRadius: 13,
            backgroundColor: formData.brazilian ? '#00B7FF' : '#4A5568',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10
          }}
          onPress={() => setFormData({...formData, brazilian: !formData.brazilian})}
        >
          <View
            style={{
              width: 15,
              height: 15,
              borderRadius: 8,
              backgroundColor: '#1A202C',
              transform: [
                { translateX: formData.brazilian ? 15 : 0 }
              ]
            }}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleConfirm}
      >
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Tela de Confirmação
function ConfirmScreen({ route, navigation }) {
  const { data } = route.params;

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dados Informados:</Text>

      <Text style={styles.fieldLabel}>Nome:</Text>
      <Text style={styles.fieldValue}>{data.name}</Text>

      <Text style={styles.fieldLabel}>Idade:</Text>
      <Text style={styles.fieldValue}>{data.age}</Text>

      <Text style={styles.fieldLabel}>Sexo:</Text>
      <Text style={styles.fieldValue}>{data.gender}</Text>

      <Text style={styles.fieldLabel}>Escolaridade:</Text>
      <Text style={styles.fieldValue}>{data.education}</Text>

      <Text style={styles.fieldLabel}>Limite:</Text>
      <Text style={styles.fieldValue}>R$ {data.limit.toFixed(2)}</Text>

      <Text style={styles.fieldLabel}>Brasileiro:</Text>
      <Text style={styles.fieldValue}>
        {data.brazilian ? 'Sim' : 'Não'}
      </Text>

      <TouchableOpacity
        style={styles.backButton}
        onPress={goBack}
      >
        <Text style={styles.buttonText}>Voltar para edição</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Navegação
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1A202C' },
          headerTintColor: '#00B7FF',
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackTitleVisible: false
        }}
      >
        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={{ title: 'Abertura de Conta' }}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmScreen}
          options={{ title: 'Confirmação' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}