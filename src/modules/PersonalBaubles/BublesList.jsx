import { Skeleton } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { useFirebaseStore, useUserStore } from '../firebase';

const BaublesList = () => {
  const db = useFirebaseStore(state => state.db);
  const user = useUserStore(state => state.user);

  const { isIdle, isLoading, data } = useQuery(
    ['baubles', { user: user?.uid }],
    async () => {
      const personalBaubles = [];
      const snapshot = await getDocs(collection(db, 'users', user.uid, 'baubles'));
      snapshot.forEach(doc => {
        personalBaubles.push({ id: doc.id, ...doc.data() });
      });
      return personalBaubles;
    },
    { enabled: !!user }
  );

  if (isLoading || isIdle)
    return [0, 1, 2, 3, 4].map(el => (
      <Skeleton sx={{ mt: 2 }} variant="rounded" height="8rem" key={el} />
    ));

  return data.map(bauble => bauble.name);
};

export default BaublesList;
