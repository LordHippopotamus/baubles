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
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { useFetcher } from 'react-router-dom';
import { useUser } from 'hooks/user';
import { routes } from 'utils/routes';

const CreateBaubleDialog = () => {
  const user = useUser();
  const fetcher = useFetcher();

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
    fetcher.state === 'idle' && fetcher.data && handleClose();
  }, [fetcher.state]);

  const handleCreate = async ({ name, columns, rows }) => {
    fetcher.submit({ name, columns, rows }, { method: 'post', action: routes.profile });
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
                (errors.columns?.type === 'required' && 'This field is required') ||
                (errors.columns?.type === 'min' && `Value can't be less than 4`) ||
                (errors.columns?.type === 'max' && `Value can't be more than 256`)
              }
              margin="normal"
              label="Columns"
            />
            <TextField
              {...register('rows', { required: true, min: 4, max: 256 })}
              error={!!errors.rows}
              helperText={
                (errors.rows?.type === 'required' && 'This field is required') ||
                (errors.rows?.type === 'min' && `Value can't be less than 4`) ||
                (errors.rows?.type === 'max' && `Value can't be more than 256`)
              }
              margin="normal"
              label="Rows"
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={fetcher.state !== 'idle'} onClick={handleClose}>
              Close
            </Button>
            <LoadingButton
              loading={fetcher.state !== 'idle'}
              disabled={!!Object.keys(errors).length}
              type="submit"
            >
              Create
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CreateBaubleDialog;
