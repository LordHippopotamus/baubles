import { Container, Paper } from '@mui/material';
import { redirect } from 'react-router-dom';
import { routes } from 'utils/routes';
import { signUp } from 'lib/firebase';
import SignUpForm from './SignUpForm';

export const action = async ({ request }) => {
  const formData = await request.formData();

  try {
    await signUp(formData.get('email'), formData.get('password'));
  } catch (error) {
    return error.code;
  }

  return redirect(routes.home);
};

const SignUp = () => (
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
