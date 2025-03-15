import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function DashboardScreen() {
  const username = 'username'; // Replace or fetch dynamically

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['#6A608C', '#2E096D']}
        style={styles.gradient}
      >
        {/* Greeting at the top */}
        <Text style={styles.greeting}>Good evening, {username}</Text>

        {/* Middle cards row */}
        <View style={styles.cardsContainer}>
          {/* Sleep Analysis Card */}
          <TouchableOpacity style={styles.card} onPress={() => {/* navigate or handle press */}}>
            {/* Replace with your moon icon/image */}
            <Text style={styles.cardIcon}>🌙</Text>
            <Text style={styles.cardText}>Sleep Analysis</Text>
          </TouchableOpacity>

          {/* Sleep Audio Card */}
          <TouchableOpacity style={styles.card} onPress={() => {/* navigate or handle press */}}>
          <Text style={styles.cardIcon}>🎵</Text>
            <Text style={styles.cardText}>Sleep Audio</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom moon + Remy branding */}
        <View style={styles.bottomContainer}>
          {/* Large moon image */}
          <Image 
            source={require('/Users/owenwilsontedja/Remy/Remy_app/moonpurp.png')} 
            style={styles.moonImage}
          />
          <Text style={styles.brandText}>Remy</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  /* Outermost container */
  container: {
    flex: 1,
  },
  /* Gradient background filling the screen */
  gradient: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 80, // space from top
  },
  /* Greeting text at the top */
  greeting: {
    fontFamily: 'Poppins-Regular', // Make sure Poppins is loaded
    fontSize: 28,
    color: '#fff',
    marginBottom: 40,
    alignSelf: 'flex-start',
  },
  /* Row containing the two cards */
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40, // space between cards and bottom moon
  },
  /* Individual card styling */
  card: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    marginHorizontal: 5,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /* Example icon (emoji) in the card */
  cardIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  /* Card text styling */
  cardText: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    fontSize: 18,
  },
  /* Bottom container for the moon + "Remy" text */
  bottomContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20, // adjust as needed
  },
  /* Large moon image at the bottom */
  moonImage: {
    width: 700,
    height: 500,
    resizeMode: 'contain',
    marginBottom: -120, // so the brand text can overlay
  },
  /* "Remy" text over the moon */
  brandText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    position: 'absolute',
    color: '#fff',
  },
});
