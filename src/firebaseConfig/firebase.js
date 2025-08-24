// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDn6zLtMuSuwW7gbCGi-NbW7s5iSKZLl7U",
  authDomain: "findmyai-ed99f.firebaseapp.com",
  projectId: "findmyai-ed99f",
  storageBucket: "findmyai-ed99f.firebasestorage.app",
  messagingSenderId: "148428042298",
  appId: "1:148428042298:web:e09a2d529658e51ef64503",
  measurementId: "G-04CLQG97CW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
// const analytics = getAnalytics(app); // Removed unused variable to fix lint error