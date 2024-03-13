import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB5C6ZDTsf6xfqJUDo4KLxwV8Dx8XWzfLM",
    authDomain: "pushnotification-973cd.firebaseapp.com",
    projectId: "pushnotification-973cd",
    storageBucket: "pushnotification-973cd.appspot.com",
    messagingSenderId: "815633608644",
    appId: "1:815633608644:web:27fdd74246c254bca03e91",
    measurementId: "G-QZ1QLM0M6T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);