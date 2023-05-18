import { Alert, AlertTitle, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useUser } from 'hooks/user';
import { FC } from 'react';

type Props = {
  showLink?: boolean;
};

const NoMoreResultsAlert: FC<Props> = ({ showLink = true }) => {
  const user = useUser();

  return (
    <Alert severity="info">
      <AlertTitle>There&apos;s no more baubles!</AlertTitle>
      {showLink && (
        <Link
          component={RouterLink}
          to={user ? `/users/${user.uid}` : '/signin'}
          state={user && { createNewBauble: true }}
        >
          Maybe you want to make your own?
        </Link>
      )}
    </Alert>
  );
};

export default NoMoreResultsAlert;
