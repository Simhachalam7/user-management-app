import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create UserContext
const UserContext = createContext();

// Custom Hook
export const useUserContext = () => useContext(UserContext);

// Sample users for fallback
const sampleUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', company: 'Tech Inc.' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', company: 'Biz Corp.' },
];

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const fetchedUsers = response.data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          company: user.company.name,
        }));
        setUsers(fetchedUsers);
        localStorage.setItem('users', JSON.stringify(fetchedUsers));
      } catch (error) {
        console.error('Failed to fetch users', error);
        if (users.length === 0) {
          setUsers(sampleUsers);
        }
      }
    };

    if (users.length === 0) {
      fetchUsers();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};
