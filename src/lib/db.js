// src/lib/db.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfIs2T5vd41rBdDZzcHs6DVtyTj7-1Uzs",
  authDomain: "log-book-5546e.firebaseapp.com",
  projectId: "log-book-5546e",
  storageBucket: "log-book-5546e.firebasestorage.app",
  messagingSenderId: "632315241564",
  appId: "1:632315241564:web:3415cb615af38d97277299",
  measurementId: "G-FS8SVN7QH1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);