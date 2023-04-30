import { Dialog } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFetcher, useLocation } from 'react-router-dom';
import { useUser } from 'hooks/user';
import Form from './Form';
import ToggleButton from './ToggleButton';

const CreateBaubleDialog = () => {
  const user = useUser();
  const fetcher = useFetcher();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: 'A Great Thing',
      columns: 12,
      rows: 60,
    },
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (fetcher.state === 'idle') {
      reset();
      setOpen(false);
    }
  };

  useEffect(() => {
    location.state?.createNewBauble && handleOpen();
  }, [location.state]);

  useEffect(() => {
    fetcher.state === 'idle' && fetcher.data && handleClose();
  }, [fetcher.state]);

  const handleCreate = async ({ name, columns, rows }) => {
    fetcher.submit({ name, columns, rows }, { method: 'post', action: `/users/${user.uid}` });
  };

  return (
    <>
      <ToggleButton onClick={handleOpen} />
      <Dialog open={open} onClose={handleClose}>
        <Form
          onSubmit={handleSubmit(handleCreate)}
          onClose={handleClose}
          register={register}
          errors={errors}
          isLoading={fetcher.state !== 'idle'}
        />
      </Dialog>
    </>
  );
};

export default CreateBaubleDialog;
