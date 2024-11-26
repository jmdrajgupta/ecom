// firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_SECRET_KEY,
  authDomain: "khetan-90c33.firebaseapp.com",
  projectId: "khetan-90c33",
  storageBucket: "khetan-90c33.appspot.com",
  messagingSenderId: "1042384092331",
  appId: "1:1042384092331:web:5ed8bc12fdae5ed69f8bee",
  databaseURL: "https://khetan-90c33-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Function to add user data to Firestore
const addUserToFirestore = async (userId, username, password) => {
  try {
    await setDoc(doc(db, "users", userId), {
      username: username,
      password: password, // Store password securely (consider hashing in real-world apps)
    });
    alert("User details saved successfully!");
    console.log("User data added to Firestore");
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
  }
};

export { auth, db, app, addUserToFirestore };


