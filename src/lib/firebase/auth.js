import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile as firebaseUpdateProfile,
} from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { app } from './app';

export const auth = getAuth(app);
const firestore = getFirestore(app);

export const getValidatedUser = () =>
  new Promise(resolve => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe();
      resolve(user);
    });
  });

export const saveUserInFirestore = (firestore, user) => {
  setDoc(doc(firestore, 'users', user.uid), {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  });
};

export const signOut = async () => await firebaseSignOut(auth);
export const signIn = async (email, password) =>
  await signInWithEmailAndPassword(auth, email, password);
export const signUp = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
  await saveUserInFirestore(firestore, auth.currentUserr);
};

export const updateProfile = async profile => {
  await firebaseUpdateProfile(auth.currentUser, profile);
  await saveUserInFirestore(firestore, auth.currentUserr);
};
