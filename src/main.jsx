import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root, { loader as rootLoader } from 'routes/root';
import SignIn, { action as signInAction } from 'routes/signin';
import SignUp, { action as signUpAction } from 'routes/signup';
import { action as signOutAction } from 'routes/signout';
import Profile, { loader as profileLoader, action as profileAction } from 'routes/profile';
import Editor, { loader as editorLoader } from 'routes/editor';

import { routes } from 'utils/routes';

const router = createBrowserRouter([
  {
    id: 'root',
    path: routes.home,
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: routes.signin,
        element: <SignIn />,
        action: signInAction,
      },
      {
        path: routes.signup,
        element: <SignUp />,
        action: signUpAction,
      },
      {
        path: routes.signout,
        action: signOutAction,
      },
      {
        path: routes.profile,
        element: <Profile />,
        loader: profileLoader,
        action: profileAction,
      },
      {
        id: 'editor',
        path: routes.editor,
        element: <Editor />,
        loader: editorLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
