import { initializeApp } from "firebase/app";
import {
  getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider,
  signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const app = initializeApp({ /* your keys */ });
export const auth = getAuth(app);
export const db   = getFirestore(app);

export const googleProvider   = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const twitterProvider  = new TwitterAuthProvider();

export {
  signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged,
  doc, getDoc, setDoc, serverTimestamp
};
