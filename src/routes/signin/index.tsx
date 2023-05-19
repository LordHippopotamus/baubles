import { Container, Paper } from '@mui/material';
import SignInForm from './SignInForm';
import { FC } from 'react';

const SignIn: FC = () => (
  <Container
    sx={{
      minHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 8,
    }}
  >
    <Paper elevation={1}>
      <SignInForm />
    </Paper>
  </Container>
);

export default SignIn;
