import React, { createContext, useState, useEffect } from 'react';
import { getHistory, saveHistory } from '../services/storage';

export const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState([]);

  useEffect(() => { getHistory().then(setHistory); }, []);
  useEffect(() => { saveHistory(history); }, [history]);

  const addRoll = entry => setHistory(prev => [entry, ...prev]);

  return (
    <HistoryContext.Provider value={{ history, addRoll }}>
      {children}
    </HistoryContext.Provider>
  );
}