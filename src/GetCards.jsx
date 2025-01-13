import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

export const GetSzallasok = ({ token, data, setData }) => {
  useEffect(() => {
    if (token) {
      adatLekeres();
    }
  }, [token]);

  const adatLekeres = async () => {
    try {
      const response = await axios.get('http://szallasjwt.sulla.hu/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'relative',
        flexDirection: 'column',
        paddingTop: '50px',
      }}
    >
      <div className="container">
        <div className="row mb-4">
          {data.map((item) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={item.id}>
              <div className="card bg-light shadow">
                <div className="card-header">
                  <h2>{item.name}</h2>
                </div>
                <div className="card-body">
                  <p className="card-text">Hostname: {item.hostname}</p>
                  <p className="card-text">Location: {item.location}</p>
                  <p className="card-text">Price: {item.price}</p>
                  <p className="card-text">Minimum nights: {item.minimum_nights}</p>
                </div>
                <div className="card-footer text-center">
                  <Link to={`/view/${item.id}`}>
                    <FaEye className="mx-2" />
                  </Link>
                  <Link to={`/edit/${item.id}`}>
                    <FaEdit className="mx-2" />
                  </Link>
                  <Link to={`/delete/${item.id}`}>
                    <FaTrash className="mx-2" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
