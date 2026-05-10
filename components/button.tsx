// components/button.tsx — glassmorphism
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Button({ title, onPress, variant = 'primary', disabled = false, style, textStyle }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.base, variantStyle[variant], disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.75}
    >
      <Text style={[styles.text, variantTextStyle[variant], textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
    minHeight: 52,
    shadowColor: 'rgba(0,0,0,0.12)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 4,
  },
  primary: {
    backgroundColor: '#22C55E',
    shadowColor: '#16A34A',
  },
  secondary: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.50)',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.65)',
  },
  disabled: { opacity: 0.45 },
  text: { fontSize: 15, fontWeight: '700', letterSpacing: 0.2 },
  primaryText:   { color: '#fff' },
  secondaryText: { color: '#fff' },
  outlineText:   { color: '#fff' },
});

const variantStyle: Record<'primary' | 'secondary' | 'outline', object> = {
  primary:   styles.primary,
  secondary: styles.secondary,
  outline:   styles.outline,
};

const variantTextStyle: Record<'primary' | 'secondary' | 'outline', object> = {
  primary:   styles.primaryText,
  secondary: styles.secondaryText,
  outline:   styles.outlineText,
};
