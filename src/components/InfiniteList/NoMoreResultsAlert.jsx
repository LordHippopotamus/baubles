import { Alert, AlertTitle, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { routes } from 'utils/routes';

const NoMoreResultsAlert = () => (
  <Alert severity="info" color="primary">
    <AlertTitle>There&apos;s no more baubles!</AlertTitle>
  <Link component={RouterLink} to={routes.profile} state={{createNewBauble: true}}>
      Maybe you want to make your own?
    </Link>
  </Alert>
);

export default NoMoreResultsAlert;
