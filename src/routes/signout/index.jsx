import { signOut } from 'lib/firebase';

export const action = async () => {
  await signOut();
  return null;
};
