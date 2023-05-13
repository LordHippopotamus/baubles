import { Container, Paper } from '@mui/material';
import SignUpForm from './SignUpForm';
import { FC } from 'react';

const SignUp: FC = () => (
  <Container>
    <Paper
      sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      elevation={1}
    >
      <SignUpForm />
    </Paper>
  </Container>
);

export default SignUp;
