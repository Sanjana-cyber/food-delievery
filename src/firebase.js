// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIK3D-zezjU75j4em9rC-fnMT_-IUxDwc",
  authDomain: "food-delivery-app-9782d.firebaseapp.com",
  projectId: "food-delivery-app-9782d",
  storageBucket: "food-delivery-app-9782d.appspot.com", // small fix: use .appspot.com
  messagingSenderId: "548571004914",
  appId: "1:548571004914:web:d971b2a0ca18982b93f56b",
  measurementId: "G-9N2Q845H62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth instance
export const auth = getAuth(app);
