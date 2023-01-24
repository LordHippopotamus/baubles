import { AppBar } from '@mui/material';
import { useLocation } from 'react-router-dom';
import DefaultToolbar from './DefaultToolbar';
import EditorToolbar from './EditorToolbar';

const Navigation = () => {
  const { pathname } = useLocation();

  return (
    <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      {pathname === '/add-bauble' ? <EditorToolbar /> : <DefaultToolbar />}
    </AppBar>
  );
};

export default Navigation;
