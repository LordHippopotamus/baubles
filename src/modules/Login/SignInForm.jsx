import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../firebase';

const SignInForm = () => {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const signIn = useUserStore(state => state.signIn);
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/');
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          setError('email', { message: 'User with with email was not found' });
          break;
        case 'auth/wrong-password':
          setError('password', { message: 'Wrong password' });
          break;
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('email')}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        label="Email Address"
        name="email"
        fullWidth
        margin="normal"
      />
      <TextField
        {...register('password')}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        label="Password"
        type="password"
        name="password"
        fullWidth
        margin="normal"
      />
      <LoadingButton
        variant="contained"
        loading={loading}
        type="submit"
        size="large"
        sx={{ mt: 2 }}
      >
        Sign In
      </LoadingButton>
    </form>
  );
};

export default SignInForm;
