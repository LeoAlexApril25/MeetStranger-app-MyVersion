// app/auth/login.tsx — glassmorphism
import { Text, View, Alert, KeyboardAvoidingView, Platform, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { GreenBackground } from '../../components/GreenBackground';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
  const isWeb = width >= 768;

  const handleLogin = async () => {
    if (!email || !password) { Alert.alert('Atenção', 'Preencha todos os campos.'); return; }
    try { router.replace('/home'); } catch { Alert.alert('Erro', 'Não foi possível entrar. Tente novamente.'); }
  };

  return (
    <GreenBackground>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={[styles.card, isWeb && styles.cardWeb]}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Bem-vindo de volta!</Text>
            <Text style={styles.subtitle}>Faça login para continuar</Text>
            <View style={styles.inputs}>
              <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="seu@email.com" />
              <Input label="Senha" value={password} onChangeText={setPassword} secureTextEntry placeholder="••••••••" />
            </View>
            <Button title={loading ? 'Entrando...' : 'Entrar'} onPress={handleLogin} disabled={loading} />
            <Button title="Criar conta" onPress={() => router.push('/auth/register')} variant="outline" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GreenBackground>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24, minHeight: '100%' },
  card: {
    width: '100%', maxWidth: 420,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 28, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.40)',
    padding: 28, gap: 12,
    shadowColor: 'rgba(0,0,0,0.15)', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 1, shadowRadius: 28, elevation: 12,
  },
  cardWeb: { maxWidth: 460 },
  logo: { width: 80, height: 80, alignSelf: 'center', borderRadius: 20 },
  title: { fontSize: 22, fontWeight: '800', color: '#fff', textAlign: 'center', letterSpacing: -0.3 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.78)', textAlign: 'center' },
  inputs: { gap: 0 },
});
