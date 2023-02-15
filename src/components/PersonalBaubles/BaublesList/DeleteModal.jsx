import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useBaubles } from 'hooks';

const DeleteModal = ({ deleteModal, setDeleteModal, user }) => {
  const { deleteBauble } = useBaubles();

  const queryClient = useQueryClient();
  const mutation = useMutation(
    ['baubles', { user: user.uid }],
    async id => {
      return await deleteBauble(id);
    },
    {
      onSuccess: id => {
        queryClient.setQueryData(['baubles', { user: user.uid }], old =>
          old.filter(el => el.id !== id)
        );
      },
    }
  );

  const { register, watch, handleSubmit, reset } = useForm({ defaultValues: { name: '' } });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const subscription = watch(({ name }) =>
      setDisabled(name.toLowerCase() !== deleteModal?.name.toLowerCase())
    );
    return subscription.unsubscribe;
  }, [watch, deleteModal]);

  const handleClose = () => {
    reset();
    setDeleteModal(null);
  };
  const onSubmit = async () => {
    await mutation.mutateAsync(deleteModal.id);
    handleClose();
  };

  return (
    <Dialog open={!!deleteModal} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Delete Modal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type{' '}
            <Typography color="error" component="span">
              {deleteModal?.name.toLowerCase()}
            </Typography>{' '}
            to confirm
          </DialogContentText>
          <TextField
            {...register('name')}
            autoFocus
            variant="standard"
            margin="dense"
            label="Name"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <LoadingButton
            disabled={disabled}
            loading={mutation.isLoading}
            color="error"
            type="submit"
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DeleteModal;
