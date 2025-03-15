import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  Image 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
// import { firebase } from './firebase'; // Uncomment if using Firebase

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // If using Firebase:
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then(userCredential => {
    //     const user = userCredential.user;
    //     console.log('Logged in with:', user.email);
    //   })
    //   .catch(error => {
    //     Alert.alert('Login Error', error.message);
    //   });

    console.log('Email:', email);
    console.log('Password:', password);
    Alert.alert('Login Attempt', 'Replace with Firebase or other auth logic.');
  };

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['#6A608C', '#2E096D']}
        style={styles.gradient}
      >
        {/* Top header with brand title (optional image on top-right) */}
        <View style={styles.header}>
          <Text style={styles.brandTitle}>Remy</Text>
          {/* <Image
            source={require('@/assets/images/top-right.png')}
            style={styles.topRightImage}
          /> */}
        </View>

        {/* Main login form content */}
        <View style={styles.mainContent}>
          <Text style={styles.screenTitle}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <Link href="/signup" style={styles.link}>Don't have an account? Sign Up</Link>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  /* Outer container to fill screen */
  container: {
    flex: 1,
  },
  /* Gradient background styling */
  gradient: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  /* Header row (top-left brand, optional top-right image) */
  header: {
    marginTop: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandTitle: {
    fontFamily: 'Poppins-Regular', // Ensure Poppins is loaded
    fontSize: 28,
    color: '#fff',
  },
  topRightImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  /* Main login form area */
  mainContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  screenTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    textAlign: 'left', // or 'center'
  },
  /* Bubble-shaped inputs */
  input: {
    fontFamily: 'Poppins-Regular',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30,        // Bubble corners
    paddingHorizontal: 20,   // More horizontal padding
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  /* Bubble-shaped button with #2E096D background */
  button: {
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#2E096D',
    paddingVertical: 15,
    borderRadius: 30, // bubble corners
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  link: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});
