// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  GithubAuthProvider, 
  signInWithPopup 
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjEZye_acZYmEWYoPMGF2asfQ6ATreLAY",
  authDomain: "battlebillions-78513.firebaseapp.com",
  projectId: "battlebillions-78513",
  storageBucket: "battlebillions-78513.appspot.com",
  messagingSenderId: "193175716159",
  appId: "1:193175716159:web:7dcc6d4ea5f5f2422e138a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Generic function to sign in with any provider
export async function signInWith(provider) {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User Info:", result.user);
    return result.user;
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
}
