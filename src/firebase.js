import { initializeApp } from "firebase/app";
import {getFirestore}  from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "task-app5.firebaseapp.com",
  projectId: "task-app5",
  storageBucket: "task-app5.appspot.com",
  messagingSenderId: "908598683994",
  appId: "1:908598683994:web:8be41e99e0a33719e7eb63"
};


export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const auth = getAuth()