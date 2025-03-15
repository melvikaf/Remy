import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

export default function DashboardScreen() {
  const username = 'username'; // Replace with actual username or state

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['#6A608C', '#2E096D']}
        style={styles.gradient}
      >
        {/* Top-left "Remy" brand */}
        <View style={styles.header}>
          <Text style={styles.brandTitle}>Remy</Text>
        </View>

        {/* Greeting text below the brand */}
        <Text style={styles.greeting}>Good evening, {username}</Text>

        {/* Middle cards row */}
        <View style={styles.cardsContainer}>
          
          {/* Sleep Analysis Card */}
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => {
              // navigate or handle press
            }}
          >
            <Text style={styles.cardIcon}>🌙</Text>
            <Text style={styles.cardText}>Sleep Analysis</Text>
          </TouchableOpacity>
          
          {/* Sleep Audio Card with Link */}
          <Link href="/musicGenerator" asChild>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardIcon}>🎵</Text>
              <Text style={styles.cardText}>Sleep Audio</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Bottom moon + Remy branding */}
        <View style={styles.bottomContainer}>
          <Image 
            source={require('/Users/owenwilsontedja/Remy/Remy_app/moonpurp.png')} 
            style={styles.moonImage}
          />
          <Text style={styles.bottomBrandText}>Remy</Text>
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
    paddingTop: 50,
  },
  /* Header: top-left Remy */
  header: {
    width: '100%',
    alignItems: 'flex-start', // align "Remy" to the left
    marginBottom: 10,
  },
  brandTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 26,
    color: '#fff',
  },
  /* Greeting text below it */
  greeting: {
    fontFamily: 'Poppins-Regular', 
    fontSize: 28,
    color: '#fff',
    marginTop:250,
    marginBottom: 30,
    alignSelf: 'flex-start', // or 'center' if you want it centered
  },
  /* Row containing the two cards */
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  /* Shared card styling */
  card: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    marginHorizontal: 5,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /* Icons (emoji) in the card */
  cardIcon: {
    fontSize: 36,
    marginBottom: 10,
    color: '#fff',
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
    marginBottom: 20,
  },
  /* Large moon image at the bottom */
  moonImage: {
    width: 700,
    height: 500,
    resizeMode: 'contain',
    marginBottom: -120,
  },
  /* "Remy" text over the moon */
  bottomBrandText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    position: 'absolute',
    color: '#fff',
  },
});
