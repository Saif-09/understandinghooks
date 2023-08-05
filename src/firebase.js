import { initializeApp } from 'firebase/app';
// Initialize Firebase
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBCqYTEBV-ruX7gI_mLSFUDe8aR4t40Lng",
    authDomain: "blogging-app-7201d.firebaseapp.com",
    projectId: "blogging-app-7201d",
    storageBucket: "blogging-app-7201d.appspot.com",
    messagingSenderId: "893047740106",
    appId: "1:893047740106:web:37bca9c70cb9828a048633"
};

const app=initializeApp(firebaseConfig);
export const db = getFirestore(app);
