import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile as firebaseUpdateProfile,
  User,
} from 'firebase/auth';
import { getFirestore, setDoc, doc, Firestore } from 'firebase/firestore';
import { app } from './app';
import { UserDetails } from 'types';

export const auth = getAuth(app);
const firestore = getFirestore(app);

export const getValidatedUser = (): Promise<User | null> =>
  new Promise(resolve => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe();
      resolve(user);
    });
  });

export const saveUserInFirestore = async (firestore: Firestore, user: User) =>
  await setDoc(doc(firestore, 'users', user.uid), {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  });

export const signOut = async () => await firebaseSignOut(auth);
export const signIn = async (email: string, password: string) =>
  await signInWithEmailAndPassword(auth, email, password);
export const signUp = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password);
  await saveUserInFirestore(firestore, auth.currentUser as User);
};

export const updateProfile = async (profile: UserDetails) => {
  await firebaseUpdateProfile(auth.currentUser as User, profile);
  await saveUserInFirestore(firestore, auth.currentUser as User);
};
