// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBMbHLZWR6Fq0eWDhJSF-7720aXP_KVD5Q",
  authDomain: "melodyplayer-e9dca.firebaseapp.com",
  projectId: "melodyplayer-e9dca",
  storageBucket: "melodyplayer-e9dca.appspot.com", // fixed `.app` to `.appspot.com`
  messagingSenderId: "988800680232",
  appId: "1:988800680232:web:516679f4068679b2d3901d",
  measurementId: "G-FV9K05JJ5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Setup auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
