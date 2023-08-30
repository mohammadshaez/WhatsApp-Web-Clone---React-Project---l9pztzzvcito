import firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAQmXCnd_imCLa0zxrGm0bGbLLtHPmFZNo",
  authDomain: "whatsapp-clone-new-3cd1e.firebaseapp.com",
  projectId: "whatsapp-clone-new-3cd1e",
  storageBucket: "whatsapp-clone-new-3cd1e.appspot.com",
  messagingSenderId: "70644709947",
  appId: "1:70644709947:web:9bd0e6550921a627277a1e",
};

// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = app.storage();

export { db, auth, provider, storage };
