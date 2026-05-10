// components/GreenBackground.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function GreenBackground({ children, style }: Props) {
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.webGradient, style]}>
        {children}
      </View>
    );
  }
  const { LinearGradient } = require('expo-linear-gradient');
  return (
    <LinearGradient
      colors={['#E8F5EC', '#2ECC71', '#27AE60', '#1E8449', '#E8F5EC']}
      locations={[0, 0.20, 0.50, 0.80, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ flex: 1 }, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  webGradient: {
    flex: 1,
    backgroundColor: '#27AE60',
    // @ts-ignore
    backgroundImage: 'linear-gradient(135deg, #E8F5EC 0%, #2ECC71 20%, #27AE60 50%, #1E8449 80%, #E8F5EC 100%)',
    minHeight: '100vh',
  },
});
