import { AccountCircle } from '@mui/icons-material';
import { Button, IconButton, Menu, MenuItem, Skeleton } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from 'modules/firebase';

const Account = () => {
  const user = useUserStore(state => state.user);
  const [anchor, setAnchor] = useState(null);

  const handleOpen = event => setAnchor(event.currentTarget);
  const handleClose = () => setAnchor(null);

  const signOut = useUserStore(state => state.signOut);

  if (user === undefined)
    return <Skeleton sx={{ m: 1 }} variant="circular" width="2.1875em" height="2.1875em" />;

  if (user === null)
    return (
      <Button component={Link} to="/login" color="inherit">
        Sign In
      </Button>
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
        <MenuItem component={Link} to="/add-bauble" onClick={handleClose}>
          Add bauble
        </MenuItem>
        <MenuItem component={Link} to="/profile" onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => signOut().then(handleClose)}>Sign Out</MenuItem>
      </Menu>
    </>
  );
};

export default Account;
