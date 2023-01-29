import { create } from 'zustand';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
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
  changeDisplayName: async displayName => await updateProfile(auth.currentUser, { displayName }),
}));

onAuthStateChanged(auth, user => useUserStore.setState({ user }));

const db = getFirestore(app);

export const useBaublesStore = create(set => ({
  personalBaubles: undefined,
  createBauble: async name => {
    const user = useUserStore.getState().user.email;
    const ref = await addDoc(collection(db, 'users', user, 'baubles'), { name });
    const doc = await getDoc(ref);
    set(state => ({
      personalBaubles: state.personalBaubles.concat({ id: doc.id, ...doc.data() }),
    }));
  },
  fetchUserBaubles: user => {
    set({ personalBaubles: undefined });
    getDocs(collection(db, 'users', user.email, 'baubles')).then(snapshot => {
      snapshot.forEach(doc => {
        set(state => ({
          personalBaubles: [...(state.personalBaubles || []), { id: doc.id, ...doc.data() }],
        }));
      });
    });
  },
}));
