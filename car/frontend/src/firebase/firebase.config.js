// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJX-R2RUZcV_ADckH5bvhOeBuampPFvts",
  authDomain: "coffee-auth-1f081.firebaseapp.com",
  projectId: "coffee-auth-1f081",
  storageBucket: "coffee-auth-1f081.appspot.com",
  messagingSenderId: "378321908022",
  appId: "1:378321908022:web:518359255e6fd5edb4c397",
  measurementId: "G-95N2R1W0YK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app