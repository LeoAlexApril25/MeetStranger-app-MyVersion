// components/input.tsx — glassmorphism input
import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, style, ...props }: InputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, focused && styles.inputFocused, error && styles.inputError, style]}
        placeholderTextColor="rgba(255,255,255,0.55)"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.90)',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.20)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.38)',
    borderRadius: 14,
    minHeight: 52,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#FFFFFF',
    shadowColor: 'rgba(0,0,0,0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  inputFocused: {
    borderColor: 'rgba(255,255,255,0.85)',
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.26)',
  },
  inputError: { borderColor: '#EF4444' },
  error: { fontSize: 12, color: '#FCA5A5', marginTop: 4, paddingHorizontal: 4 },
});
