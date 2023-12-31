// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2f2gpSEwedQSS03l_PLVT7xqc66JklyY",
  authDomain: "personal-finance-tracker-256fb.firebaseapp.com",
  projectId: "personal-finance-tracker-256fb",
  storageBucket: "personal-finance-tracker-256fb.appspot.com",
  messagingSenderId: "623252465051",
  appId: "1:623252465051:web:692151bc0ee27e25a6ad3e",
  measurementId: "G-80PLG2FRT4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };
