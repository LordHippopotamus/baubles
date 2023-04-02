import { Outlet, redirect } from 'react-router-dom';
import { getValidatedUser } from 'lib/firebase';
import EditorProvider from 'context/editor';
import MuiProvider from './MuiProvider';
import Navigation from './Navigation';
import { signUp, signIn, updateProfile, signOut } from 'lib/firebase/auth';
import { routes } from 'utils/routes';

export const loader = async () => await getValidatedUser();

export const action = async ({ request }) => {
  const formData = await request.formData();
  const action = formData.get('action');

  if (action === 'signIn') {
    try {
      const email = formData.get('email');
      const password = formData.get('password');
      await signIn(email, password);
      return redirect(routes.home);
    } catch (error) {
      return error.code;
    }
  }

  if (action === 'signUp') {
    try {
      const email = formData.get('email');
      const password = formData.get('password');
      await signUp(email, password);
      return redirect(routes.home);
    } catch (error) {
      return error.code;
    }
  }

  if (action === 'updateProfile') {
    const profile = JSON.parse(formData.get('profile'));
    await updateProfile(profile);
    return true;
  }

  if (action === 'signOut') {
    await signOut();
    return true;
  }

  return null;
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
