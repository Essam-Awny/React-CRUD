import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSy....",
    authDomain: "react-crud-ff987.firebaseapp.com",
    projectId: "react-crud-ff987",
    storageBucket: "react-crud-ff987.appspot.com",
    messagingSenderId: "683072703182",
    appId: "1:683072703182:web:xxxxx"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth=getAuth(app)
export { db,auth,createUserWithEmailAndPassword };
