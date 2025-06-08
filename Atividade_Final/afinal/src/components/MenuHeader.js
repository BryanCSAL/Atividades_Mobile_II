import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MenuHeader({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 16, backgroundColor: '#3700b3', alignItems: 'center' },
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});