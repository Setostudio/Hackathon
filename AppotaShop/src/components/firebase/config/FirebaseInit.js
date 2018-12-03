import firebase from "@firebase/app";
import "@firebase/database";
import "@firebase/auth";
var config = {
  apiKey: "AIzaSyAHWwDh9Yz7XTiLUNevEoILz9jZ-Jkpq20",
  authDomain: "shoppota-9b116.firebaseapp.com",
  databaseURL: "https://shoppota-9b116.firebaseio.com",
  projectId: "shoppota-9b116",
  storageBucket: "shoppota-9b116.appspot.com",
  messagingSenderId: "867298712959"
};
export default (firebaseApp = firebase.initializeApp(config));
