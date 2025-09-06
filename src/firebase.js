import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvq_eJFEUsrgICVMiMJ8giub6espNsJ4o",
  authDomain: "smart-curriculum-9fd1b.firebaseapp.com",
  projectId: "smart-curriculum-9fd1b",
  storageBucket: "smart-curriculum-9fd1b.appspot.com",
  messagingSenderId: "690734622935",
  appId: "1:690734622935:web:17572ef07c0eacb8132892",
  measurementId: "G-3BQC4LZWHB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };  // <-- export app too

