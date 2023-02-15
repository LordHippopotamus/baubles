import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'hooks';
import { EmailInput, ErrorAlert, PasswordInput, SubmitButton } from './Inputs';

const SignInForm = () => {
  const {
    register,
    watch,
    formState: { errors },
    setError,
    clearErrors,
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
        case 'auth/invalid-email':
          setError('email', { message: 'Invalide email address' });
          break;
        case 'auth/user-not-found':
          setError('email', { message: 'User with with email was not found' });
          break;
        case 'auth/wrong-password':
          setError('password', { message: 'Wrong password' });
          break;
        default:
          setError('alert', { message: 'Something went wrong! Maybe password is empty?' });
          break;
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <ErrorAlert errors={errors} watch={watch} clearErrors={clearErrors} />
      <SubmitButton errors={errors} loading={loading}>
        Sign In
      </SubmitButton>
    </form>
  );
};

export default SignInForm;
