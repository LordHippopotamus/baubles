import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink, useFetcher } from 'react-router-dom';
import { routes } from 'utils/routes';
import { Form, EmailInput, PasswordInput, ErrorAlert, SubmitButton } from 'components/form';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
  passwordRepeat: string;
  alert: null;
};

const SignUpForm = () => {
  const fetcher = useFetcher();
  const {
    register,
    formState: { errors },
    watch,
    clearErrors,
    handleSubmit,
    setError,
  } = useForm<FormValues>();

  useEffect(() => {
    if (fetcher.data && fetcher.state === 'idle') {
      switch (fetcher.data) {
        case 'auth/invalid-email':
          setError('email', { message: 'Invalide email address' });
          break;
        case 'auth/weak-password':
          setError('password', { message: 'Weak password (at least 6 characters)' });
          break;
        case 'auth/email-already-in-use':
          setError('email', { message: 'Email is already in use' });
          break;
        default:
          setError('alert', { message: fetcher.data });
          break;
      }
    }
  }, [fetcher.data, fetcher.state]);

  const onSubmit: SubmitHandler<FormValues> = ({ email, password, passwordRepeat }) => {
    if (password !== passwordRepeat)
      return setError('passwordRepeat', { message: "Passwords don't match" });
    fetcher.submit({ email, password, action: 'signUp' }, { method: 'post', action: routes.home });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Typography textAlign="center" variant="h4">
        Sign Up
      </Typography>
      <Box>
        <EmailInput<FormValues> name="email" register={register} errors={errors} />
        <PasswordInput<FormValues> name="password" register={register} errors={errors} />
        <PasswordInput<FormValues>
          name="passwordRepeat"
          register={register}
          errors={errors}
          label="Repeat Password"
        />
        <ErrorAlert<FormValues>
          name="alert"
          errors={errors}
          watch={watch}
          clearErrors={clearErrors}
        />
      </Box>
      <Box>
        <Link component={RouterLink} to={routes.signin}>
          Already have an account?
        </Link>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <SubmitButton error={!!Object.keys(errors).length} loading={fetcher.state !== 'idle'}>
          Sign Up
        </SubmitButton>
      </Box>
    </Form>
  );
};

export default SignUpForm;
