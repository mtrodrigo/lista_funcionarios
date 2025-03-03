// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBaG8l3Y0AgeSIvGOTzvFWfSB1YRajrSe0",
  authDomain: "empresaficticia-f6495.firebaseapp.com",
  projectId: "empresaficticia-f6495",
  storageBucket: "empresaficticia-f6495.firebasestorage.app",
  messagingSenderId: "746219375511",
  appId: "1:746219375511:web:09289b97c1fa2c0c4412d2",
  measurementId: "G-LPVMQ9GMB7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }