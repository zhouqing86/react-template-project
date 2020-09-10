import React from 'react';
import { Navigate } from 'react-router-dom';
import HomeView from 'src/views/HomeView';
import VersionView from 'src/views/VersionView';
import NotFoundView from 'src/views/NotFoundView';

const routes = [
  { path: '/', element: <HomeView /> },
  { path: '/version', element: <VersionView /> },
  { path: '/404', element: <NotFoundView /> },
  { path: '*', element: <Navigate to="/404" /> },
];

export default routes;
