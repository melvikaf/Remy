import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  TextInput 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// If using expo-router or react-navigation, import and navigate accordingly.
// For now, the home icon press is just a placeholder.

export default function SleepAnalysisScreen() {
  const sleepDebtHours = 5.5;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6A608C', '#2E096D']}
        style={styles.gradient}
      >
        {/* Top nav row */}
        <View style={styles.topNav}>
          {/* Left: Home Icon */}
          <TouchableOpacity style={styles.navIcon} onPress={() => { /* Navigate home */ }}>
            {/* Replace with your actual icon asset, e.g. <Image source={require('...')} /> */}
            <Text style={styles.iconEmoji}>🏠</Text> 
          </TouchableOpacity>
          {/* Right: "Remy" */}
          <Text style={styles.brandTitle}>Remy</Text>
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
        <View style={styles.chatContainer}>
          <Text style={styles.chatTitle}>chat with Remy</Text>
          <View style={styles.chatBox}>
            {/* This would be the conversation area, omitted for brevity */}
          </View>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Write your message"
              placeholderTextColor="#B8AFC4"
            />
            <TouchableOpacity style={styles.sendButton} onPress={() => {/* handle send */}}>
              {/* Replace with your own send icon if desired */}
              <Text style={styles.sendIcon}>➤</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    marginTop: 40,
    marginBottom: 20,
    // flex: 1, // If you want it to expand to fill space
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    height: 150,
    marginBottom: 10,
  },
  /* Row for text input + send button */
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    color: '#fff',
    paddingHorizontal: 10,
    height: 50,
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4F317B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    fontSize: 20,
    color: '#fff',
  },
});
