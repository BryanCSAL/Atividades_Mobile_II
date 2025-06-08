import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

const theme = {
  colors: {
    background: '#0A0F1C',   // Fundo escuro
    text: '#E0F7FA',         // Texto em tom claro
    card: '#1C2331',         // Fundo dos cards
    accent: '#00E5FF',       // Azul neon para botões e destaques
    inputBg: '#263238',      // Fundo de inputs
    placeholder: '#90A4AE',  // Cor dos placeholders
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
  },
};

export const ThemeProvider = ({ children }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);
