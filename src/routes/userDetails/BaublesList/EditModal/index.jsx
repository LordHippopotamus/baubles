import { Dialog } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';
import { routes } from 'utils/routes';
import EditForm from './EditForm';

const EditModal = ({ editModal, setEditModal }) => {
  const fetcher = useFetcher();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const watchName = watch('name');

  const handleClose = () => {
    if (fetcher.state === 'idle') {
      setEditModal(false);
    }
  };
  useEffect(() => {
    setValue('name', editModal?.name);
  }, [editModal]);

  const onSubmit = async ({ name }) => {
    fetcher.submit(
      { name, baubleId: editModal?.id },
      { method: 'patch', action: `/users/${user.uid}` }
    );
  };

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      fetcher.data = undefined;
      handleClose();
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <Dialog open={!!editModal} onClose={handleClose}>
      <EditForm
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
        fetcher={fetcher}
        handleClose={handleClose}
        editModal={editModal}
        setValue={setValue}
        isButtonDisabled={watchName === editModal?.name}
      />
    </Dialog>
  );
};

export default EditModal;
