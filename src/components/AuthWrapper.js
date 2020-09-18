import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import isEmpty from 'lodash/isEmpty';
import config from 'src/config';

const AuthWrapper = ({ View, ...rest }) => {
  const [cookies] = useCookies('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (isEmpty(cookies.token)) {
      navigate(`${config.ADMIN_CONTEXT_PATH}/login`);
    }
  });

  return <View {...rest} />;
};

AuthWrapper.propTypes = {
  View: PropTypes.func,
};

export default AuthWrapper;
