import { Container, Paper } from '@mui/material';
import SignUpForm from './SignUpForm';
import { FC } from 'react';

const SignUp: FC = () => (
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
      <SignUpForm />
    </Paper>
  </Container>
);

export default SignUp;
