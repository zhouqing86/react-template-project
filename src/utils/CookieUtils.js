import { Cookies } from 'react-cookie';
import get from 'lodash/get';

const getTokenFromCookie = () => {
  return new Cookies().get('token');
};

const removeTokenFromCookie = () => {
  return new Cookies().remove('token');
};

const removeTokenIfUnauthorized = err => {
  const status = get(err, 'response.status', 0);
  if ([403, 402, 401].indexOf(status) >= 0) {
    removeTokenFromCookie();
  }
};

export { getTokenFromCookie, removeTokenFromCookie, removeTokenIfUnauthorized };
