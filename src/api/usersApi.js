import axios from 'axios';
import config from 'src/config';
import { getTokenFromCookie } from 'src/utils/CookieUtils';

const fetchUsers = ({ page, pageSize }) => {
  return axios.get(`${config.API_BASE_URL}/users?_page=${page}&_limit=${pageSize}`, {
    headers: { token: getTokenFromCookie() },
  });
};

const createUser = (user) => {
  return axios.post(`${config.API_BASE_URL}/users`, user, {
    headers: { token: getTokenFromCookie() },
  });
};

const updateUser = (user) => {
  return axios.put(`${config.API_BASE_URL}/users/${user.id}`, user, {
    headers: { token: getTokenFromCookie() },
  });
};

const deleteUser = (id) => {
  return axios.delete(`${config.API_BASE_URL}/users/${id}`, {
    headers: { token: getTokenFromCookie() },
  });
};

export { fetchUsers, createUser, updateUser, deleteUser };
