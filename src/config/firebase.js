// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use:
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-KDW7DzblBVLubVOWzTp-HTslkPgMRiw",
  authDomain: "gallery-designer.firebaseapp.com",
  projectId: "gallery-designer",
  storageBucket: "gallery-designer.appspot.com",
  messagingSenderId: "865526830202",
  appId: "1:865526830202:web:2cbc715166083383e8d7c3",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const storage = firebase.storage();
const db = firebase.firestore();

export { firebase, timestamp, db, storage };
