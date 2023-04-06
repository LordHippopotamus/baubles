import { LoadingButton } from '@mui/lab';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

const Form = ({ onSubmit, onClose, register, errors, isLoading }) => (
  <form onSubmit={onSubmit}>
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
      <Button disabled={isLoading} onClick={onClose}>
        Close
      </Button>
      <LoadingButton loading={isLoading} disabled={!!Object.keys(errors).length} type="submit">
        Create
      </LoadingButton>
    </DialogActions>
  </form>
);

export default Form;
