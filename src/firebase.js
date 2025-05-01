import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBzY1Mj75sVRaxum1nZ4u3dS5Ch00Pvq-Y",
  authDomain: "chatroomie-87d55.firebaseapp.com",
  databaseURL:
    "https://chatroomie-87d55-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "chatroomie-87d55",
  storageBucket: "chatroomie-87d55.firebasestorage.app",
  messagingSenderId: "197292807193",
  appId: "1:197292807193:web:ed59ed069cbf2b3a4f8688",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
