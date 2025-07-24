// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDjEZye_acZYmEWYoPMGF2asfQ6ATreLAY",
  authDomain: "battlebillions-78513.firebaseapp.com",
  projectId: "battlebillions-78513",
  storageBucket: "battlebillions-78513.firebasestorage.app",
  messagingSenderId: "193175716159",
  appId: "1:193175716159:web:7dcc6d4ea5f5f2422e138a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
