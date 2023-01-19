import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';

const PasswordInput = ({ register, errors, name = 'password', label = 'Password' }) => {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      {...register(name)}
      error={Boolean(errors[name])}
      helperText={errors[name]?.message}
      type={visible ? 'text' : 'password'}
      label={label}
      name={name}
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
      fullWidth
      margin="normal"
    />
  );
};

export default PasswordInput;
