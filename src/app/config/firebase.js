import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTpGxOnqKWpX7Y0Km-LUIzWLDL1NP4G30",
  authDomain: "kievents-3bba0.firebaseapp.com",
  databaseURL: "https://kievents-3bba0.firebaseio.com",
  projectId: "kievents-3bba0",
  storageBucket: "kievents-3bba0.appspot.com",
  messagingSenderId: "349294655188"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore()

export default firebase;
