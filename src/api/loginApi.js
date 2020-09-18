import axios from 'axios';
import Config from 'src/config';

const login = ({ username, password }) => {
  return axios.post(`${Config.API_BASE_URL}/auth/login`, { username, password });
};

export { login };
