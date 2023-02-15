import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'hooks';
import { EmailInput, ErrorAlert, PasswordInput, SubmitButton } from './Inputs';

const SignUpForm = () => {
  const {
    register,
    watch,
    formState: { errors },
    setError,
    clearErrors,
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
      <PasswordInput
        register={register}
        errors={errors}
        name="passwordRepeat"
        label="Repeat Password"
      />
      <ErrorAlert errors={errors} watch={watch} clearErrors={clearErrors} />
      <SubmitButton errors={errors} loading={loading}>
        Sign Up
      </SubmitButton>
    </form>
  );
};

export default SignUpForm;
