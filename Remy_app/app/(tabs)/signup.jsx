import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  Image 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
// import { firebase } from './firebase'; // Uncomment if you're using Firebase

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    // If using Firebase:
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //   .then(userCredential => {
    //     console.log('User created with:', userCredential.user.email);
    //   })
    //   .catch(error => {
    //     Alert.alert('Signup Error', error.message);
    //   });
    Alert.alert('Signup Attempt', 'Replace with Firebase or other auth logic.');
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
          {/* If you'd like an image in the top-right, uncomment and update path:
          <Image 
            source={require('@/assets/images/top-right.png')} 
            style={styles.topRightImage} 
          />
          */}
        </View>

        {/* Main signup form content */}
        <View style={styles.mainContent}>
          <Text style={styles.screenTitle}>Sign Up</Text>

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

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

           <Link href="/login" style={styles.link}>ALready have an account? Log in</Link>
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
  /* Main signup form area */
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
    borderRadius: 30,        // bubble corners
    paddingHorizontal: 20,
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
