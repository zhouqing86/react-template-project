import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from 'src/layouts/MainLayout';
import LazyView from 'src/components/LazyView';
import UserListView from 'src/views/UserListView';
import config from 'src/config';

const HomeView = React.lazy(() => import('src/views/HomeView'));
const VersionView = React.lazy(() => import('src/views/VersionView'));
const NotFoundView = React.lazy(() => import('src/views/NotFoundView'));

const routes = [
  {
    path: config.ADMIN_CONTEXT_PATH,
    element: <MainLayout />,
    children: [
      { path: 'users', element: <UserListView /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <LazyView>
            <HomeView />
          </LazyView>
        ),
      },
      {
        path: 'version',
        element: (
          <LazyView>
            <VersionView />
          </LazyView>
        ),
      },
      {
        path: '404',
        element: (
          <LazyView>
            <NotFoundView />
          </LazyView>
        ),
      },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
