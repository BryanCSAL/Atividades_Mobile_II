// App.js
import React from 'react';
import { ThemeProvider } from './theme';
import HomeScreen from './components/HomeScreen';

export default function App() {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
}