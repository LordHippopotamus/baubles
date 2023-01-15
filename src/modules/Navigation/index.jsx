import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useUserStore } from 'modules/user';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';

const Navigation = () => {
  const user = useUserStore(state => state.user);

  return (
    <AppBar position="static">
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
    </AppBar>
  );
};

export default Navigation;
