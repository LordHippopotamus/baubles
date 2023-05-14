import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { FieldValues, FormState, Path, UseFormRegister } from 'react-hook-form';

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FormState<T>['errors'];
  name: Path<T>;
  label?: string;
};

const PasswordInput = <T extends FieldValues>({
  register,
  errors,
  name,
  label = 'Password',
}: Props<T>): JSX.Element => {
  const [visible, setVisible] = useState(false);
  return (
    <TextField
      {...register(name)}
      error={!!errors[name]}
      helperText={errors[name]?.message as string}
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
