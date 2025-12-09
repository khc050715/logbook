// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4Dfh7uWHzXtjtQ_weJSrgBkw7SOHDIvk",
  authDomain: "webproj-18864.firebaseapp.com",
  projectId: "webproj-18864",
  storageBucket: "webproj-18864.firebasestorage.app",
  messagingSenderId: "1038816642924",
  appId: "1:1038816642924:web:019846bfb58489384f9549",
  measurementId: "G-BHDZZRFTS2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);