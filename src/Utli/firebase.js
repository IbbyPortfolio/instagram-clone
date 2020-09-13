import firebase from "firebase";

const firebaseConfig = {
   apiKey: "AIzaSyCZ3uqa2-tvpB6KYoVYPxsvbFZ8Um_VSdc",
   authDomain: "instagram-clone-65642.firebaseapp.com",
   databaseURL: "https://instagram-clone-65642.firebaseio.com",
   projectId: "instagram-clone-65642",
   storageBucket: "instagram-clone-65642.appspot.com",
   messagingSenderId: "703954059722",
   appId: "1:703954059722:web:9a7ca0323dfd2b718dcf33",
   measurementId: "G-3B669B6DFE",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
