import { AccountCircle } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirebaseStore } from '../firebase';

const UserMenu = () => {
  const [anchor, setAnchor] = useState(null);

  const handleOpen = event => setAnchor(event.currentTarget);
  const handleClose = () => setAnchor(null);

  const auth = useFirebaseStore(state => state.auth);

  return (
    <div>
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
        open={Boolean(anchor)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to="/user/baubles" onClick={handleClose}>
          My Baubles
        </MenuItem>
        <MenuItem onClick={handleClose}>Account</MenuItem>
        <MenuItem onClick={() => signOut(auth).then(handleClose)}>Sign Out</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
