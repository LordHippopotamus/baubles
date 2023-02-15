import { AccountCircle } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';

const EmailInput = ({ register, errors, name = 'email', label = 'Email Address' }) => (
  <TextField
    {...register(name)}
    error={Boolean(errors[name])}
    helperText={errors[name]?.message}
    label={label}
    name={name}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <AccountCircle />
        </InputAdornment>
      ),
    }}
    fullWidth
    margin="normal"
  />
);

export default EmailInput;
