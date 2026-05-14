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
  const isSmall = width < 375;
  const p = isSmall ? 16 : 24;

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) { Alert.alert('Atenção', 'Preencha todos os campos.'); return; }
    if (password !== confirmPassword || password.length < 8) { Alert.alert('Atenção', 'Senhas devem ser iguais e ter no mínimo 8 caracteres.'); return; }
    try { router.replace('/home'); } catch { Alert.alert('Erro', 'Não foi possível criar a conta.'); }
  };

  return (
    <GreenBackground>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={[styles.scroll, { padding: p }]} keyboardShouldPersistTaps="handled">
          <View style={[styles.card, isWeb && styles.cardWeb, { padding: p }]}>
            <Image source={require('../../assets/logo.png')} style={[styles.logo, isSmall && styles.logoSm]} resizeMode="contain" />
            <Text style={[styles.title, isSmall && styles.titleSm]}>Criar Conta</Text>
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
});
