import axios from 'axios';

const API = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all users
export const fetchUsers = () => API.get('/users');

// Add a new user
export const addUser = (user) => API.post('/users', user);

// Edit an existing user
export const editUser = (id, user) => API.put(`/users/${id}`, user);

// Delete a user
export const deleteUser = (id) => API.delete(`/users/${id}`);
