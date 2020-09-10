import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

const LazyView = ({ children }) => {
  return <Suspense fallback={<div>loading</div>}>{children}</Suspense>;
};

LazyView.propTypes = {
  children: PropTypes.any,
};

export default LazyView;
