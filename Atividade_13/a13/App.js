import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { 
  NavigationContainer 
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
// Dados dos produtos
const products = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet",
    image: "https://picsum.photos/200/300?random=1",
    description: "Aliquam vitae ornare odio."
  },
  {
    id: 2,
    title: "Consectetur adipiscing elit",
    image: "https://picsum.photos/200/300?random=2",
    description: "Aliquam vitae ornare odio."
  },
  {
    id: 3,
    title: "Ut ullamcorper facilisis dolor",
    image: "https://picsum.photos/200/300?random=3",
    description: "Aliquam vitae ornare odio."
  }
];

// Tela de Lista de Produtos
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, color: '#FF0000', marginBottom: 20 }}>Anúncios</Text> 
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: 'row', gap: 20 }} 
      >
        {products.map(product => (
          <TouchableOpacity 
            key={product.id}
            style={{ width: 200 }}
            onPress={() => navigation.navigate('Details', { product })}
          >
            <Image 
              source={{ uri: product.image }} 
              style={{ width: 200, height: 300, borderRadius: 8 }} 
            />
            <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{product.title}</Text>
            <TouchableOpacity 
              style={{ 
                backgroundColor: '#FF0000', 
                padding: 10, 
                borderRadius: 5, 
                marginTop: 10 
              }}
              onPress={() => navigation.navigate('Details', { product })}
            >
              <Text style={{ color: '#FFF', textAlign: 'center' }}>Ver detalhes</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// Tela de Detalhes do Produto
function DetailsScreen({ route }) {
  const { product } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5', padding: 20 }}>
      <Image 
        source={{ uri: product.image }} 
        style={{ width: '100%', height: 300, borderRadius: 8 }} 
      />
      <Text style={{ 
        fontSize: 20, 
        fontWeight: 'bold', 
        marginTop: 20, 
        color: '#333' 
      }}>{product.title}</Text>
      <Text style={{ 
        marginTop: 10, 
        color: '#666', 
        lineHeight: 22 
      }}>{product.description}</Text>
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