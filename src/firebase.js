// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaYSjluZP4TlgREx-zxZGSKlcZsTcjU5w",
  authDomain: "instagram-bbcc4.firebaseapp.com",
  projectId: "instagram-bbcc4",
  storageBucket: "instagram-bbcc4.appspot.com",
  messagingSenderId: "956804577883",
  appId: "1:956804577883:web:c584473ef74edbd4d3dd7e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const storage = getStorage(firebaseApp);

export {db, auth, storage};