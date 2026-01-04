
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlhprMkunfcNoGI1_q-FN3YCvMPG8LiMU",
  authDomain: "site-manager-30486.firebaseapp.com",
  projectId: "site-manager-30486",
  storageBucket: "site-manager-30486.firebasestorage.app",
  messagingSenderId: "136534160730",
  appId: "1:136534160730:web:d9d6d0937b11de4dedef63",
  measurementId: "G-EDNGFGBQJS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const registerWithEmail = async (email: string, pass: string, name: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, pass);
  await updateProfile(result.user, { displayName: name });
  return result.user;
};

export const loginWithEmail = async (email: string, pass: string) => {
  const result = await signInWithEmailAndPassword(auth, email, pass);
  return result.user;
};

export const logout = () => signOut(auth);

export { onAuthStateChanged };
export type { User };
