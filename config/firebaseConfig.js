// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBm7taw0kANJFOwbdAsFmvN6e8bhHtYnrI",
    authDomain: "cuan-25506.firebaseapp.com",
    projectId: "cuan-25506",
    storageBucket: "cuan-25506.appspot.com",
    messagingSenderId: "3062989589",
    appId: "1:3062989589:web:3022782bd3ed9b1a8adf1c"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;