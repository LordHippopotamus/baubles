import { Drawer as MuiDrawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from 'utils/routes';

const Drawer = ({ open, handleClose }) => (
  <MuiDrawer open={open} onClose={handleClose}>
    <List disablePadding>
      <ListItem disablePadding>
        <ListItemButton onClick={handleClose} component={Link} to={routes.home}>
          <ListItemText primary="Home" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => console.log('saving')}>
          <ListItemText primary="Save" />
        </ListItemButton>
      </ListItem>
    </List>
  </MuiDrawer>
);

export default Drawer;
