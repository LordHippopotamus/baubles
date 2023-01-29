import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from 'routes/root';
import Login from 'routes/login';
import AddBauble from './routes/addBauble';
import Profile from './routes/profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/add-bauble', element: <AddBauble /> },
      { path: '/profile', element: <Profile /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
