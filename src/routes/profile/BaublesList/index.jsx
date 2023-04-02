import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BaubleCard from './BaubleCard';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { Grid } from '@mui/material';

const BaublesList = () => {
  const baubles = useLoaderData();

  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);

  return (
    <>
      <Grid container spacing={2}>
        {baubles.map(bauble => (
          <Grid item xs={12} key={bauble.id}>
            <BaubleCard id={bauble.id} setEditModal={setEditModal} setDeleteModal={setDeleteModal}>
              {bauble.name}
            </BaubleCard>
          </Grid>
        ))}
      </Grid>
      <EditModal editModal={editModal} setEditModal={setEditModal} />
      <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
    </>
  );
};

export default BaublesList;
