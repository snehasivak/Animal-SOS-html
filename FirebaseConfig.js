import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// Replace with your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzO8TXsxtpxmdowZyYVRVWWZbLHXq9Zjc",
  authDomain: "animal-sos-d787a.firebaseapp.com",
  projectId: "animal-sos-d787a",
  storageBucket: "animal-sos-d787a.appspot.com",
  messagingSenderId: "862033038405",
  appId: "1:862033038405:web:3c2ee304107a6273dc672c",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();