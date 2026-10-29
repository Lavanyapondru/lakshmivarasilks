// ============================================================================
// Firebase Initialization & SDK Configuration
// Project: lvssilks (Laxmi Vara Silks)
// ============================================================================
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyd1r12R8a8ClRH1_ktWELdVSBEolc-G8",
  authDomain: "lvssilks.firebaseapp.com",
  projectId: "lvssilks",
  storageBucket: "lvssilks.firebasestorage.app",
  messagingSenderId: "2803423606",
  appId: "1:2803423606:web:c57047942cb8dafa864257",
  measurementId: "G-H9HEHCMZ39"
};

// Initialize Firebase (Singleton pattern to prevent duplicate initializations)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firebase Core Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialize Firebase Analytics conditionally (only in supported browser environments)
export let analytics = null;
if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
        console.log("Firebase Analytics initialized successfully for lvssilks");
      }
    })
    .catch((err) => {
      console.warn("Firebase Analytics initialization skipped:", err);
    });
}

export default app;
