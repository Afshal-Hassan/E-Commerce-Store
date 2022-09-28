import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';



const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: "cleever-store.firebaseapp.com",
  projectId: "cleever-store",
  storageBucket: "cleever-store.appspot.com",
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};



const firebaseApp = firebase.initializeApp(firebaseConfig);
export  const db = firebaseApp.firestore();
export  const auth = firebase.auth();
