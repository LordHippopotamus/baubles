import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { app } from './app';
import { useUserStore } from './user';

const db = getFirestore(app);

export const useBaubles = () => {
  const user = useUserStore(state => state.user);

  const createBauble = async name => {
    const ref = await addDoc(collection(db, 'users', user.uid, 'baubles'), { name });
    const snap = await getDoc(ref);
    if (snap.exists()) return { ...snap.data(), id: snap._key.path.segments.pop() };
  };

  const changeBaubleName = async (id, name) => {
    const ref = doc(db, 'users', user.uid, 'baubles', id);
    await updateDoc(ref, { name });
    const snap = await getDoc(ref);
    if (snap.exists()) return { ...snap.data(), id };
  };

  const deleteBauble = async id => {
    await deleteDoc(doc(db, 'users', user.uid, 'baubles', id));
    return id;
  };

  const getUserBaubles = async (user = user) => {
    const baublesRef = collection(db, 'users', user.uid, 'baubles');
    const userBaubles = [];
    const snapshot = await getDocs(baublesRef);
    snapshot.forEach(doc => {
      userBaubles.push({ ...doc.data(), id: doc.id });
    });
    return userBaubles;
  };

  return { createBauble, changeBaubleName, getUserBaubles, deleteBauble };
};
