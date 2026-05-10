// app/auth/register.tsx — glassmorphism
import { Text, View, Alert, KeyboardAvoidingView, Platform, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { GreenBackground } from '../../components/GreenBackground';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
  const isWeb = width >= 768;

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) { Alert.alert('Atenção', 'Preencha todos os campos.'); return; }
    if (password !== confirmPassword || password.length < 8) { Alert.alert('Atenção', 'Senhas devem ser iguais e ter no mínimo 8 caracteres.'); return; }
    try { router.replace('/home'); } catch { Alert.alert('Erro', 'Não foi possível criar a conta.'); }
  };

  return (
    <GreenBackground>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={[styles.card, isWeb && styles.cardWeb]}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Criar Conta</Text>
            <Text style={styles.subtitle}>Junte-se ao MeetStranger</Text>
            <Input label="Nome" value={name} onChangeText={setName} placeholder="Seu nome de usuário" />
            <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="seu@email.com" />
            <Input label="Senha" value={password} onChangeText={setPassword} secureTextEntry placeholder="Mínimo 8 caracteres" />
            <Input label="Confirmar Senha" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry placeholder="••••••••" />
            <Button title={loading ? 'Criando...' : 'Criar Conta'} onPress={handleRegister} disabled={loading} />
            <Button title="Já tenho conta" onPress={() => router.push('/auth/login')} variant="outline" />
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
  logo: { width: 72, height: 72, alignSelf: 'center', borderRadius: 18 },
  title: { fontSize: 22, fontWeight: '800', color: '#fff', textAlign: 'center', letterSpacing: -0.3 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.78)', textAlign: 'center', marginBottom: 4 },
});
