import { Container, Paper } from '@mui/material';
import SignInForm from './SignInForm';

const SignIn = () => (
  <Container>
    <Paper
      sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      elevation={1}
    >
      <SignInForm />
    </Paper>
  </Container>
);

export default SignIn;
