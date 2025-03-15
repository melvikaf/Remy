import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MusicGenerator from './src/components/MusicGenerator'; // Import the MusicGenerator component

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <MusicGenerator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  // This allows SafeAreaView to fill the entire screen
    backgroundColor: '#ffffff',  // Set a background color for the whole screen
    paddingTop: 50,  // To avoid the status bar on iOS
  },
});
