import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { create } from 'zustand';
import { app } from './app';

const auth = getAuth(app);

export const useUserStore = create(() => ({
  user: undefined,
  signIn: async (email, password) => await signInWithEmailAndPassword(auth, email, password),
  signUp: async (email, password) => await createUserWithEmailAndPassword(auth, email, password),
  signOut: async () => await signOut(auth),
  changeDisplayName: async displayName => await updateProfile(auth.currentUser, { displayName }),
}));

onAuthStateChanged(auth, user => useUserStore.setState({ user }));
