import { AccountCircle } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../firebase';

const UserMenu = () => {
  const [anchor, setAnchor] = useState(null);

  const handleOpen = event => setAnchor(event.currentTarget);
  const handleClose = () => setAnchor(null);

  const signOut = useUserStore(state => state.signOut);

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
        <MenuItem component={Link} to="/add-bauble" onClick={handleClose}>
          Add bauble
        </MenuItem>
        <MenuItem onClick={handleClose}>Account</MenuItem>
        <MenuItem onClick={() => signOut().then(handleClose)}>Sign Out</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
