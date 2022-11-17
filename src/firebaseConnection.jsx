import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

//config colocar
const firebaseConfig = {
  apiKey: "AIzaSyBVLx9xpOqPIWs-lEjMpIutesKSNcP1crU",
  authDomain: "aula2610-ab5d1.firebaseapp.com",
  projectId: "aula2610-ab5d1",
  storageBucket: "aula2610-ab5d1.appspot.com",
  messagingSenderId: "509993266900",
  appId: "1:509993266900:web:43702a67c91dd8d87f1541"
};

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  export {db, auth};
