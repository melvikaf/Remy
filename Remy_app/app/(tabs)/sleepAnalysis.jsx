import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { OPENAI_API_KEY } from '@env';

export default function SleepAnalysisScreen() {
  const sleepDebtHours = 5.5;
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m Remy, your sleep assistant. How can I help you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      console.log('Starting chat request...');
      
      // Prepare messages for OpenAI
      const chatMessages = [
        { 
          role: 'system', 
          content: 'You are Remy, a sleep assistant. Provide helpful, concise advice about sleep, sleep hygiene, and sleep-related issues. Keep responses under 100 words and focus on practical, actionable advice.'
        },
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        userMessage
      ];

      console.log('Request payload:', JSON.stringify(chatMessages, null, 2));

      // Call OpenAI API using fetch
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: chatMessages,
          max_tokens: 150,
          temperature: 0.7,
        })
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('OpenAI Response:', JSON.stringify(data, null, 2));
      
      if (!response.ok) {
        console.error('API Error:', data);
        throw new Error(data.error?.message || 'Failed to get response');
      }

      // Add assistant's response to chat
      const assistantMessage = {
        role: 'assistant',
        content: data.choices[0].message.content
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error details:', error);
      console.error('Error stack:', error.stack);
      // Show error alert to user
      Alert.alert(
        'Error',
        `Failed to get response: ${error.message}`,
        [{ text: 'OK' }]
      );
      // Add error message to chat
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I apologize, but I encountered an error: ${error.message}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Handle keyboard submit
  const handleSubmit = () => {
    handleSend();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6A608C', '#2E096D']}
        style={styles.gradient}
      >
        <View style={styles.topNav}>
          {/* Left: Home Icon */}
          <TouchableOpacity style={styles.navIcon}>
            <Text style={styles.iconEmoji}>🏠</Text> 
          </TouchableOpacity>
          {/* Right: "Remy" */}
          <Link href="/(tabs)/dashboard" style={styles.brandTitle}>Remy</Link>
        </View>

        {/* Main Title */}
        <Text style={styles.screenTitle}>Sleep Analysis</Text>

        {/* Circle container (the ring) */}
        <View style={styles.ringContainer}>
          {/* Outer ring: big circle with thick border */}
          <View style={styles.outerRing}>
            {/* Inner content: Sleep Debt Info */}
            <View style={styles.innerRingContent}>
              <Text style={styles.sleepHours}>{sleepDebtHours} hrs</Text>
              <Text style={styles.sleepDebtLabel}>Sleep Debt</Text>
            </View>
          </View>
        </View>
        {/* Subtitle under ring */}
        <Text style={styles.subtitle}>sleep duration</Text>

        {/* Chat Area */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.chatContainer}
        >
          <Text style={styles.chatTitle}>Chat with Remy</Text>
          <ScrollView 
            ref={scrollViewRef}
            style={styles.chatBox}
            contentContainerStyle={styles.chatBoxContent}
          >
            {messages.map((message, index) => (
              <View 
                key={index} 
                style={[
                  styles.messageContainer,
                  message.role === 'user' ? styles.userMessage : styles.assistantMessage
                ]}
              >
                <Text style={styles.messageText}>{message.content}</Text>
              </View>
            ))}
            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="#fff" />
              </View>
            )}
          </ScrollView>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Write your message"
              placeholderTextColor="#B8AFC4"
              value={inputMessage}
              onChangeText={setInputMessage}
              multiline
              maxLength={500}
              onSubmitEditing={handleSubmit}
              returnKeyType="send"
            />
            <TouchableOpacity 
              style={[styles.sendButton, !inputMessage.trim() && styles.sendButtonDisabled]} 
              onPress={handleSend}
              disabled={!inputMessage.trim() || isLoading}
            >
              <Text style={styles.sendIcon}>➤</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}

const circleSize = 250; // Adjust as needed
const ringThickness = 15; // Adjust ring thickness

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  /* Top nav row: home icon (left), brand (right) */
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconEmoji: {
    fontSize: 28,
  },
  brandTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color: '#fff',
  },
  /* Page Title (e.g. "Sleep Analysis") */
  screenTitle: {
    marginTop: 20,
    fontFamily: 'Poppins-Regular',
    fontSize: 34,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  /* Circle container */
  ringContainer: {
    alignSelf: 'center',
    marginTop: 40,
  },
  /* Outer ring with a border to simulate a circular progress */
  outerRing: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    borderWidth: ringThickness,
    borderColor: '#8A62D2', // Adjust ring color
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* Center content within ring (e.g. "5.5 hrs Sleep Debt") */
  innerRingContent: {
    alignItems: 'center',
  },
  sleepHours: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  sleepDebtLabel: {
    fontSize: 16,
    color: '#C9BEE3',
    marginTop: 4,
  },
  /* Label under ring */
  subtitle: {
    fontSize: 16,
    color: '#B8AFC4',
    textAlign: 'center',
    marginTop: 10,
  },
  /* Chat area container */
  chatContainer: {
    flex: 1,
    marginTop: 40,
    marginBottom: 20,
  },
  chatTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  /* Chat messages box (blank purple panel) */
  chatBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 10,
  },
  chatBoxContent: {
    paddingBottom: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
    marginVertical: 5,
  },
  userMessage: {
    backgroundColor: '#2E096D',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  assistantMessage: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  /* Row for text input + send button */
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#fff',
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#2E096D',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendIcon: {
    color: '#fff',
    fontSize: 18,
  },
  loadingContainer: {
    padding: 10,
    alignItems: 'center',
  },
});
