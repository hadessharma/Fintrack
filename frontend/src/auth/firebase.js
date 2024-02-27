// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  // GoogleAuthProvider,
  getAuth,
  signOut,
  // signInWithEmailAndPassword,
  // createUserWithEmailAndPassword,
  // sendPasswordResetEmail,
  // signOut,
  // signInWithPopup,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFdc5x5CTYWNRmo-HEJ2myj_Z1klRdT0g",
  authDomain: "fintrack-94a15.firebaseapp.com",
  projectId: "fintrack-94a15",
  storageBucket: "fintrack-94a15.appspot.com",
  messagingSenderId: "4837489028",
  appId: "1:4837489028:web:d4403e8d48448cfeb085d1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const logout = () => {
  signOut(auth)
    .then(() => console.log("user signed out."))
    .catch((error) => console.log(error));
};
export { auth, db, logout };
