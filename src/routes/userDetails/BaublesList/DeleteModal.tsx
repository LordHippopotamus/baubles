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
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFetcher } from 'react-router-dom';
import { useUser } from 'hooks/user';
import { Modal } from '.';

type Props = {
  deleteModal: Modal | null;
  onClose: () => void;
};

type FormValues = {
  name: string;
};

const DeleteModal: FC<Props> = ({ deleteModal, onClose }) => {
  const fetcher = useFetcher();
  const user = useUser();

  const { register, watch, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { name: '' },
  });
  const watchName = watch('name');

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    fetcher.state === 'idle' && fetcher.data && handleClose();
  }, [fetcher.state, fetcher.data]);

  const onSubmit: SubmitHandler<FormValues> = async () => {
    deleteModal &&
      fetcher.submit({ id: deleteModal.id }, { method: 'delete', action: `/users/${user.uid}` });
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
          <Button disabled={fetcher.state !== 'idle'} onClick={handleClose}>
            Close
          </Button>
          <LoadingButton
            disabled={watchName.toLowerCase() !== deleteModal?.name.toLowerCase()}
            loading={fetcher.state !== 'idle'}
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
