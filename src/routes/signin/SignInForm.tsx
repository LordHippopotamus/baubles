import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink, useFetcher } from 'react-router-dom';
import { routes } from 'utils/routes';
import { Form, EmailInput, PasswordInput, ErrorAlert, SubmitButton } from 'components/form';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
  alert: null;
};

const SignInForm = () => {
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
        case 'auth/too-many-requests':
          setError('alert', {
            message:
              'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.',
          });
          break;
        case 'auth/user-not-found':
          setError('email', { message: 'User with this email was not found' });
          break;
        case 'auth/wrong-password':
          setError('password', { message: 'Wrong password' });
          break;
        default:
          setError('alert', { message: fetcher.data });
          break;
      }
    }
  }, [fetcher.data, fetcher.state]);

  const onSubmit: SubmitHandler<FormValues> = ({ email, password }) => {
    fetcher.submit({ email, password, action: 'signIn' }, { method: 'post', action: routes.home });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Typography textAlign="center" variant="h4">
        Sign In
      </Typography>
      <Box>
        <EmailInput<FormValues> name="email" register={register} errors={errors} />
        <PasswordInput<FormValues> name="password" register={register} errors={errors} />
        <ErrorAlert name="alert" errors={errors} watch={watch} clearErrors={clearErrors} />
      </Box>
      <Box>
        <Link component={RouterLink} to={routes.signup}>
          Don&apos;t have an account yet?
        </Link>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <SubmitButton error={!!Object.keys(errors).length} loading={fetcher.state !== 'idle'}>
          Sign In
        </SubmitButton>
      </Box>
    </Form>
  );
};

export default SignInForm;
