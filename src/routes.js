import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from 'src/layouts/MainLayout';
import DefaultLayout from 'src/layouts/DefaultLayout';
import LazyView from 'src/components/LazyView';
import AuthWrapper from 'src/components/AuthWrapper';
import UserListView from 'src/views/UserListView';
import LoginView from 'src/views/auth/LoginView';
import config from 'src/config';

const HomeView = React.lazy(() => import('src/views/HomeView'));
const VersionView = React.lazy(() => import('src/views/VersionView'));
const NotFoundView = React.lazy(() => import('src/views/NotFoundView'));

const routes = [
  {
    path: config.ADMIN_CONTEXT_PATH,
    element: <MainLayout />,
    children: [
      { path: 'users', element: <AuthWrapper View={UserListView} /> },
      { path: '/', element: <Navigate to={`${config.ADMIN_CONTEXT_PATH}/login`} /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to={`${config.ADMIN_CONTEXT_PATH}/login`} />,
      },
      { path: `${config.ADMIN_CONTEXT_PATH}/login`, element: <LoginView /> },
      {
        path: 'home',
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
