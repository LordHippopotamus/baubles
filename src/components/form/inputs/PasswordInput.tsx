import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';

const PasswordInput = ({ register, errors, name = 'password', label = 'Password' }) => {
  const [visible, setVisible] = useState(false);
  return (
    <TextField
      {...register(name)}
      error={!!errors[name]}
      helperText={errors[name]?.message}
      name={name}
      label={label}
      fullWidth
      margin="normal"
      type={visible ? 'text' : 'password'}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Lock />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setVisible(!visible)} edge="end">
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
