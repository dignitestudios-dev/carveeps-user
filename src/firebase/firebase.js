// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "carveeps-test.firebaseapp.com",
  projectId: "carveeps-test",
  storageBucket: "carveeps-test.appspot.com",
  messagingSenderId: "942195275591",
  appId: "1:942195275591:web:f75f16f92d5db9e342be62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export { messaging };
