import * as firebase from 'firebase';
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyDdHAHeEDeyUaWsQs7HsW_W2X6elNAHJs0",
    authDomain: "storyhub-3307b.firebaseapp.com",
    projectId: "storyhub-3307b",
    storageBucket: "storyhub-3307b.appspot.com",
    messagingSenderId: "260305056967",
    appId: "1:260305056967:web:164374cb0fb6eff95ffae2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();