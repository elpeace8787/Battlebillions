<script type="module">
// Replace with your config from Firebase console
export const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  appId: "YOUR_APP_ID",
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth, onAuthStateChanged,
  signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore, doc, getDoc, setDoc, updateDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getStorage, ref as sRef, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);
export const storage = getStorage(app);

// Minimal profile helpers
export async function ensureUserDoc(u){
  const ref = doc(db, "users", u.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      email: u.email || "",
      avatarURL: u.photoURL || "",
      username: null,
      createdAt: serverTimestamp(),
      // Optional fields you already collect in Create Account:
      country: null, state: null, city: null, tz: null,
      dob: null, age: null, chineseZodiac: null,
      languages: [], ethnicity: null,
      education: { hs:null, college:null, role:null },
      categories: []
    });
  }
}

// Avatar upload
export async function uploadAvatar(file, uid){
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const key = `avatars/${uid}/avatar.${ext}`;
  const r = sRef(storage, key);
  await uploadBytes(r, file, { contentType: file.type || "image/jpeg" });
  const url = await getDownloadURL(r);
  await updateDoc(doc(db, "users", uid), { avatarURL: url });
  await updateProfile(auth.currentUser, { photoURL: url }).catch(()=>{});
  return url;
}

// Username setter (unique check via mirror map)
export async function setUsername(uid, username){
  const uname = (username||"").trim().toLowerCase();
  if(!/^[a-z0-9_]{3,20}$/.test(uname)) throw new Error("Invalid username.");
  const mapRef = doc(db, "usernames", uname);
  const takeRef = doc(db, "users", uid);

  // One-time claim with Firestore transaction-like pattern
  const { runTransaction } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");
  await runTransaction(db, async (tx)=>{
    const m = await tx.get(mapRef);
    if (m.exists() && m.data().uid !== uid) throw new Error("Username is taken.");
    tx.set(mapRef, { uid, updatedAt: serverTimestamp() });
    tx.update(takeRef, { username: uname });
  });
  return uname;
}

export {
  onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile,
  doc, getDoc, setDoc, updateDoc, serverTimestamp
};
</script>
