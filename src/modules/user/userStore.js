import { create } from 'zustand';
import { useFirebaseStore } from '../firebase';

export const useUserStore = create(set => ({
  user: useFirebaseStore.getState().auth.currentUser,
  changeUser: user => set(() => ({ user })),
}));
