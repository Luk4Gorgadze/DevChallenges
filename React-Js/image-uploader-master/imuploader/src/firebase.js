// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDvKrlsGocPZ7mSjEKh-M-zv3dMsACad9U",
  authDomain: "imageuploader-6a32e.firebaseapp.com",
  projectId: "imageuploader-6a32e",
  storageBucket: "imageuploader-6a32e.appspot.com",
  messagingSenderId: "406177094130",
  appId: "1:406177094130:web:a6edc8c86606168e26736b",
  measurementId: "G-HKPFY46S3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);