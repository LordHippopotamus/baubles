import { useState, MouseEvent } from 'react';
import { IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useUser } from 'hooks/user';
import LoginLinks from './LoginLinks';
import Menu from './Menu';

const Account = () => {
  const user = useUser();

  const [anchor, setAnchor] = useState<null | Element>(null);

  const handleOpen = (event: MouseEvent) => setAnchor(event.currentTarget);
  const handleClose = () => setAnchor(null);

  if (!user) return <LoginLinks />;

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

      <Menu anchor={anchor} handleClose={handleClose} />
    </>
  );
};

export default Account;
