import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const base = firebase.initializeApp({
    apiKey: "AIzaSyC17Bq2uRElftMfYFO6N49yl27AnIwfGTM",
    authDomain: "phone-book-app-9bb83.firebaseapp.com",
    projectId: "phone-book-app-9bb83",
    storageBucket: "phone-book-app-9bb83.appspot.com",
    messagingSenderId: "578806845196",
    appId: "1:578806845196:web:7446b71a3d4ee148544329"
  }
);

export default base;