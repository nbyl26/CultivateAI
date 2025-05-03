import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCQofORomcNIvzKgO19zUJ7SrCusQCmac",
  authDomain: "cultivateai-3abfe.firebaseapp.com",
  projectId: "cultivateai-3abfe",
  storageBucket: "cultivateai-3abfe.firebasestorage.app",
  messagingSenderId: "2392928463",
  appId: "1:2392928463:web:f880331eb271042b5e87ba",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
