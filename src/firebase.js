// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIK3D-zezjU75j4em9rC-fnMT_-IUxDwc",
  authDomain: "food-delivery-app-9782d.firebaseapp.com",
  projectId: "food-delivery-app-9782d",
  storageBucket: "food-delivery-app-9782d.firebasestorage.app",
  messagingSenderId: "548571004914",
  appId: "1:548571004914:web:d971b2a0ca18982b93f56b",
  measurementId: "G-9N2Q845H62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);