import React from 'react';
import { ThemeProvider } from './theme';
import CepScreen from './components/CepScreen';

export default function App() {
  return (
    <ThemeProvider>
      <CepScreen />
    </ThemeProvider>
  );
}
