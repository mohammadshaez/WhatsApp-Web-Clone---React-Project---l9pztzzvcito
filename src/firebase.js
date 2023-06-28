import { initializeApp } from 'firebase/app';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4zU8SwS3mbQ4j87NRgFblHDFbowrRUTY",
  authDomain: "whatsapp-clone-2-72f58.firebaseapp.com",
  projectId: "whatsapp-clone-2-72f58",
  storageBucket: "whatsapp-clone-2-72f58.appspot.com",
  messagingSenderId: "729698639296",
  appId: "1:729698639296:web:49614bd2c546013f1b3c25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;