import { useState } from 'react';
import BaubleCard from './BaubleCard';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { Grid, Skeleton } from '@mui/material';
import { Bauble, UserDetails } from 'types';
import { FC } from 'react';
import { useInfiniteQuery } from 'hooks/infiniteQuery';
import { limit, orderBy } from 'firebase/firestore';
import { LoadingButton } from '@mui/lab';
import NoMoreResultsAlert from 'components/NoMoreResultsAlert';

type Props = {
  initialBaubles: Bauble[];
  isOwner: boolean;
  ownerId: UserDetails['uid'];
};

export type Modal = {
  id: Bauble['id'];
  name: Bauble['name'];
};

const BaublesList: FC<Props> = ({ initialBaubles, isOwner }) => {
  const {
    loading,
    hasMore,
    data: baubles,
    fetchData,
  } = useInfiniteQuery<Bauble>(
    { path: ['baubles'], options: [orderBy('createdAt', 'desc'), limit(10)] },
    initialBaubles
  );

  const [editModal, setEditModal] = useState<null | Modal>(null);
  const [deleteModal, setDeleteModal] = useState<null | Modal>(null);

  return (
    <>
      <Grid container spacing={2}>
        {baubles.map(bauble => (
          <Grid item xs={12} key={bauble.id}>
            <BaubleCard
              bauble={bauble}
              isOwner={isOwner}
              openEditModal={() => setEditModal({ id: bauble.id, name: bauble.name })}
              openDeleteModal={() => setDeleteModal({ id: bauble.id, name: bauble.name })}
            />
          </Grid>
        ))}
        {loading &&
          [...Array(10).keys()].map(el => (
            <Grid item xs={12} key={el}>
              <Skeleton variant="rounded" height={80} />
            </Grid>
          ))}
      </Grid>
      {hasMore ? (
        <LoadingButton
          sx={{ width: '100%', height: 80 }}
          size="large"
          loading={loading}
          onClick={fetchData}
        >
          Load More
        </LoadingButton>
      ) : (
        <NoMoreResultsAlert showLink={false} />
      )}
      <EditModal editModal={editModal} onClose={() => setEditModal(null)} />
      <DeleteModal deleteModal={deleteModal} onClose={() => setDeleteModal(null)} />
    </>
  );
};

export default BaublesList;
