import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className = 'login-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <input
          type='text'
          placeholder='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='login-input'
          />
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='login-input'
          />
          <button type='submit' className='login-button'>Login</button>
     </form>
    </div>

  );
};

export default Login;
