import { initializeApp } from "firebase/app";
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager 
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyB7-iFVAyRM-wZKrXwIUyZgoB3TgsSUrRA",

  authDomain: "reim-portal.firebaseapp.com",

  projectId: "reim-portal",

  storageBucket: "reim-portal.firebasestorage.app",

  messagingSenderId: "495702495951",

  appId: "1:495702495951:web:cd32c97103c736be2b9dba",

  measurementId: "G-F0ZHQN17NR"

};

const app = initializeApp(firebaseConfig);

// הגדרת מטמון (Cache) מודרנית לביצועים מקסימליים
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});

export const auth = getAuth(app);