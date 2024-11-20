import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import '../styles/UserForm.css';

const UserForm = () => {
  const { users, setUsers } = useUserContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
  });

  useEffect(() => {
    if (isEditing) {
      const user = users.find((u) => u.id === parseInt(id));
      if (user) {
        setFormData(user);
      }
    }
  }, [id, isEditing, users]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === parseInt(id) ? { ...user, ...formData } : user
        )
      );
    } else {
      setUsers((prevUsers) => [
        ...prevUsers,
        {
          ...formData,
          id: prevUsers.length > 0 ? Math.max(...prevUsers.map((u) => u.id)) + 1 : 1,
        },
      ]);
    }

    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>{isEditing ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Company</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update User' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
