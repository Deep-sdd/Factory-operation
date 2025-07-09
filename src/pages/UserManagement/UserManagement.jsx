// src/features/user/components/UserManagement/UserManagement.jsx

import React, { useState } from 'react';
import './UserManagement.scss';
import {
  FaUsers,
  FaSearch,
  FaFilter,
  FaPlus,
  FaShieldAlt,
  FaUserCog,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaUserTie,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';

const mockUsers = [
  {
    initials: 'JS',
    name: 'John Smith',
    email: 'john.smith@factory.com',
    phone: '+1 (555) 123-4567',
    role: 'Technician',
    status: 'Active',
    department: 'Maintenance',
    lastLogin: '2024-12-27',
  },
  {
    initials: 'SJ',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@factory.com',
    phone: '+1 (555) 234-5678',
    role: 'Maintenance Manager',
    status: 'Active',
    department: 'Maintenance',
    lastLogin: '2024-12-27',
  },
];

const UserManagement = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [users, setUsers] = useState(mockUsers);
  const [newUser, setNewUser] = useState({
    id: 0,
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    password: '',
    confirmPassword: '',
    isActive: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const roles = [
    'Technician',
    'Senior Technician',
    'Maintenance Manager',
    'Supervisor',
    'Administrator',
  ];

  const departments = [
    'Maintenance',
    'Production',
    'Quality Control',
    'Operations',
    'Management',
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!newUser.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!newUser.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      newErrors.email = 'Email is invalid';
    }

    // if (!newUser.phone.trim()) {
    //   newErrors.phone = 'Phone is required';
    // }

    // if (!newUser.role) {
    //   newErrors.role = 'Role is required';
    // }

    // if (!newUser.department) {
    //   newErrors.department = 'Department is required';
    // }

    if (!isEditing) {
      if (!newUser.password) {
        newErrors.password = 'Password is required';
      } else if (newUser.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (newUser.password !== newUser.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userToAdd = {
      ...newUser,
      id: Date.now(),
      initials: newUser.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      status: newUser.isActive ? 'Active' : 'Inactive',
      lastLogin: new Date().toISOString().split('T')[0],
    };

    if (isEditing) {
      setUsers(users.map((u) => (u.id === newUser.id ? userToAdd : u)));
    } else {
      setUsers([...users, userToAdd]);
    }

    handleCancel();
  };


  const handleCancel = () => {
    setNewUser({
      id: 0,
      name: '',
      email: '',
      phone: '',
      role: '',
      department: '',
      password: '',
      confirmPassword: '',
      isActive: true,
    });
    setIsEditing(false);
    setShowFormModal(false);
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSoftDelete = (userId) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: 'Inactive' } : user
    ));
  };

  const handleInputChange = (field, value) => {
    setNewUser({ ...newUser, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="user-management">
      <div className="user-header">
        <div>
          <h2>User Management</h2>
          <p>Manage users across all tenants</p>
        </div>
        <button className="add-user-btn" onClick={() => setShowFormModal(true)}>
          <FaPlus /> Add User
        </button>
      </div>

      <div className="user-controls">
        <input type="text" placeholder="Search users..." />
        <button>
          <FaSearch /> Search
        </button>
        <button>
          <FaFilter /> Filter
        </button>
      </div>

      <div className="user-stats">
        <div className="card blue">
          <p>24</p>
          <span>
            <FaUsers /> Total Users
          </span>
        </div>
        <div className="card green">
          <p>22</p>
          <span>
            <FaShieldAlt /> Active Users
          </span>
        </div>
        <div className="card purple">
          <p>3</p>
          <span>
            <FaUserCog /> Managers
          </span>
        </div>
        <div className="card orange">
          <p>18</p>
          <span>
            <FaUsers /> Technicians
          </span>
        </div>
      </div>

      <div className="user-list">
        <h3>Team Members</h3>
        {users.map((user, idx) => (
          <div className="user-card" key={idx}>
            <div className="avatar">{user.initials}</div>
            <div className="user-info">
              <div className="user-top">
                <strong>{user.name}</strong>
                <span className="badge role">{user.role}</span>
                <span className="badge status">{user.status}</span>
              </div>
              <div className="user-bottom">
                <p>📧 {user.email}</p>
                {/* <p>📞 {user.phone}</p> */}
                <p>{user.department} • Last login: {user.lastLogin}</p>
              </div>
            </div>
            <button className="edit-btn">⚙ Edit</button>
            <button
              className="delete-btn"
              onClick={() => handleSoftDelete(user.id)}
            >
              <FaTimes /> Delete
            </button>

          </div>

        ))}
      </div>

      {showFormModal && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <FaUser className="modal-icon" />
                {isEditing ? 'Edit User' : 'Add New User'}
              </h3>
              <button className="close-btn" onClick={handleCancel}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="user-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    <FaUser className="input-icon" />
                    User Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={newUser.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={errors.name ? 'error' : ''}
                    placeholder="Enter full name"
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope className="input-icon" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={newUser.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'error' : ''}
                    placeholder="Enter email address"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              {/* <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">
                    <FaPhone className="input-icon" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={newUser.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={errors.phone ? 'error' : ''}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="role">
                    <FaUserTie className="input-icon" />
                    Role *
                  </label>
                  <select
                    id="role"
                    value={newUser.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className={errors.role ? 'error' : ''}
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  {errors.role && <span className="error-message">{errors.role}</span>}
                </div>
              </div> */}

              {/* <div className="form-group">
                <label htmlFor="department">
                  <FaBuilding className="input-icon" />
                  Department *
                </label>
                <select
                  id="department"
                  value={newUser.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className={errors.department ? 'error' : ''}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.department && <span className="error-message">{errors.department}</span>}
              </div> */}

              {!isEditing && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="password">
                        <FaShieldAlt className="input-icon" />
                        Password *
                      </label>
                      <div className="password-input">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          value={newUser.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className={errors.password ? 'error' : ''}
                          placeholder="Enter password"
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword">
                        <FaShieldAlt className="input-icon" />
                        Confirm Password *
                      </label>
                      <div className="password-input">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          id="confirmPassword"
                          value={newUser.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className={errors.confirmPassword ? 'error' : ''}
                          placeholder="Confirm password"
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div>
                  </div>
                </>
              )}

              {/* <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={newUser.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Active User
                </label>
                <p className="help-text">User will be able to login and access the system</p>
              </div> */}

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {isEditing ? 'Update User' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;