import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';

export default function DiceImage({ sides, spinTrigger }) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (spinTrigger) {
      rotation.setValue(0);
      Animated.timing(rotation, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  }, [spinTrigger]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const images = {
    4: require('../Assets/Dice4.png'),
    6: require('../Assets/Dice6.png'),
    8: require('../Assets/Dice8.png'),
    10: require('../Assets/Dice10.png'),
    12: require('../Assets/Dice12.png'),
    20: require('../Assets/Dice20.png'),
  };

  return (
    <Animated.Image
      source={images[sides]}
      style={[styles.image, { transform: [{ rotate: spin }] }]}
    />
  );
}

const styles = StyleSheet.create({
  image: { width: 120, height: 120, margin: 16 },
});