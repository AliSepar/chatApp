import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-cb34d.firebaseapp.com",
  projectId: "reactchat-cb34d",
  storageBucket: "reactchat-cb34d.appspot.com",
  messagingSenderId: "359093930613",
  appId: "1:359093930613:web:7f7e2f4582885d8f7e463c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
