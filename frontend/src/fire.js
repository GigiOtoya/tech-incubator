//import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

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
const fire = firebase.initializeApp(firebaseConfig)

export default fire