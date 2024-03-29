import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCIzCWr7Es30dvvA67EBMrcAKE-q-PeWLU",
  authDomain: "blog-5932f.firebaseapp.com",
  projectId: "blog-5932f",
  storageBucket: "blog-5932f.appspot.com",
  messagingSenderId: "321373909203",
  appId: "1:321373909203:web:2ae982fb7a560f6603a426",
  measurementId: "G-F3B95Y3TJN"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()