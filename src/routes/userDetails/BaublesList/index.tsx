import { useState } from 'react';
import BaubleCard from './BaubleCard';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { Grid } from '@mui/material';
import { Bauble } from 'types';
import { FC } from 'react';

type Props = {
  baubles: Bauble[];
  isOwner: boolean;
};

export type Modal = {
  id: Bauble['id'];
  name: Bauble['name'];
};

const BaublesList: FC<Props> = ({ baubles, isOwner }) => {
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
      </Grid>
      <EditModal editModal={editModal} onClose={() => setEditModal(null)} />
      <DeleteModal deleteModal={deleteModal} onClose={() => setDeleteModal(null)} />
    </>
  );
};

export default BaublesList;
