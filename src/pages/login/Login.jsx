import React, { useState } from 'react';
import './Login.scss';
import { FaShieldAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/user';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    console.log('Validation Result:', newErrors); // 🔍 Log validation output
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) {
      console.warn('Validation failed');
      return;
    }

    try {
      setLoading(true);
      const loginData = { email, password };
      console.log('[Login] Dispatching loginUser with:', loginData); // 🔍

      const response = await dispatch(loginUser(loginData));
      console.log('[Login] Dispatch response:', response); // 🔍

      const userData = response?.payload;
      console.log('[Login] Extracted user data:', userData); // 🔍

      if (userData?.token) {
        localStorage.setItem('token', userData.token);
        console.log('[Login] Token stored, navigating to dashboard');
        navigate('/dashboard');
      } else {
        console.warn('[Login] No token found in response:', userData);
        alert('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('[Login] Exception during login:', err);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon"><FaShieldAlt /></div>
          <h2>Super Admin Portal</h2>
          <p>System Administration Access</p>
        </div>
        <form className="login-body" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Administrator Email</label>
            <input
              type="email"
              value={email}
              placeholder="admin@factoryops.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Secure Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? '🔒 Logging in...' : '⚙ Access Admin Portal'}
          </button>
        </form>
        <div className="login-footer">
          <a href="#">← Back to Role Selection</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
