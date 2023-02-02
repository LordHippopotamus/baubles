import { Box, Toolbar, Typography } from '@mui/material';
import Account from './blocks/Account';
import Links from './blocks/Links';
import LinksDrawer from './blocks/LinksDrawer';

const DefaultToolbar = () => (
  <Toolbar>
    <Box sx={{ mr: 2, display: { md: 'none' } }}>
      <LinksDrawer />
    </Box>

    <Typography variant="h6">Baubles</Typography>

    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Links />
    </Box>

    <Box sx={{ ml: 'auto' }}>
      <Account />
    </Box>
  </Toolbar>
);

export default DefaultToolbar;
