import { CircularProgress, List, ListItem, ListItemButton, Popover } from '@mui/material';
import { useEffect } from 'react';
import { Link, useFetcher } from 'react-router-dom';
import { routes } from 'utils/routes';
import { useUser } from 'hooks/user';

const Menu = ({ anchor, handleClose }) => {
  const user = useUser();
  const fetcher = useFetcher();
  const loading = fetcher.state !== 'idle';

  const handleSignOut = () => {
    fetcher.submit({ action: 'signOut' }, { method: 'post', action: routes.home });
  };

  useEffect(() => {
    fetcher.state !== 'submitting' && fetcher.data && handleClose();
  }, [fetcher.state, fetcher.data]);

  return (
    <Popover
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
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleClose}
            component={Link}
            to={`/users/${user.uid}`}
            disabled={loading}
          >
            Profile
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton disabled={loading} onClick={handleSignOut}>
            {loading ? (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CircularProgress color="inherit" size="1rem" />
              </div>
            ) : (
              'Sign Out'
            )}
          </ListItemButton>
        </ListItem>
      </List>
    </Popover>
  );
};

export default Menu;
