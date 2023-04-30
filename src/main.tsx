import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root, { loader as rootLoader, action as rootAction } from 'routes/root';
import Home, { loader as homeLoader } from 'routes/home';
import SignIn from 'routes/signin';
import SignUp from 'routes/signup';
import UserDetails, {
  loader as userDetailsLoader,
  action as userDetailsAction,
} from 'routes/userDetails';
import Editor, { loader as editorLoader, action as editorAction } from 'routes/editor';
import BaubleDetails, { loader as baubleDetailsLoader } from 'routes/baubleDetails';

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
        path: 'users/:uid',
        element: <UserDetails />,
        loader: userDetailsLoader,
        action: userDetailsAction,
      },
      {
        id: 'editor',
        path: routes.editor,
        element: <Editor />,
        loader: editorLoader,
        action: editorAction,
      },
      {
        path: routes.baubles.details + ':baubleId',
        element: <BaubleDetails />,
        loader: baubleDetailsLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
