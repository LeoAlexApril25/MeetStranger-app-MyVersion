import { Text, View, KeyboardAvoidingView, Platform, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { GreenBackground } from '../../components/GreenBackground';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const router = useRouter();
  const { Login: loginUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState('');

  const [errors, setErrors] = useState({ email: '', password: '' });

  const { width } = useWindowDimensions();
  const isWeb = width >= 768;
  const isSmall = width < 375;
  const p = isSmall ? 16 : 24;

  const validate = () => {
    const newErrors = { email: '', password: '' };
    let valid = true;

    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório.';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido.';
      valid = false;
    }
    if (!password) {
      newErrors.password = 'Senha é obrigatória.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    setGlobalError('');
    if (!validate()) return;

    setLoading(true);
    try {
      const success = await loginUser(email, password);
      if (success) {
        router.replace('/home');
      } else {
        setGlobalError('Email ou senha incorretos.');
      }
    } catch {
      setGlobalError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GreenBackground>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={[styles.scroll, { padding: p }]} keyboardShouldPersistTaps="handled">
          <View style={[styles.card, isWeb && styles.cardWeb, { padding: p }]}>
            <Image source={require('../../assets/logo.png')} style={[styles.logo, isSmall && styles.logoSm]} resizeMode="contain" />
            <Text style={[styles.title, isSmall && styles.titleSm]}>Bem-vindo de volta!</Text>
            <Text style={styles.subtitle}>Faça login para continuar</Text>

            {globalError ? <Text style={styles.globalError}>{globalError}</Text> : null}

            <Input
              label="Email"
              value={email}
              onChangeText={(v) => { setEmail(v); setErrors(e => ({ ...e, email: '' })); }}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="seu@email.com"
              error={errors.email}
            />
            <Input
              label="Senha"
              value={password}
              onChangeText={(v) => { setPassword(v); setErrors(e => ({ ...e, password: '' })); }}
              secureTextEntry
              placeholder="••••••••"
              error={errors.password}
            />

            <Button title={loading ? 'Entrando...' : 'Entrar'} onPress={handleLogin} disabled={loading} />
            <Button title="Criar conta" onPress={() => router.push('/auth/register')} variant="outline" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GreenBackground>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', minHeight: '100%' },
  card: {
    width: '100%', maxWidth: 420,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 28, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.40)',
    gap: 10,
    shadowColor: 'rgba(0,0,0,0.15)', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 1, shadowRadius: 28, elevation: 12,
  },
  cardWeb: { maxWidth: 460 },
  logo:   { width: 72, height: 72, alignSelf: 'center', borderRadius: 18 },
  logoSm: { width: 56, height: 56 },
  title:   { fontFamily: 'Poppins_800ExtraBold', fontSize: 20, color: '#fff', textAlign: 'center' },
  titleSm: { fontSize: 18 },
  subtitle: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: 'rgba(255,255,255,0.78)', textAlign: 'center' },
  globalError: {
    backgroundColor: 'rgba(239,68,68,0.20)',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.60)',
    borderRadius: 10,
    padding: 10,
    color: '#FCA5A5',
    fontSize: 13,
    textAlign: 'center',
  },
});
