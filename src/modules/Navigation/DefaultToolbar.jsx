import { Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUserStore } from 'modules/firebase';
import UserMenu from './UserMenu';

const DefaultToolbar = () => {
  const user = useUserStore(state => state.user);

  return (
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Baubles
      </Typography>
      {user ? (
        <UserMenu />
      ) : (
        <Button component={Link} to="/login" color="inherit">
          Sign In
        </Button>
      )}
    </Toolbar>
  );
};

export default DefaultToolbar;
