import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import './UserList.css';

const UserList = () => {
  const { users, setUsers } = useUserContext();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="user-list-container">
      <h2>User Management</h2>
      <div className="sub-header">
        <span className="user-count">Active Users: {users.length}</span>
        <Link to="/add" className="btn btn-primary">Add New User</Link>
      </div>
      <hr/>

      {users.length === 0 ? (
        <div className="no-data">
          <h3>No user data found.</h3>
        </div>
      ) : (
        <div className="user-cards">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <h4>{user.name}</h4>
              <p>Id: {user.id + 3000}</p>
              <p>Email: {user.email}</p>
              <p>Company: {user.company}</p>
              <div className="card-actions">
                <Link to={`/edit/${user.id}`} className="btn btn-warning btn-sm">Edit</Link>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
