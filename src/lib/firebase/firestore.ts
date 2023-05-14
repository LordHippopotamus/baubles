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
  getCountFromServer,
  WithFieldValue,
  DocumentData,
  QueryConstraint,
} from 'firebase/firestore';

import { app } from './app';

type Path = [string, ...string[]];

export const firestore = getFirestore(app);

export const getDocs = async <T>(path: Path, options: QueryConstraint[] = []): Promise<T[]> => {
  const ref = query(collection(firestore, ...path), ...options);
  const docs: T[] = [];
  const snapshot = await firebaseGetDocs(ref);
  snapshot.forEach(doc => {
    docs.push({ ...doc.data(), id: doc.id } as T);
  });
  return docs;
};

export const getDoc = async <T>(path: Path): Promise<T> => {
  const ref = doc(firestore, ...path);
  const snapshot = await firebaseGetDoc(ref);
  if (snapshot.exists()) return snapshot.data() as T;
  throw new Error('does-not-exist');
};

export const getSnap = async (path: Path) => {
  const ref = doc(firestore, ...path);
  return await firebaseGetDoc(ref);
};

export const getDocsCount = async (path: Path) => {
  const snapshot = await getCountFromServer(collection(firestore, ...path));
  return snapshot.data().count;
};

export const addDoc = async <T>(path: Path, newDoc: T): Promise<T> =>
  (await firebaseAddDoc(
    collection(firestore, ...path),
    newDoc as WithFieldValue<DocumentData>
  )) as T;

export const setDoc = async <T>(path: Path, newDoc: T): Promise<T> =>
  (await firebaseSetDoc(doc(firestore, ...path), newDoc as WithFieldValue<DocumentData>, {
    merge: true,
  })) as T;

export const deleteDoc = async (path: Path) => await firebaseDeleteDoc(doc(firestore, ...path));
