import { Text, View, TouchableOpacity, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import {useAuth} from '../../hooks/useAuth';
import React from 'react';
import { useRouter } from 'expo-router';
import { GreenBackground } from '../../components/GreenBackground';

interface Category { id: string; name: string; icon: string; desc: string; }

const categories: Category[] = [
  { id: 'movies', name: 'Filmes',  icon: '🎬', desc: 'Filmes favoritos' },
  { id: 'series', name: 'Séries',  icon: '📺', desc: 'Séries e TV' },
  { id: 'games',  name: 'Jogos',   icon: '🎮', desc: 'Games e RPG' },
  { id: 'books',  name: 'Livros',  icon: '📗', desc: 'Livros e leitura' },
];

export default function Select() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWeb = width >= 768;
  // garante 2 cards por linha em qualquer mobile
  const cardSize = isWeb ? 180 : Math.floor((width - 40 - 40 - 12) / 2) - 8;

  return (
    <GreenBackground>
      <ScrollView
        contentContainerStyle={[styles.scroll, isWeb && styles.scrollWeb]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.appTitle}>MeetStranger</Text>
        <Text style={styles.appSub}>Escolha um tema e converse com alguém novo</Text>

        <View style={[styles.glassCard, isWeb && styles.glassCardWeb]}>
          <Text style={styles.cardHeading}>Qual é o seu interesse?</Text>
          <Text style={styles.cardSub}>Você será conectado com alguém que tem o mesmo gosto</Text>

          <View style={styles.grid}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.iconCard, { width: cardSize, height: cardSize }]}
                onPress={() => router.push(`/chat/room?category=${cat.id}`)}
                activeOpacity={0.75}
              >
                <View style={styles.iconGlass}>
                  <View style={styles.glassShine} />
                  <Text style={styles.iconEmoji}>{cat.icon}</Text>
                </View>
                <Text style={styles.iconLabel}>{cat.name}</Text>
                <Text style={styles.iconDesc}>{cat.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.bottomRow, isWeb && styles.bottomRowWeb]}>
          <TouchableOpacity style={styles.glassBtn} onPress={() => router.replace('/auth/login')} activeOpacity={0.75}>
            <Text style={styles.glassBtnText}>Sair</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.glassBtn} onPress={() => router.push('/about')} activeOpacity={0.75}>
            <Text style={styles.glassBtnText}>Sobre</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GreenBackground>
  );
}

const G  = 'rgba(255,255,255,0.18)';
const B  = 'rgba(255,255,255,0.40)';
const GS = 'rgba(255,255,255,0.32)';

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
    gap: 20,
  },
  scrollWeb: { paddingVertical: 48 },

  appTitle: {
    fontFamily: 'Poppins_800ExtraBold',
    fontSize: 30,
    color: '#fff',
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  appSub: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.80)',
    textAlign: 'center',
    marginTop: -12,
  },

  glassCard: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: G,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: B,
    padding: 20,
    gap: 14,
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 10,
  },
  glassCardWeb: { maxWidth: 560 },

  cardHeading: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#166534',
  },
  cardSub: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: 'rgba(255,255,255,0.78)',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: -6,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    width: '100%',
  },

  iconCard: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  iconGlass: {
    width: '65%',
    aspectRatio: 1,
    borderRadius: 18,
    backgroundColor: GS,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },

  glassShine: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: '45%',
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },

  iconEmoji: { fontSize: 28, zIndex: 1 },
  iconLabel: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 13,
    color: '#166534',
    marginTop: 2,
  },
  iconDesc: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    color: 'rgba(255,255,255,0.72)',
    textAlign: 'center',
    marginTop: -2,
  },

  bottomRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    maxWidth: 500,
  },
  bottomRowWeb: { maxWidth: 560 },

  glassBtn: {
    flex: 1,
    backgroundColor: G,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: B,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.10)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  glassBtnText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#fff',
  },
});
