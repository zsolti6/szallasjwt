import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setTokenLocal] = useState('');

  const loginKezelo = async () => {
    try {
      const response = await axios.post('http://szallasjwt.sulla.hu/login', {
        username,
        password,
      });
      const token = response.data.token;
      setToken(token);
      setTokenLocal(token);
    } catch (error) {
      console.log("Nem sikerült az authentikáció: ", error);
    }
  };

  return (
    <div>
      <h2>Bejelentkezés</h2>
      Felhasználónév:
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      Jelszó:
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginKezelo}>Bejelentkezés</button>
      {token && (
        <Link to="/getszallasok">
          <button>Go to Szallasok</button>
        </Link>
      )}
    </div>
  );
};
