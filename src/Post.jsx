import React, { useState } from 'react';
import axios from 'axios';

export const PostSzallas = ({ token }) => {
  const [name, setName] = useState('');
  const [hostname, setHostname] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [minimumNights, setMinimumNights] = useState('');

  const handlePost = async () => {
    const newData = {
      name,
      hostname,
      location,
      price,
      minimum_nights: minimumNights,
    };

    try {
      const response = await axios.post('http://szallasjwt.sulla.hu/data', newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Sikeres hozzáadás!');
      setName('');
      setHostname('');
      setLocation('');
      setPrice('');
      setMinimumNights('');
    } catch (error) {
      //console.error('Failed to post data:', error);
      alert('Failed to post data');
    }
  };

  return (
    <div className="container mt-4">
      <h2 style={{ textAlign: 'center' }}
      >Új szállás</h2>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="hostname" className="form-label">Hostname</label>
              <input
                type="text"
                className="form-control"
                id="hostname"
                value={hostname}
                onChange={(e) => setHostname(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="minimumNights" className="form-label">Minimum Nights</label>
              <input
                type="number"
                className="form-control"
                id="minimumNights"
                value={minimumNights}
                onChange={(e) => setMinimumNights(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handlePost}
            >
              Új szállás létrehozása
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
