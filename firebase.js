import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDE1v902Z1I2HRjbplU-CcUjnFUiPTflrg",
  authDomain: "easyshop-86a5a.firebaseapp.com",
  databaseURL:
    "https://easyshop-86a5a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "easyshop-86a5a",
  storageBucket: "easyshop-86a5a.appspot.com",
  messagingSenderId: "99741031462",
  appId: "1:99741031462:web:cb0132d25532c4b12edae7",
  measurementId: "G-1GBBGNWEWG",
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getDatabase(app);
