import axios from 'axios';
import config from 'src/config';

const fetchUsers = ({ page, pageSize }) => {
  return axios.get(`${config.API_BASE_URL}/users?_page=${page}&_limit=${pageSize}`);
};

const createUser = (user) => {
  return axios.post(`${config.API_BASE_URL}/users`, user);
};

const updateUser = (user) => {
  return axios.put((`${config.API_BASE_URL}/users/${user.id}`, user));
};

const deleteUser = (id) => {
  return axios.delete(`${config.API_BASE_URL}/users/${id}`);
};

export { fetchUsers, createUser, updateUser, deleteUser };
