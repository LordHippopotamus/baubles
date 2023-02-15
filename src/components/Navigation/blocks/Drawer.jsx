import { Drawer as MuiDrawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Drawer = ({ pages = [{ name: 'Home', path: '/' }], open, onClose }) => (
  <MuiDrawer
    PaperProps={{
      sx: { minWidth: '12rem' },
    }}
    open={open}
    onClose={onClose}
  >
    <List disablePadding>
      {pages.map(el => (
        <ListItem disablePadding key={el.path}>
          <ListItemButton onClick={onClose} component={Link} to={el.path}>
            <ListItemText primary={el.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </MuiDrawer>
);

export default Drawer;
