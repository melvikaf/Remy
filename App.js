import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import MusicGenerator from './src/components/MusicGenerator'; // Import the MusicGenerator component
import UserFetch from './src/firebase_components/userFetch.js'; // Make sure the path is correct

export default function App() {
  // Debugging: Add a useEffect to log when the component is mounted
  useEffect(() => {
    console.log('App component mounted');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>App Component Loaded</Text>  {/* This will show if the App component loads */}
      <MusicGenerator />
      <UserFetch />  {/* Ensure this component is rendered */}
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
