// Import the necessary functions from Firebase SDK
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Import collection and getDocs

// Your Firebase web app's configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlC7Er02koaHJRyqKVE5lCb9ehR3pY2iI",
  authDomain: "remy-7fe52.firebaseapp.com",
  projectId: "remy-7fe52",
  storageBucket: "remy-7fe52.firebasestorage.app",
  messagingSenderId: "466323183984",
  appId: "1:466323183984:web:e0136df54c58ce1a3b17b5",
  measurementId: "G-9Q4XBWB00N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);  // Correct initialization of Firestore

// Export Firestore, collection, and getDocs
export { firestore, collection, getDocs };
