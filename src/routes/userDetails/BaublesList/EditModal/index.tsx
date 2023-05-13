import { Dialog } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FC, useEffect } from 'react';
import { useFetcher } from 'react-router-dom';
import EditForm from './EditForm';
import { Modal } from '..';
import { useUser } from 'hooks/user';

type Props = {
  editModal: Modal | null;
  onClose: () => void;
};

export type FormValues = {
  name: string;
};

const EditModal: FC<Props> = ({ editModal, onClose }) => {
  const user = useUser();
  const fetcher = useFetcher();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const watchName = watch('name');

  useEffect(() => {
    editModal && setValue('name', editModal.name);
  }, [editModal]);

  const onSubmit: SubmitHandler<FormValues> = async ({ name }) => {
    editModal &&
      fetcher.submit(
        { name, baubleId: editModal.id },
        { method: 'patch', action: `/users/${user.uid}` }
      );
  };

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      fetcher.data = undefined;
      onClose();
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <Dialog open={!!editModal} onClose={onClose}>
      <EditForm
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        errors={errors}
        fetcher={fetcher}
        onClose={onClose}
        isButtonDisabled={watchName === editModal?.name}
      />
    </Dialog>
  );
};

export default EditModal;
