import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink, useFetcher } from 'react-router-dom';
import { routes } from 'utils/routes';
import { Form, EmailInput, PasswordInput, ErrorAlert, SubmitButton } from 'components/form';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const SignUpForm = () => {
  const fetcher = useFetcher();
  const {
    register,
    formState: { errors },
    watch,
    clearErrors,
    handleSubmit,
    setError,
  } = useForm();

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
          setError('alert', { message: 'Something went wrong!', description: fetcher.data });
          break;
      }
    }
  }, [fetcher.data, fetcher.state]);

  const onSubmit = ({ email, password, passwordRepeat }) => {
    if (password !== passwordRepeat)
      return setError('passwordRepeat', { message: "Passwords don't match" });
    fetcher.submit({ email, password }, { method: 'post', action: routes.signup });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Typography textAlign="center" variant="h4">
        Sign Up
      </Typography>
      <Box>
        <EmailInput register={register} errors={errors} />
        <PasswordInput register={register} errors={errors} />
        <PasswordInput
          register={register}
          errors={errors}
          name="passwordRepeat"
          label="Repeat Password"
        />
        <ErrorAlert errors={errors} watch={watch} clearErrors={clearErrors} />
      </Box>
      <Box>
        <Link component={RouterLink} to={routes.signup}>
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
