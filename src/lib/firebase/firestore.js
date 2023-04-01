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

import { app } from './app';

export const firestore = getFirestore(app);

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
