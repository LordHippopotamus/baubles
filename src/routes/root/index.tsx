import ColorModeProvider from 'context/colorMode';
import EditorProvider from 'context/editor';
import { getValidatedUser } from 'lib/firebase';
import { signIn, signOut, signUp } from 'lib/firebase/auth';
import { FC } from 'react';
import { ActionFunction, LoaderFunction, Outlet } from 'react-router-dom';
import MuiProvider from './MuiProvider';
import Navigation from './Navigation';

export const loader: LoaderFunction = async () => await getValidatedUser();

type Credentials = {
  email: string;
  password: string;
};

type Action = 'signIn' | 'signUp' | 'updateProfile' | 'signOut';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const action = formData.get('action') as Action;

  if (action === 'signIn') {
    try {
      const { email, password } = Object.fromEntries(formData) as Credentials;
      await signIn(email, password);
      history.back();
      return null;
    } catch (error: any) {
      return error.code;
    }
  }

  if (action === 'signUp') {
    try {
      const { email, password } = Object.fromEntries(formData) as Credentials;
      await signUp(email, password);
      history.back();
      return null;
    } catch (error: any) {
      return error.code;
    }
  }

  if (action === 'signOut') {
    await signOut();
    return true;
  }

  return null;
};

const Root: FC = () => (
  <ColorModeProvider>
    <MuiProvider>
      <EditorProvider>
        <Navigation />
        <Outlet />
      </EditorProvider>
    </MuiProvider>
  </ColorModeProvider>
);

export default Root;
