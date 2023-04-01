import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocs as firebaseGetDocs,
  getDoc as firebaseGetDoc,
  addDoc as firebaseAddDoc,
  setDoc as firebaseSetDoc,
  deleteDoc as firebaseDeleteDoc,
  getFirestore,
  collectionGroup,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

// TODO: move variables in different files

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

export const getDocs = async path => {
  const ref = collection.apply(this, [firestore, ...path]);
  const docs = [];
  const snapshot = await firebaseGetDocs(ref);
  snapshot.forEach(doc => {
    docs.push({ ...doc.data(), id: doc.id });
  });
  return docs;
};

export const getDocsInCollectionGroup = async collectionId => {
  const ref = collectionGroup(firestore, collectionId);
  const docs = [];
  const snapshot = await firebaseGetDocs(ref);
  snapshot.forEach(doc => {
    docs.push({ ...doc.data(), id: doc.id });
  });
  return docs;
};

export const getDoc = async path => {
  const ref = doc.apply(this, [firestore, ...path]);
  const snapshot = await firebaseGetDoc(ref);
  if (snapshot.exists()) return snapshot.data();
  throw new Error('does-not-exist');
};

export const addDoc = async (path, newDoc) =>
  await firebaseAddDoc(collection.apply(this, [firestore, ...path]), newDoc);

export const setDoc = async (path, newDoc) =>
  await firebaseSetDoc(doc.apply(this, [firestore, ...path]), newDoc, { merge: true });

export const deleteDoc = async path =>
  await firebaseDeleteDoc(doc.apply(this, [firestore, ...path]));
