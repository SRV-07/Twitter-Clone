import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_QsCsZsmw6k5ERsEPsyZxPGcTVOV2Iwc",
  authDomain: "twitter-clone-61be7.firebaseapp.com",
  projectId: "twitter-clone-61be7",
  storageBucket: "twitter-clone-61be7.appspot.com",
  messagingSenderId: "840731904485",
  appId: "1:840731904485:web:9c6e6cf10e56d0135b070c",
  measurementId: "G-MHNY0ZD06C"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export default auth; 