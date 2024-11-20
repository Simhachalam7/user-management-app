import axios from 'axios';

const API = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUsers = () => API.get('/users');

export const addUser = (user) => API.post('/users', user);

export const editUser = (id, user) => API.put(`/users/${id}`, user);

export const deleteUser = (id) => API.delete(`/users/${id}`);
