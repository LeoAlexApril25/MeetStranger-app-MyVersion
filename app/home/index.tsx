// app/home/index.tsx — glassmorphism
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { GreenBackground } from '../../components/GreenBackground';
import { Button } from '../../components/button';

const features = [
  { icon: '🌏', label: 'Mundial',      desc: 'Pessoas do mundo inteiro' },
  { icon: '⚡', label: 'Instantâneo', desc: 'Chat em tempo real' },
  { icon: '🔒', label: 'Seguro',       desc: 'Sem dados armazenados' },
];

export default function Home() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWeb = width >= 768;
  const user = { username: 'Leonardo' };

  return (
    <GreenBackground>
      <ScrollView contentContainerStyle={[styles.scroll, isWeb && styles.scrollWeb]}>
        {/* Título */}
        <Text style={styles.appTitle}>MeetStranger</Text>
        <Text style={styles.welcomeSub}>Olá, {user.username} 👋</Text>

        {/* Card central glass */}
        <View style={[styles.glassCard, isWeb && styles.glassCardWeb]}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.cardHeading}>Pronto para conversar?</Text>
          <Text style={styles.cardBody}>
            Conecte-se com estranhos ao redor do mundo e encontre quem compartilha seus interesses!
          </Text>

          {/* Feature pills */}
          <View style={styles.pillRow}>
            {features.map(f => (
              <View key={f.label} style={styles.pill}>
                <Text style={styles.pillEmoji}>{f.icon}</Text>
                <Text style={styles.pillLabel}>{f.label}</Text>
                <Text style={styles.pillDesc}>{f.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Botão principal */}
        <View style={[styles.actions, isWeb && styles.actionsWeb]}>
          <Button title="🚀  Começar a Conversar" onPress={() => router.push('/chat/select')} />

          {/* Botões glass base */}
          <View style={styles.bottomRow}>
            <TouchableOpacity style={styles.glassBtn} onPress={() => router.replace('/auth/login')} activeOpacity={0.75}>
              <Text style={styles.glassBtnText}>Sair</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.glassBtn} onPress={() => router.push('/about')} activeOpacity={0.75}>
              <Text style={styles.glassBtnText}>Sobre</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </GreenBackground>
  );
}

const G = 'rgba(255,255,255,0.18)';
const B = 'rgba(255,255,255,0.40)';

const styles = StyleSheet.create({
  scroll:       { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 20, minHeight: '100%' },
  scrollWeb:    { paddingVertical: 48 },
  appTitle:     { fontSize: 34, fontWeight: '800', color: '#fff', letterSpacing: -0.5, textShadowColor: 'rgba(0,0,0,0.15)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 6 },
  welcomeSub:   { fontSize: 16, color: 'rgba(255,255,255,0.82)', fontWeight: '500', marginTop: -8 },

  glassCard:    { width: '100%', maxWidth: 480, backgroundColor: G, borderRadius: 28, borderWidth: 1.5, borderColor: B, padding: 24, gap: 14, alignItems: 'center', shadowColor: 'rgba(0,0,0,0.15)', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 1, shadowRadius: 24, elevation: 10 },
  glassCardWeb: { maxWidth: 560 },
  logo:         { width: 90, height: 90, borderRadius: 22 },
  cardHeading:  { fontSize: 18, fontWeight: '800', color: '#166534' },
  cardBody:     { fontSize: 14, color: '#fff', textAlign: 'center', lineHeight: 21, opacity: 0.9 },

  pillRow:   { flexDirection: 'row', gap: 10, width: '100%' },
  pill:      { flex: 1, backgroundColor: 'rgba(255,255,255,0.24)', borderRadius: 16, borderWidth: 1, borderColor: B, padding: 12, alignItems: 'center', gap: 4 },
  pillEmoji: { fontSize: 22 },
  pillLabel: { fontSize: 11, fontWeight: '700', color: '#fff' },
  pillDesc:  { fontSize: 10, color: 'rgba(255,255,255,0.75)', textAlign: 'center' },

  actions:    { width: '100%', maxWidth: 480, gap: 12 },
  actionsWeb: { maxWidth: 480 },

  bottomRow:    { flexDirection: 'row', gap: 12 },
  glassBtn:     { flex: 1, backgroundColor: G, borderRadius: 16, borderWidth: 1.5, borderColor: B, paddingVertical: 14, alignItems: 'center', shadowColor: 'rgba(0,0,0,0.10)', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 10, elevation: 5 },
  glassBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
});
