import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BaubleCard from './BaubleCard';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const BaublesList = () => {
  const baubles = useLoaderData();

  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);

  return (
    <>
      {baubles.map(bauble => (
        <BaubleCard
          id={bauble.id}
          owner={bauble.owner}
          setEditModal={setEditModal}
          setDeleteModal={setDeleteModal}
          key={bauble.id}
        >
          {bauble.name}
        </BaubleCard>
      ))}
      <EditModal editModal={editModal} setEditModal={setEditModal} />
      <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
    </>
  );
};

export default BaublesList;
