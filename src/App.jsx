import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Login } from './Login';
import { GetSzallasok } from './Get';
import { PostSzallas } from './Post';
import { ViewCard } from './ViewCard';
import { EditCard } from './EditCard';
import { DeleteCard } from './DeleteCard';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is loaded

export const App = () => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');

  return (
    <div>
      <Router>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Főoldal/Login</Link>
                </li>
                {token && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/getszallasok">Szállások</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/postszallas">Új szállás</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/getszallasok" element={token ? <GetSzallasok token={token} data={data} setData={setData} /> : <Navigate to="/" />} />
          <Route path="/postszallas" element={token ? <PostSzallas token={token} /> : <Navigate to="/" />} />
          
          {/* View Card Route */}
          <Route path="/view/:id" element={token ? <ViewCard data={data} /> : <Navigate to="/" />} />
          
          {/* Edit Card Route */}
          <Route path="/edit/:id" element={token ? <EditCard data={data} setData={setData} token={token} /> : <Navigate to="/" />} />
          
          {/* Delete Card Route */}
          <Route path="/delete/:id" element={token ? <DeleteCard data={data} setData={setData} token={token} /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
};
