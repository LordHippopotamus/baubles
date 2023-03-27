import { useState } from 'react';
import { Link, useFetcher } from 'react-router-dom';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useUser } from 'hooks/user';
import { routes } from 'utils/routes';

const Account = () => {
  const user = useUser();
  const fetcher = useFetcher();

  const [anchor, setAnchor] = useState(null);

  const handleOpen = event => setAnchor(event.currentTarget);
  const handleClose = () => setAnchor(null);

  const handleSignOut = () => {
    fetcher.submit({ idle: true }, { method: 'post', action: routes.signout });
    handleClose();
  };

  if (!user)
    return (
      <div>
        <Button component={Link} to={routes.signin} color="inherit">
          Sign In
        </Button>
        <Button component={Link} to={routes.signup} color="inherit">
          Sign Up
        </Button>
      </div>
    );

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpen}
        color="inherit"
      >
        <AccountCircle fontSize="large" />
      </IconButton>
      <Menu
        anchorEl={anchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={!!anchor}
        onClose={handleClose}
      >
        <MenuItem component={Link} to={routes.profile} onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </>
  );
};

export default Account;
