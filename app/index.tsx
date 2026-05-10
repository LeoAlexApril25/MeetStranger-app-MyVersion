// app/index.tsx — Splash/Welcome glassmorphism
import { useRouter } from 'expo-router';
import { Button } from '../components/button';
import { GreenBackground } from '../components/GreenBackground';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';

export default function Welcome() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWeb = width >= 768;
  const logoSize = isWeb ? 150 : Math.min(width * 0.42, 130);

  return (
    <GreenBackground>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={[styles.card, isWeb && styles.cardWeb]}>
          {/* Logo */}
          <Image
            source={require('../assets/logo.png')}
            resizeMode="contain"
            style={{ width: logoSize, height: logoSize, alignSelf: 'center' }}
          />
          <Text style={styles.title}>MeetStranger</Text>
          <Text style={styles.subtitle}>
            Conecte-se com pessoas do mundo todo e converse sobre seus interesses
          </Text>
          <View style={styles.buttons}>
            <Button title="Entrar" onPress={() => router.push('/auth/login')} />
            <Text style={styles.hint}>Não possui conta ainda?</Text>
            <Button title="Criar Conta" onPress={() => router.push('/auth/register')} variant="outline" />
          </View>
        </View>
      </ScrollView>
    </GreenBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    minHeight: '100%',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.40)',
    padding: 32,
    gap: 12,
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 28,
    elevation: 12,
  },
  cardWeb: { maxWidth: 480 },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.80)',
    lineHeight: 21,
  },
  buttons: { width: '100%', gap: 10, marginTop: 8 },
  hint: { fontSize: 12, textAlign: 'center', color: 'rgba(255,255,255,0.70)' },
});
