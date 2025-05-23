import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['#6A608C', '#2E096D']}
        style={styles.gradient}
      >
        {/* Top header with Remy title (left) and image (right) */}
        <View style={styles.header}>
          <Link href="/(tabs)/dashboard" style={styles.brandTitle}>Remy</Link>
          <Image
            source={require('../moonpurp.png')}
            style={styles.topRightImage}
          />
        </View>

        {/* Main content in the middle */}
        <View style={styles.mainContent}>
          <Text style={styles.text}>Fall asleep quickly with Remy</Text>
        </View>

        {/* Button row at the bottom */}
        <View style={styles.buttonContainer}>
          <Link href="/signup" style={styles.button}>Signup</Link>
          <Link href="/login" style={styles.button}>Login</Link>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    marginTop: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 28,
    color: '#fff',
    marginTop: -150,
  },
  topRightImage: {
    width: 500,
    height: 550,
    marginTop: -60,
    marginRight: -200,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#fff',
    marginBottom: 40,
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 200,
    width: '70%',
  },
  button: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#2E096D',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '45%',
  },
});
