import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAjYxEDg6ok_L90Hst-pSnkwYiKkmsA7QM",
  authDomain: "rescuers-life.firebaseapp.com",
  databaseURL: "https://rescuers-life-default-rtdb.firebaseio.com",
  projectId: "rescuers-life",
  storageBucket: "rescuers-life.firebasestorage.app",
  messagingSenderId: "389281013597",
  appId: "1:389281013597:web:97907eee4d0775a81892b4",
  measurementId: "G-CSZ87BXE2H",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
