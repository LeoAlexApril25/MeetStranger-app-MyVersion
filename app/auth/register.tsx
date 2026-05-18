import { Text, View, KeyboardAvoidingView, Platform, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { GreenBackground } from '../../components/GreenBackground';
import { useAuth } from '../../hooks/useAuth';

export default function Register() {
  const router = useRouter();
  const { Register: registerUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { width } = useWindowDimensions();
  const isWeb = width >= 768;
  const isSmall = width < 375;
  const p = isSmall ? 16 : 24;

  const validate = () => {
    const newErrors = { name: '', email: '', password: '', confirmPassword: '' };
    let valid = true;

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório.';
      valid = false;
    }
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
    } else if (password.length < 8) {
      newErrors.password = 'A senha deve ter no mínimo 8 caracteres.';
      valid = false;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirme sua senha.';
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = async () => {
    setGlobalError('');
    if (!validate()) return;

    setLoading(true);
    try {
      const success = await registerUser(name, email, password);
      if (success) {
        router.replace('/home');
      } else {
        setGlobalError('Não foi possível criar a conta. Tente novamente.');
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
            <Text style={[styles.title, isSmall && styles.titleSm]}>Criar Conta</Text>
            <Text style={styles.subtitle}>Junte-se ao MeetStranger</Text>

            {globalError ? <Text style={styles.globalError}>{globalError}</Text> : null}

            <Input
              label="Nome"
              value={name}
              onChangeText={(v) => { setName(v); setErrors(e => ({ ...e, name: '' })); }}
              placeholder="Seu nome de usuário"
              error={errors.name}
            />
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
              placeholder="Mínimo 8 caracteres"
              error={errors.password}
            />
            <Input
              label="Confirmar Senha"
              value={confirmPassword}
              onChangeText={(v) => { setConfirmPassword(v); setErrors(e => ({ ...e, confirmPassword: '' })); }}
              secureTextEntry
              placeholder="••••••••"
              error={errors.confirmPassword}
            />

            <Button title={loading ? 'Criando...' : 'Criar Conta'} onPress={handleRegister} disabled={loading} />
            <Button title="Já tenho conta" onPress={() => router.push('/auth/login')} variant="outline" />
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
    gap: 8,
    shadowColor: 'rgba(0,0,0,0.15)', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 1, shadowRadius: 28, elevation: 12,
  },
  cardWeb: { maxWidth: 460 },
  logo:   { width: 64, height: 64, alignSelf: 'center', borderRadius: 16 },
  logoSm: { width: 50, height: 50 },
  title:   { fontFamily: 'Poppins_800ExtraBold', fontSize: 20, color: '#fff', textAlign: 'center' },
  titleSm: { fontSize: 17 },
  subtitle: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: 'rgba(255,255,255,0.78)', textAlign: 'center', marginTop: -4 },
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
