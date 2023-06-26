// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
// import firebase from 'firebase/app';
// import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnuNbKRvbO-fKdS9jWonaJUaxNyuybG6Q",
  authDomain: "whatsapp-clone-react-17965.firebaseapp.com",
  projectId: "whatsapp-clone-react-17965",
  storageBucket: "whatsapp-clone-react-17965.appspot.com",
  messagingSenderId: "903950213768",
  appId: "1:903950213768:web:b0a6052b5745ff9216353d"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
export default db;