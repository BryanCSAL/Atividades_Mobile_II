import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@rollDice:history';

export async function getHistory() {
  const json = await AsyncStorage.getItem(KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveHistory(history) {
  await AsyncStorage.setItem(KEY, JSON.stringify(history));
}