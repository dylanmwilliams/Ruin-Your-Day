import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Login.jsx';
import FilterList from './FilterList.jsx';

const App = () => {
  const [token, setToken] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios.get('/classes/spotify/token')
      .then((response) => {
        const { access_token } = response.data;
        setToken(access_token);
        console.log('Success getting the token');
      })
      .catch((err) => {
        console.error('Error Getting token', err);
      });
  }, []);

  const handleLogin = () => {
    setShowLogin(false);
  };

  return (
        <div>
          <h1 className='main-title'> Ruin Your Day</h1>
          {showLogin ? <Login onLogin={handleLogin} /> : <FilterList token={token}/>}
        </div>
  );
};

export default App;
