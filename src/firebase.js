import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrOaIqA1iSmmeeEpuGANSaYWzHtIGvaek",
  authDomain: "shopsync-b5eb0.firebaseapp.com",
  projectId: "shopsync-b5eb0",
  storageBucket: "shopsync-b5eb0.appspot.com",
  messagingSenderId: "984886187668",
  appId: "1:984886187668:web:ead1f4b364d168bfebc681",
  measurementId: "G-H323JVS4L4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);