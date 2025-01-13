import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


export const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setTokenLocal] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.body.style.backgroundImage = 'url("/img/images.jpg")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
    };
  }, []);

  const loginKezelo = async () => {
    try {
      const response = await axios.post('http://szallasjwt.sulla.hu/login', {
        username,
        password,
      });
      const token = response.data.token;
      setToken(token);
      setTokenLocal(token);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Hibás felhasználónév vagy jelszó!');
    }
  };

  return (
    <div
      style={{
        minHeight: '92.3vh',
        margin: 0,
        overflow: 'hidden',
      }}
    >
      <div className="d-flex justify-content-center" style={{ marginTop: '80px' }}>
        <div
          className="card shadow-lg p-5"
          style={{
            width: '100%',
            maxWidth: '500px',
            borderRadius: '15px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          <h2 className="text-center mb-4" style={{ fontWeight: 'bold' }}>
            Bejelentkezés
          </h2>
          <div className="mb-4">
            <label htmlFor="username" className="form-label">
              Felhasználónév:
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Felhasználónév"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Jelszó:
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Jelszó"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={loginKezelo}>
            Bejelentkezés
          </button>

          {errorMessage && (
            <div
              className="text-danger text-center mt-3"
              style={{ fontWeight: 'bold' }}
            >
              {errorMessage}
            </div>
          )}

          {token && (
            <Link to="/getszallasok">
              <button className="btn btn-success w-100 mt-3">
                Szállások megjelenítése
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};