import React from 'react';
import { Navigate } from 'react-router-dom';

import LazyView from 'src/components/LazyView';

const HomeView = React.lazy(() => import('src/views/HomeView'));
const VersionView = React.lazy(() => import('src/views/VersionView'));
const NotFoundView = React.lazy(() => import('src/views/NotFoundView'));

const routes = [
  {
    path: '/',
    element: (
      <LazyView>
        <HomeView />
      </LazyView>
    ),
  },
  {
    path: '/version',
    element: (
      <LazyView>
        <VersionView />
      </LazyView>
    ),
  },
  {
    path: '/404',
    element: (
      <LazyView>
        <NotFoundView />
      </LazyView>
    ),
  },
  { path: '*', element: <Navigate to="/404" /> },
];

export default routes;
