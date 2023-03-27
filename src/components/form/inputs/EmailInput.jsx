import { AccountCircle } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';

const EmailInput = ({ register, errors, name = 'email', label = 'Email' }) => (
  <TextField
    {...register(name)}
    error={!!errors[name]}
    helperText={errors[name]?.message}
    name={name}
    label={label}
    fullWidth
    margin="normal"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <AccountCircle />
        </InputAdornment>
      ),
    }}
  />
);

export default EmailInput;
