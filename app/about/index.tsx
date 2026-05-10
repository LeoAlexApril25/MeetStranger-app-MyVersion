// app/about/index.tsx — glassmorphism
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { GreenBackground } from '../../components/GreenBackground';

const sections = [
  {
    title: '💬 O que é o MeetStranger',
    items: ['Um app de encontros casuais que conecta pessoas do mundo todo para conversas divertidas. Interface simples e segura para socialização online.'],
  },
  {
    title: '🔐 Privacidade',
    items: ['Sua privacidade é nossa prioridade', 'Não coletamos dados pessoais', 'Você pode sair a qualquer momento', 'Não armazenamos suas mensagens'],
  },
  {
    title: '🌏 Como funciona',
    items: ['1. Escolha um tópico (Filmes, Jogos, Séries, Livros)', '2. Seja conectado com alguém do mesmo interesse', '3. Converse livremente sobre o tema', '4. Troque de parceiro quando quiser'],
  },
  {
    title: '⚡ Recursos',
    items: ['Chat em tempo real', 'Múltiplas categorias', 'Interface simples e intuitiva', 'Totalmente gratuito'],
  },
  {
    title: '🖥️ Desenvolvedor',
    items: ['Leonardo Alexsander Ferreira', 'Um matuto tentando sobreviver e não morrer de fome 😄', 'Versão 1.0.0 · 2026'],
  },
];

export default function About() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWeb = width >= 768;

  return (
    <GreenBackground>
      <ScrollView contentContainerStyle={[styles.scroll, isWeb && styles.scrollWeb]}>
        <Text style={styles.pageTitle}>Sobre o App</Text>

        {sections.map(section => (
          <View key={section.title} style={[styles.glassCard, isWeb && styles.glassCardWeb]}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, i) => (
              <Text key={i} style={styles.item}>{item}</Text>
            ))}
          </View>
        ))}

        <TouchableOpacity style={[styles.backBtn, isWeb && styles.backBtnWeb]} onPress={() => router.back()} activeOpacity={0.75}>
          <Text style={styles.backBtnText}>← Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </GreenBackground>
  );
}

const G = 'rgba(255,255,255,0.18)';
const B = 'rgba(255,255,255,0.40)';

const styles = StyleSheet.create({
  scroll:       { flexGrow: 1, alignItems: 'center', padding: 24, paddingTop: 52, gap: 14 },
  scrollWeb:    { paddingVertical: 48 },
  pageTitle:    { fontSize: 26, fontWeight: '800', color: '#fff', alignSelf: 'flex-start', marginBottom: 4 },
  glassCard:    { width: '100%', maxWidth: 560, backgroundColor: G, borderRadius: 22, borderWidth: 1.5, borderColor: B, padding: 20, gap: 8, shadowColor: 'rgba(0,0,0,0.10)', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 1, shadowRadius: 16, elevation: 6 },
  glassCardWeb: { maxWidth: 640 },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: '#fff', marginBottom: 4 },
  item:         { fontSize: 14, color: 'rgba(255,255,255,0.82)', lineHeight: 21 },
  backBtn:      { width: '100%', maxWidth: 560, backgroundColor: G, borderRadius: 16, borderWidth: 1.5, borderColor: B, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  backBtnWeb:   { maxWidth: 640 },
  backBtnText:  { fontSize: 15, fontWeight: '700', color: '#fff' },
});
