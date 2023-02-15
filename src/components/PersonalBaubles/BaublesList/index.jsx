import { Skeleton } from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useUserStore, useBaubles } from 'hooks';
import BaubleCard from './BaubleCard';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const BaublesList = () => {
  const { getUserBaubles } = useBaubles();
  const user = useUserStore(state => state.user);

  const { isIdle, isLoading, data } = useQuery(
    ['baubles', { user: user?.uid }],
    async () => await getUserBaubles(user),
    { enabled: !!user }
  );

  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);

  if (isLoading || isIdle)
    return [0, 1, 2, 3, 4].map(el => (
      <Skeleton sx={{ mt: 2 }} variant="rounded" height="8rem" key={el} />
    ));

  return (
    <>
      {data.map(bauble => (
        <BaubleCard
          id={bauble.id}
          setEditModal={setEditModal}
          setDeleteModal={setDeleteModal}
          key={bauble.id}
        >
          {bauble.name}
        </BaubleCard>
      ))}
      <EditModal editModal={editModal} setEditModal={setEditModal} user={user} />
      <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} user={user} />
    </>
  );
};

export default BaublesList;
