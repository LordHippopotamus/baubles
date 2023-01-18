import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../firebase';

const SignUpForm = () => {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const signUp = useUserStore(state => state.signUp);
  const navigate = useNavigate();

  const onSubmit = async ({ email, password, passwordRepeat }) => {
    setLoading(true);
    try {
      if (password !== passwordRepeat) {
        const error = new Error();
        error.code = 'mismatched-passwords';
        throw error;
      }
      await signUp(email, password);
      navigate('/');
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setError('email', { message: 'Invalide email address' });
          break;
        case 'auth/weak-password':
          setError('password', { message: 'Weak password (at least 6 characters)' });
          break;
        case 'auth/email-already-in-use':
          setError('email', { message: 'Email is already in use' });
          break;
        case 'mismatched-passwords':
          setError('passwordRepeat', { message: "Passwords don't match" });
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
      <TextField
        {...register('passwordRepeat')}
        error={Boolean(errors.passwordRepeat)}
        helperText={errors.passwordRepeat?.message}
        label="Repeat Password"
        type="password"
        name="passwordRepeat"
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
        Sign Up
      </LoadingButton>
    </form>
  );
};

export default SignUpForm;
