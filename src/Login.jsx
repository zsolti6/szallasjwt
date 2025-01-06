import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is loaded

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
      //console.log('Nem sikerült az authentikáció: ', error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start"
      style={{ height: '90vh', paddingTop: '5vh' }}
    >
      <div className="card p-4 shadow" style={{ width: '300px' }}>
        <h2 className="text-center mb-4">Bejelentkezés</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Felhasználónév:
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Jelszó:
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={loginKezelo}>
          Bejelentkezés
        </button>
        {token && (
          <Link to="/getszallasok">
            <button className="btn btn-success w-100 mt-3">
              Szállások megjelenítése
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
