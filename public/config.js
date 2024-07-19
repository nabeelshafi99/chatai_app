import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";

import { getFirestore ,addDoc ,collection ,getDocs  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword, onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyBZe68Y7JpvkLyVm3y2kO2MP78y6Iemhvk",
  authDomain: "chatapp-nabeelshafi.firebaseapp.com",
  projectId: "chatapp-nabeelshafi",
  storageBucket: "chatapp-nabeelshafi.appspot.com",
  messagingSenderId: "1084252142195",
  appId: "1:1084252142195:web:8b040cce3e0ed6cf1e0806"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export {
  app,
  db,
  auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword, onAuthStateChanged,
  collection, getDocs, addDoc , signOut
}