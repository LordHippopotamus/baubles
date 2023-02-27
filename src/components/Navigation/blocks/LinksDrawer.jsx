import { Menu as MenuIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import Drawer from './Drawer';

const LinksDrawer = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => setOpen(!open);
  const handleDrawerClose = () => setOpen(false);

  return (
    <>
      <IconButton color="inherit" onClick={handleDrawerToggle}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={handleDrawerClose} />
    </>
  );
};

export default LinksDrawer;
