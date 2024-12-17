import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Importing Bootstrap icons

export const GetSzallasok = ({ token, data, setData }) => {
  useEffect(() => {
    if (token) {
      adatLekeres(); // Fetch data when token is available
    }
  }, [token, setData]); 

  const adatLekeres = async () => {
    // Fetch data based on token...
  };

  return (
    <div className="container">
      <div className="row">
        {data.map((item) => (
          <div className="col col-md-3" key={item.id}>
            <div className="card">
              <div className="card-header">
                <h2>{item.name}</h2>
              </div>
              <div className="card-body">
                <p className="card-text">Hostname: {item.hostname}</p>
                <p className="card-text">Location: {item.location}</p>
                <p className="card-text">Price: {item.price}</p>
                <p className="card-text">Minimum nights: {item.minimum_nights}</p>
              </div>
              {/* Icons Section */}
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
  );
};
