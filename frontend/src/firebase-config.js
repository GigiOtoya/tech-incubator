import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOvm0uAyPlyVq-OFlXpJRqLclxbK3roSQ",
  authDomain: "techincubator-f3307.firebaseapp.com",
  projectId: "techincubator-f3307",
  storageBucket: "techincubator-f3307.appspot.com",
  messagingSenderId: "661263933945",
  appId: "1:661263933945:web:2ea4d26c130dd35c629d28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider;