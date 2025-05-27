/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyAJeycimYvrr8X0B1u8jiadLtLm5wXmEvE",
  authDomain: "fluxcart.firebaseapp.com",
  projectId: "fluxcart",
  storageBucket: "fluxcart.firebasestorage.app",
  messagingSenderId: "691997793254",
  appId: "1:691997793254:web:a0771d98610e1c7ce01427",
  measurementId: "G-T10BRWFKBL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app); 

export { db, auth };