// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOGeB7fmev9kEscADX2SIij5IflhNGNg4",
  authDomain: "photofolio-d4b05.firebaseapp.com",
  projectId: "photofolio-d4b05",
  storageBucket: "photofolio-d4b05.appspot.com",
  messagingSenderId: "1015659069925",
  appId: "1:1015659069925:web:70109d6b9bc68e561e6f0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};