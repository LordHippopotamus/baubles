import { useEffect } from 'react';
import { Skeleton } from '@mui/material';
import { useBaublesStore } from 'modules/firebase';
import { useUserStore } from 'modules/firebase';

const BaublesList = () => {
  const personalBaubles = useBaublesStore(state => state.personalBaubles);
  const fetchUserBaubles = useBaublesStore(state => state.fetchUserBaubles);
  const user = useUserStore(state => state.user);

  useEffect(() => user && fetchUserBaubles(user), [user]);

  return (
    <>
      {personalBaubles
        ? personalBaubles.map(bauble => bauble.name)
        : [0, 1, 2, 3, 4].map(el => (
            <Skeleton sx={{ mt: 2 }} variant="rounded" height="8rem" key={el} />
          ))}
    </>
  );
};

export default BaublesList;
