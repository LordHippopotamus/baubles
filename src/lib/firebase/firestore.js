import {
  collection,
  doc,
  getDocs as firebaseGetDocs,
  getDoc as firebaseGetDoc,
  addDoc as firebaseAddDoc,
  setDoc as firebaseSetDoc,
  deleteDoc as firebaseDeleteDoc,
  getFirestore,
  query,
} from 'firebase/firestore';

import { app } from './app';

export const firestore = getFirestore(app);

export const getDocs = async (path, options = []) => {
  const ref = query(collection(firestore, ...path), ...options);
  const docs = [];
  const snapshot = await firebaseGetDocs(ref);
  snapshot.forEach(doc => {
    docs.push({ ...doc.data(), id: doc.id });
  });
  return docs;
};

export const getDoc = async (path, options = []) => {
  const ref = query(doc(firestore, ...path), ...options);
  const snapshot = await firebaseGetDoc(ref);
  if (snapshot.exists()) return snapshot.data();
  throw new Error('does-not-exist');
};

export const addDoc = async (path, newDoc) =>
  await firebaseAddDoc(collection(firestore, ...path), newDoc);

export const setDoc = async (path, newDoc) =>
  await firebaseSetDoc(doc(firestore, ...path), newDoc, { merge: true });

export const deleteDoc = async path => await firebaseDeleteDoc(doc(firestore, ...path));
