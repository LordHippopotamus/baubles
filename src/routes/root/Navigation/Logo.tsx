import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from 'utils/routes';

const Logo = () => (
  <Typography variant="h6">
    <Link to={routes.home} style={{ color: 'inherit', textDecoration: 'inherit' }}>
      Baubles
    </Link>
  </Typography>
);

export default Logo;
