import { Alert, AlertTitle, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useUser } from 'hooks/user';

const NoMoreResultsAlert = () => {
  const user = useUser();

  return (
    <Alert severity="info" color="primary">
      <AlertTitle>There&apos;s no more baubles!</AlertTitle>
      <Link
        component={RouterLink}
        to={user ? `/users/${user.uid}` : '/signin'}
        state={user && { createNewBauble: true }}
      >
        Maybe you want to make your own?
      </Link>
    </Alert>
  );
};

export default NoMoreResultsAlert;
