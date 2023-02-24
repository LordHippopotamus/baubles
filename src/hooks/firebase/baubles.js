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

const generateArea = (columns, rows) => {
  const area = [];

  for (let x = 1; x <= columns; x++) {
    for (let y = 1; y <= rows; y++) {
      area.push({ x, y, color: null });
    }
  }

  return area;
};

export const useBaubles = () => {
  const user = useUserStore(state => state.user);

  const createBauble = async (name, columns, rows) => {
    const ref = await addDoc(collection(db, 'users', user.uid, 'baubles'), {
      name,
      area: generateArea(columns, rows),
    });
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

  const getBauble = async (uid, id) => {
    const baubleRef = doc(db, 'users', uid, 'baubles', id);
    const baubleSnap = await getDoc(baubleRef);
    if (baubleSnap.exists()) return baubleSnap.data();
  };

  return { createBauble, changeBaubleName, getUserBaubles, getBauble, deleteBauble };
};
