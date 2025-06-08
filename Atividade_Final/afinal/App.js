import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HistoryProvider } from './src/context/HistoryContext';
import HomeScreen from './src/screens/HomeScreen';
import RollScreen from './src/screens/RollScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <HistoryProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Roll" component={RollScreen} />
          <Drawer.Screen name="History" component={HistoryScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </HistoryProvider>
  );
}