import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useFirebaseStore } from '../firebase';
import { useUserStore } from './userStore';

const UserObserver = () => {
  const auth = useFirebaseStore(state => state.auth);
  const changeUser = useUserStore(state => state.changeUser);

  useEffect(() => {
    onAuthStateChanged(auth, user => changeUser(user));
  }, []);

  return null;
};

export default UserObserver;
