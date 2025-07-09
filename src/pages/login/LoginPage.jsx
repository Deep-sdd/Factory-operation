import React, { useState } from 'react';
import LoginForm from './LoginForm';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Later you will call API here
    alert(`Logging in with: ${email} / ${password}`);
  };

  return (
    <div className="container">
      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    </div>
  );
};

export default LoginPage;
