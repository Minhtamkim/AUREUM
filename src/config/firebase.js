// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwHJMWfI1UR3UGpTQQyvArI7t81zchW5s",
  authDomain: "skincare-product-e4225.firebaseapp.com",
  projectId: "skincare-product-e4225",
  storageBucket: "skincare-product-e4225.firebasestorage.app",
  messagingSenderId: "975693321570",
  appId: "1:975693321570:web:0305fd020b7ebe81dc083b",
  measurementId: "G-YH55T4N7JT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
