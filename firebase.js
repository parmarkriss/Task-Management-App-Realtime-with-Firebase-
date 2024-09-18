import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhav4eIurbb4KQxJl3juDAIxNBUt2l9Fc",
  authDomain: "task-management-1142f.firebaseapp.com",
  projectId: "task-management-1142f",
  storageBucket: "task-management-1142f.appspot.com",
  messagingSenderId: "358538435951",
  appId: "1:358538435951:web:e76682e7a65268abfe9c9a",
  databaseURL: "https://task-management-1142f-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase(app);