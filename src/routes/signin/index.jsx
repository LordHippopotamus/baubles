import { Container, Paper } from '@mui/material';
import { redirect } from 'react-router-dom';
import { routes } from 'utils/routes';
import { signIn } from 'lib/firebase';
import SignInForm from './SignInForm';

export const action = async ({ request }) => {
  const formData = await request.formData();

  try {
    await signIn(formData.get('email'), formData.get('password'));
  } catch (error) {
    return error.code;
  }

  return redirect(routes.home);
};

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
