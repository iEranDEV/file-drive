import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDf7lIdtg_C-oEj6wmwdq6ZZ7wD1t1h1To",
    authDomain: "file-drive-d02c8.firebaseapp.com",
    projectId: "file-drive-d02c8",
    storageBucket: "file-drive-d02c8.appspot.com",
    messagingSenderId: "519743232197",
    appId: "1:519743232197:web:2b094d9dd73f9f615538ac",
    measurementId: "G-P2LNQ2DET0"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);