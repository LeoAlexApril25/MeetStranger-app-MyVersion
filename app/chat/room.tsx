import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useChat } from '../../hooks/UseChat';
import { ChatMessage } from '../../components/ChatMessage';
import { GreenBackground } from '../../components/GreenBackground';

const categories = [
  { id: 'movies', name: 'Filmes',  icon: '🎬' },
  { id: 'series', name: 'Séries',  icon: '📺' },
  { id: 'games',  name: 'Jogos',   icon: '🎮' },
  { id: 'books',  name: 'Livros',  icon: '📗' },
];

export default function ChatRoom() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: string }>();
  const categoryInfo = categories.find(cat => cat.id === category);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const { messages, isConnected, isMatching, partnerName, sendMessage, findNewPartner } = useChat(category || 'movies');
  const { width } = useWindowDimensions();
  const isWeb = width >= 768;

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 50);
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    sendMessage(inputText);
    setInputText('');
  };

  const statusText = isConnected
    ? `Conversando com ${partnerName}`
    : isMatching
    ? 'Procurando parceiro...'
    : 'Desconectado';

  return (
    <GreenBackground>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'android' ? -85 : 0}
      >
        <View style={[styles.container, isWeb && styles.containerWeb]}>

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <Text style={styles.backBtnText}>← Sair</Text>
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>{categoryInfo?.icon} {categoryInfo?.name}</Text>
              <Text style={styles.headerStatus}>{statusText}</Text>
            </View>
            <TouchableOpacity style={styles.newPartnerBtn} onPress={findNewPartner}>
              <Text style={styles.newPartnerText}>🔄 Novo</Text>
            </TouchableOpacity>
          </View>

          {/* Messages */}
          <View style={styles.messagesWrapper}>
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <ChatMessage message={item} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.messagesList}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Text style={styles.emptyIcon}>{categoryInfo?.icon ?? '💬'}</Text>
                  <Text style={styles.emptyText}>
                    {isMatching ? 'Procurando alguém para conversar...' : 'Nenhuma mensagem ainda'}
                  </Text>
                </View>
              }
            />
          </View>

          {/* Input */}
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Digite sua mensagem..."
              placeholderTextColor="rgba(255,255,255,0.55)"
              multiline
              maxLength={500}
              onSubmitEditing={handleSendMessage}
            />
            <TouchableOpacity
              style={[styles.sendBtn, (!isConnected || inputText.trim() === '') && styles.sendBtnDisabled]}
              onPress={handleSendMessage}
              disabled={!isConnected || inputText.trim() === ''}
              activeOpacity={0.75}
            >
              <Text style={styles.sendBtnText}>Enviar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </GreenBackground>
  );
}

const G = 'rgba(255,255,255,0.18)';
const B = 'rgba(255,255,255,0.40)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  containerWeb: {
    maxWidth: 720,
    alignSelf: 'center',
    width: '100%',
    paddingVertical: 24,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: G,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: B,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  backBtn: {
    backgroundColor: 'rgba(255,255,255,0.28)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.65)',
    shadowColor: 'rgba(0,0,0,0.18)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },
  backBtnText: { color: '#fff', fontWeight: '800', fontSize: 13, textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },
  headerCenter: { flex: 1, alignItems: 'center', gap: 2 },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#fff' },
  headerStatus: { fontSize: 11, color: 'rgba(255,255,255,0.75)' },
  newPartnerBtn: {
    backgroundColor: '#22C55E',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.40)',
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  newPartnerText: { color: '#fff', fontWeight: '800', fontSize: 13, textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },

  // Messages
  messagesWrapper: {
    flex: 1,
    backgroundColor: G,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: B,
    overflow: 'hidden',
  },
  messagesList: {
    padding: 16,
    gap: 8,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 40 },
  emptyIcon: { fontSize: 48 },
  emptyText: { color: 'rgba(255,255,255,0.70)', fontSize: 14, textAlign: 'center' },

  // Input
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(30, 40, 35, 0.72)',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.22)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    maxHeight: 100,
    // @ts-ignore
    outlineStyle: 'none',
  },
  sendBtn: {
    backgroundColor: '#22C55E',
    borderRadius: 16,
    paddingHorizontal: 22,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 6,
  },
  sendBtnDisabled: { backgroundColor: '#4B5563', shadowColor: 'transparent' },
  sendBtnText: { color: '#fff', fontSize: 15, fontWeight: '800', letterSpacing: 0.3 },
});
