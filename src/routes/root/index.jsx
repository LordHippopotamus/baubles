import { Outlet } from 'react-router-dom';
import { getValidatedUser } from 'lib/firebase';
import EditorProvider from 'context/editor';
import MuiProvider from './MuiProvider';
import Navigation from './Navigation';

export const loader = async () => await getValidatedUser();

const Root = () => (
  <MuiProvider>
    <EditorProvider>
      <Navigation />
      <Outlet />
    </EditorProvider>
  </MuiProvider>
);

export default Root;
