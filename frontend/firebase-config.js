
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    getAuth,
    GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCYC5sDC1hZZNciVMJuIXbOVQKUUv3SBS4",
    authDomain: "careerpath-ec3bb.firebaseapp.com",
    projectId: "careerpath-ec3bb",
    storageBucket: "careerpath-ec3bb.firebasestorage.app",
    messagingSenderId: "66511788631",
    appId: "1:366511788631:web:c00c5d4c1f9feb6d1a0912",
    measurementId: "G-ZPXB5F5X0V"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firestore
const db = getFirestore(app);


// Initialize Authentication
const auth = getAuth(app);


// Google login provider
const googleProvider = new GoogleAuthProvider();


// Export Firebase services
export {
    app,
    auth,
    googleProvider,
    db
};