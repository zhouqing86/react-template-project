import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ className, ...rest }) => {
  return <img alt="Logo" src="/logo192.png" className={className} {...rest} />;
};

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
