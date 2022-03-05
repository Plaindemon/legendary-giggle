// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChYsGA6iFWHXvVwWbFOD3awt9udKEl4zE",
  authDomain: "frozen-dark.firebaseapp.com",
  projectId: "frozen-dark",
  storageBucket: "frozen-dark.appspot.com",
  messagingSenderId: "336841617154",
  appId: "1:336841617154:web:d152a164acfe0e0ccb9c1b",
  measurementId: "G-23BCH4ZPZ2"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export const fb = {
  auth,
  storage,
  firestore,
};