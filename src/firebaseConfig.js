// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDs_BipGbauP2AEbfWbSs5juObBuYIVeyQ",
  authDomain: "kbbi-online.firebaseapp.com",
  projectId: "kbbi-online",
  storageBucket: "kbbi-online.appspot.com",
  messagingSenderId: "668186385952",
  appId: "1:668186385952:web:756f1b11c6bed2601e6645",
  measurementId: "G-3EE0XD5WHV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);