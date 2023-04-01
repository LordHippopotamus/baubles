import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { app } from './app';

export const auth = getAuth(app);

export const getValidatedUser = () =>
  new Promise(resolve => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe();
      resolve(user);
    });
  });

export const signOut = async () => await firebaseSignOut(auth);
export const signIn = async (email, password) =>
  await signInWithEmailAndPassword(auth, email, password);
export const signUp = async (email, password) =>
  await createUserWithEmailAndPassword(auth, email, password);
