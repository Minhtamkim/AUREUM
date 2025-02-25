// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4mNM46y719rqtzJbxkaHwLsdQclXtS18",
  authDomain: "aureum-5ccd3.firebaseapp.com",
  projectId: "aureum-5ccd3",
  storageBucket: "aureum-5ccd3.firebasestorage.app",
  messagingSenderId: "945844746857",
  appId: "1:945844746857:web:fed223d8e4f104a2b5c0f8",
  measurementId: "G-9K83Q5GSBN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
