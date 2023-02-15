import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useBaubles } from 'hooks';
import { useEffect } from 'react';

const EditModal = ({ editModal, setEditModal, user }) => {
  const { changeBaubleName } = useBaubles();

  const queryClient = useQueryClient();
  const mutation = useMutation(async name => await changeBaubleName(editModal.id, name), {
    onSuccess: result =>
      queryClient.setQueriesData(['baubles', { user: user.uid }], old =>
        old.map(el => (el.id === result.id ? result : el))
      ),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => setValue('name', editModal?.name), [editModal]);

  const handleClose = () => {
    reset();
    setEditModal(null);
  };
  const onSubmit = async ({ name }) => {
    await mutation.mutateAsync(name);
    handleClose();
  };

  return (
    <Dialog open={!!editModal} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Change bauble name</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter a new name of the bauble</DialogContentText>
          <TextField
            {...register('name', { required: true, minLength: 4, maxLength: 64 })}
            error={!!errors.name}
            helperText={
              (errors.name?.type === 'required' && 'This field is required') ||
              (errors.name?.type === 'minLength' && 'At least 4 characters') ||
              (errors.name?.type === 'maxLength' && 'Maximum of 128 characters')
            }
            autoFocus
            variant="standard"
            margin="dense"
            label="Name"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <LoadingButton loading={mutation.isLoading} type="submit">
            Change
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditModal;
