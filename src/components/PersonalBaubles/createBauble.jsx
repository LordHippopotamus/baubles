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
import { LoadingButton } from '@mui/lab';
import { useMutation, useQueryClient } from 'react-query';
import { useBaubles, useUserStore } from 'hooks';

const CreateBauble = () => {
  const user = useUserStore(state => state.user);
  const { createBauble } = useBaubles();

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async ({ name, columns, rows }) => await createBauble(name, columns, rows),
    {
      onSuccess: result => {
        queryClient.setQueriesData(['baubles', { user: user.uid }], old => old.concat(result));
      },
    }
  );

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
    reset();
    setOpen(false);
  };

  const handleCreate = async ({ name, columns, rows }) => {
    await mutation.mutateAsync({ name, columns, rows });
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
          <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
            <DialogContentText>Enter a name of new bauble</DialogContentText>
            <TextField
              {...register('name', { required: true, minLength: 4, maxLength: 64 })}
              error={!!errors.name}
              helperText={
                (errors.name?.type === 'required' && 'This field is required') ||
                (errors.name?.type === 'minLength' && 'At least 4 characters') ||
                (errors.name?.type === 'maxLength' && 'Maximum of 128 characters')
              }
              autoFocus
              margin="normal"
              label="Name"
            />
            <DialogContentText sx={{ mt: 2 }}>
              Enter amount of columns and rows for new bauble
            </DialogContentText>
            <TextField
              {...register('columns', { required: true, min: 4, max: 256 })}
              error={!!errors.columns}
              helperText={
                (errors.name?.type === 'required' && 'This field is required') ||
                (errors.name?.type === 'min' && `Value can&apos;t be less than 4`) ||
                (errors.name?.type === 'min' && `Value can&apos;t be more than 256`)
              }
              margin="normal"
              label="Columns"
            />
            <TextField
              {...register('rows', { required: true, min: 4, max: 256 })}
              error={!!errors.rows}
              helperText={
                (errors.name?.type === 'required' && 'This field is required') ||
                (errors.name?.type === 'min' && `Value can&apos;t be less than 4`) ||
                (errors.name?.type === 'min' && `Value can&apos;t be more than 256`)
              }
              margin="normal"
              label="Rows"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <LoadingButton loading={mutation.isLoading} type="submit">
              Create
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CreateBauble;
