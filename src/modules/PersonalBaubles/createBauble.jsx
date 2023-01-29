import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useBaublesStore, useUserStore } from 'modules/firebase';
import { LoadingButton } from '@mui/lab';

const CreateBauble = () => {
  const user = useUserStore(state => state.user);
  const createBauble = useBaublesStore(state => state.createBauble);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: 'A Great Thing',
    },
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const handleCreate = async ({ name }) => {
    setLoading(true);
    await createBauble(name);
    setLoading(false);
    handleClose();
  };

  return (
    <>
      <Button
        disabled={user === undefined}
        onClick={handleOpen}
        variant="outlined"
        sx={{ width: 1, mt: 4, height: '8rem' }}
      >
        <Add />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(handleCreate)}>
          <DialogTitle>Create new bauble</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter a name of new bauble</DialogContentText>
            <TextField
              {...register('name', { required: true, minLength: 4, maxLength: 64 })}
              error={Boolean(errors.name)}
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
            <LoadingButton loading={loading} type="submit">
              Create
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CreateBauble;
