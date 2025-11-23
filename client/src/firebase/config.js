import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6oECDeHo652GMImfZxe3f9htCTREVedg",
  authDomain: "crumbly-47b84.firebaseapp.com",
  projectId: "crumbly-47b84",
  storageBucket: "crumbly-47b84.appspot.com",
  messagingSenderId: "516824264264",
  appId: "1:516824264264:web:f43d810c9722d4eedff27d",
  measurementId: "G-GDM7GH6GPD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup };
