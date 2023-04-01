import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root, { loader as rootLoader, action as rootAction } from 'routes/root';
import Home, { loader as homeLoader } from 'routes/home';
import SignIn from 'routes/signin';
import SignUp from 'routes/signup';
import Profile, { loader as profileLoader, action as profileAction } from 'routes/profile';
import Editor, { loader as editorLoader, action as editorAction } from 'routes/editor';

import { routes } from 'utils/routes';

const router = createBrowserRouter([
  {
    id: 'root',
    path: routes.home,
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: routes.signin,
        element: <SignIn />,
      },
      {
        path: routes.signup,
        element: <SignUp />,
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
        action: editorAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
