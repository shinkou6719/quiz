import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";

import {
getDatabase
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkD8hSaEXgFVl5tvthTnGfu7be9b-AF7E",
  authDomain: "quiz-a0671.firebaseapp.com",
  projectId: "quiz-a0671",
  storageBucket: "quiz-a0671.firebasestorage.app",
  messagingSenderId: "91982876316",
  appId: "1:91982876316:web:9c3257b664b7a889dc6759"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);