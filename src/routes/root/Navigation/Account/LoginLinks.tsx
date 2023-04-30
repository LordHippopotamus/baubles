import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from 'utils/routes';

const LoginLinks = () => (
  <div>
    <Button component={Link} to={routes.signin} color="inherit">
      Sign In
    </Button>
    <Button component={Link} to={routes.signup} color="inherit">
      Sign Up
    </Button>
  </div>
);

export default LoginLinks;
