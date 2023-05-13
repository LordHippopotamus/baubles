import { AccountCircle } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import { FieldValues, FormState, Path, UseFormRegister } from 'react-hook-form';

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FormState<T>['errors'];
  name: Path<T>;
  label?: string;
};

const EmailInput = <T extends FieldValues>({
  register,
  errors,
  name,
  label = 'Email',
}: Props<T>): JSX.Element => (
  <TextField
    {...register(name)}
    error={!!errors[name]}
    helperText={errors[name]?.message as string}
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
