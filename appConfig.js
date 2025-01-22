import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";

import {
  getDatabase,
  ref,
  child,
  get,
  set,
  update,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  deleteUser
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC8NZ_3aT0NvHonMjwt-4fUNzC0Bv98dRU",
  authDomain: "post-board-12e75.firebaseapp.com",
  databaseURL:
    "https://post-board-12e75-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "post-board-12e75",
  storageBucket: "post-board-12e75.firebasestorage.app",
  messagingSenderId: "203373866845",
  appId: "1:203373866845:web:ecfd8aa902994357f042b4",
};


export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const db = getDatabase()
export const auth = getAuth(app);
export { deleteUser,remove,onValue,signOut,signInWithEmailAndPassword,getDatabase, ref, child, get, set, update, createUserWithEmailAndPassword, onAuthStateChanged };