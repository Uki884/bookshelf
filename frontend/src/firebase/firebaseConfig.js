import firebase from "firebase"
import 'firebase/firestore'
import "firebase/auth"

// var firebaseui = require("firebaseui-ja");
// require("firebaseui-ja/dist/firebaseui.css");

const firebaseConfig = {
  apiKey: "AIzaSyDQNSp-yThCVmq_NACV4WDQwijkLUqNQoU",
  authDomain: "bookshelf-b21b7.firebaseapp.com",
  databaseURL: "https://bookshelf-b21b7.firebaseio.com",
  projectId: "bookshelf-b21b7",
  storageBucket: "bookshelf-b21b7.appspot.com",
  messagingSenderId: "839352305879",
  appId: "1:839352305879:web:7c9ab868820307e4e9c892",
  measurementId: "G-VPM7VQ6J9G"
}

firebase.initializeApp(firebaseConfig)

export default firebase