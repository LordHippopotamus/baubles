import { LoadingButton } from '@mui/lab';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

const EditForm = ({ register, handleSubmit, errors, fetcher, handleClose, isButtonDisabled }) => (
  <form onSubmit={handleSubmit}>
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
      <LoadingButton disabled={isButtonDisabled} loading={fetcher.state !== 'idle'} type="submit">
        Change
      </LoadingButton>
    </DialogActions>
  </form>
);

export default EditForm;
