import { AppBar, Box, Toolbar } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Account from './Account';
import Drawer from './Drawer';
import Logo from './Logo';
import Tools from './Tools';
import ThemeToggler from './ThemeToggler';

const Navigation = () => {
  const { pathname } = useLocation();
  const isEditor = pathname === '/editor';

  const [open, setOpen] = useState(false);
  const handleDrawer = () => setOpen(!open);

  return (
    <AppBar position="static">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pl={{ xs: !isEditor && 2, sm: !isEditor && 3 }}
        pr={{ xs: 2, sm: 3 }}
      >
        {isEditor ? <Tools handleDrawer={handleDrawer} /> : <Logo />}
        <Toolbar sx={{ width: 0, p: 0 }} />{' '}
        {/* for correct height and padding. it should be here because parent node have justifyContent="space-between" */}
        <Box display="flex" alignItems="center" gap={1}>
          <ThemeToggler />
          <Account />
        </Box>
        <Drawer open={open} handleClose={handleDrawer} />
      </Box>
    </AppBar>
  );
};

export default Navigation;
