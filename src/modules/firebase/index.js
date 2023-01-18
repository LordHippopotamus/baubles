import { create } from 'zustand';
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const useUserStore = create(() => ({
  user: undefined,
  signIn: async (email, password) => await signInWithEmailAndPassword(auth, email, password),
  signUp: async (email, password) => await createUserWithEmailAndPassword(auth, email, password),
  signOut: async () => await signOut(auth),
}));

onAuthStateChanged(auth, user => useUserStore.setState({ user }));
