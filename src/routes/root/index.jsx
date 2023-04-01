import { Outlet } from 'react-router-dom';
import { getValidatedUser } from 'lib/firebase';
import EditorProvider from 'context/editor';
import MuiProvider from './MuiProvider';
import Navigation from './Navigation';
import { updateProfile } from 'lib/firebase/auth';

export const loader = async () => await getValidatedUser();

export const action = async ({ request }) => {
  if (request.method === 'PATCH') {
    const formData = await request.formData();
    const profile = JSON.parse(formData.get('profile'));
    await updateProfile(profile);
  }

  return 1;
};

const Root = () => (
  <MuiProvider>
    <EditorProvider>
      <Navigation />
      <Outlet />
    </EditorProvider>
  </MuiProvider>
);

export default Root;
