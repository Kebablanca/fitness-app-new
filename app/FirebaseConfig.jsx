import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1qvxhv22gbYd9o-337F5ZaWLMMPUvRUs",
  authDomain: "fitness-app-da524.firebaseapp.com",
  projectId: "fitness-app-da524",
  storageBucket: "fitness-app-da524.appspot.com",
  messagingSenderId: "968226149373",
  appId: "1:968226149373:web:b4818286f272b4c68aff94"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth,db };
