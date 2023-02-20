import { AppBar } from '@mui/material';
import { useLocation } from 'react-router-dom';
import DefaultToolbar from './DefaultToolbar';
import EditorToolbar from './EditorToolbar';

const Navigation = () => {
  const { pathname } = useLocation();
  const isEditor = pathname === '/editor';

  return <AppBar position="static">{isEditor ? <EditorToolbar /> : <DefaultToolbar />}</AppBar>;
};

export default Navigation;
