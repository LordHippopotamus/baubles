import {
  CircularProgress,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Link, useFetcher, useSearchParams } from 'react-router-dom';
import { useArea, usePalette } from 'hooks/editor';
import { routes } from 'utils/routes';

const Drawer = ({ open, handleClose }) => {
  const fetcher = useFetcher();
  const [searchParams] = useSearchParams();

  const area = useArea();
  const palette = usePalette();

  const handleSave = () => {
    fetcher.submit(
      {
        area: JSON.stringify(area),
        palette: JSON.stringify(palette),
        owner: searchParams.get('owner'),
        bauble: searchParams.get('bauble'),
      },
      { method: 'put', action: routes.editor }
    );
  };

  const loading = fetcher.state !== 'idle';

  return (
    <MuiDrawer open={open} onClose={handleClose}>
      <List disablePadding>
        <ListItem disablePadding>
          <ListItemButton
            disabled={loading}
            onClick={handleClose}
            component={Link}
            to={routes.home}
          >
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton disabled={loading} onClick={handleSave}>
            <ListItemText
              primary={
                loading ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color="inherit" size="1rem" />
                  </div>
                ) : (
                  'Save'
                )
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
