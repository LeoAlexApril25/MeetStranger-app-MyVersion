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
  const isSmall = width < 375;
  const p = isSmall ? 16 : 24;
  const user = { username: 'Leonardo' };

  return (
    <GreenBackground>
      <ScrollView contentContainerStyle={[styles.scroll, { padding: p }, isWeb && styles.scrollWeb]} showsVerticalScrollIndicator={false}>
        <Text style={[styles.appTitle, isSmall && styles.appTitleSm]}>MeetStranger</Text>
        <Text style={styles.welcomeSub}>Olá, {user.username} 👋</Text>

        <View style={[styles.glassCard, isWeb && styles.glassCardWeb, { padding: p }]}>
          <Image source={require('../../assets/logo.png')} style={[styles.logo, isSmall && styles.logoSm]} resizeMode="contain" />
          <Text style={[styles.cardHeading, isSmall && styles.cardHeadingSm]}>Pronto para conversar?</Text>
          <Text style={styles.cardBody}>
            Conecte-se com estranhos ao redor do mundo e encontre quem compartilha seus interesses!
          </Text>

          <View style={styles.pillRow}>
            {features.map(f => (
              <View key={f.label} style={styles.pill}>
                <Text style={styles.pillEmoji}>{f.icon}</Text>
                <Text style={[styles.pillLabel, isSmall && styles.pillLabelSm]}>{f.label}</Text>
                <Text style={styles.pillDesc}>{f.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.actions, isWeb && styles.actionsWeb]}>
          <Button title="🚀  Começar a Conversar" onPress={() => router.push('/chat/select')} />
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
  scroll:       { flexGrow: 1, alignItems: 'center', justifyContent: 'center', gap: 16, minHeight: '100%' },
  scrollWeb:    { paddingVertical: 48 },

  appTitle:     { fontFamily: 'Poppins_800ExtraBold', fontSize: 30, color: '#fff', letterSpacing: -0.5 },
  appTitleSm:   { fontSize: 24 },
  welcomeSub:   { fontFamily: 'Poppins_400Regular', fontSize: 14, color: 'rgba(255,255,255,0.82)', marginTop: -8 },

  glassCard:    { width: '100%', maxWidth: 480, backgroundColor: G, borderRadius: 28, borderWidth: 1.5, borderColor: B, gap: 12, alignItems: 'center', shadowColor: 'rgba(0,0,0,0.15)', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 1, shadowRadius: 24, elevation: 10 },
  glassCardWeb: { maxWidth: 560 },

  logo:         { width: 80, height: 80, borderRadius: 20 },
  logoSm:       { width: 60, height: 60 },
  cardHeading:  { fontFamily: 'Poppins_700Bold', fontSize: 16, color: '#166534', textAlign: 'center' },
  cardHeadingSm:{ fontSize: 14 },
  cardBody:     { fontFamily: 'Poppins_400Regular', fontSize: 13, color: '#fff', textAlign: 'center', lineHeight: 20, opacity: 0.9 },

  pillRow:      { flexDirection: 'row', gap: 8, width: '100%' },
  pill:         { flex: 1, backgroundColor: 'rgba(255,255,255,0.24)', borderRadius: 14, borderWidth: 1, borderColor: B, padding: 10, alignItems: 'center', gap: 3 },
  pillEmoji:    { fontSize: 18 },
  pillLabel:    { fontFamily: 'Poppins_700Bold', fontSize: 10, color: '#fff' },
  pillLabelSm:  { fontSize: 9 },
  pillDesc:     { fontFamily: 'Poppins_400Regular', fontSize: 9, color: 'rgba(255,255,255,0.75)', textAlign: 'center' },

  actions:      { width: '100%', maxWidth: 480, gap: 10 },
  actionsWeb:   { maxWidth: 480 },
  bottomRow:    { flexDirection: 'row', gap: 10 },
  glassBtn:     { flex: 1, backgroundColor: G, borderRadius: 16, borderWidth: 1.5, borderColor: B, paddingVertical: 13, alignItems: 'center', elevation: 5 },
  glassBtnText: { fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: '#fff' },
});
