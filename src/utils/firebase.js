// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN1zFv6DQBHkmpWg3MBhT7QQHGGix-X7Q",
  authDomain: "netflixgpt-9a9e5.firebaseapp.com",
  projectId: "netflixgpt-9a9e5",
  storageBucket: "netflixgpt-9a9e5.appspot.com",
  messagingSenderId: "825059197982",
  appId: "1:825059197982:web:7d72f5345fb610c1961a0f",
  measurementId: "G-JQLZ51023D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();