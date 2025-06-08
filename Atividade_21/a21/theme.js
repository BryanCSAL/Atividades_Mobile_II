import React, { createContext, useContext } from 'react';
import { StyleSheet } from 'react-native';

const ThemeContext = createContext();

export const theme = {
  colors: {
    background: '#0F0F1E',
    card: '#1E1E2E',
    text: '#FFFFFF',
    accent: '#00FFFF',
    button: '#3A3A5C',
  },
  spacing: 10,
};

export const ThemeProvider = ({ children }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);