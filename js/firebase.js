import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js"

export const firebaseConfig = {
  apiKey: "AIzaSyDtv_mjLaZQImF4KoKy6s-moer6TtOVJiI",
  authDomain: "geosmart-uw.firebaseapp.com",
  projectId: "geosmart-uw",
  storageBucket: "geosmart-uw.appspot.com",
  messagingSenderId: "244030791746",
  appId: "1:244030791746:web:f6c34ef4b145ab7d1a8ddb",
  measurementId: "G-9L9TCCS7HD"
}

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);