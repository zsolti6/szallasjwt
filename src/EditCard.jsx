import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const EditCard = ({ data, setData, token }) => {
  const { id } = useParams();
  const card = data.find((item) => item.id === parseInt(id));

  const [name, setName] = useState(card ? card.name : '');
  const [hostname, setHostname] = useState(card ? card.hostname : '');
  const [location, setLocation] = useState(card ? card.location : '');
  const [price, setPrice] = useState(card ? card.price : '');
  const [minimumNights, setMinimumNights] = useState(card ? card.minimum_nights : '');

  useEffect(() => {
    if (card) {
      setName(card.name);
      setHostname(card.hostname);
      setLocation(card.location);
      setPrice(card.price);
      setMinimumNights(card.minimum_nights);
    }
  }, [card]);

  const handleSubmit = async () => {
    const updatedData = { name, hostname, location, price, minimum_nights: minimumNights };
    try {
      const response = await axios.put(`http://szallasjwt.sulla.hu/postszallas/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update the state with the updated data
      setData((prevData) => prevData.map((item) => (item.id === id ? response.data : item)));
      alert('Card updated successfully');
    } catch (error) {
      console.error('Failed to update the card:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Card</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="hostname" className="form-label">Hostname</label>
          <input type="text" className="form-control" id="hostname" value={hostname} onChange={(e) => setHostname(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input type="text" className="form-control" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="minimumNights" className="form-label">Minimum Nights</label>
          <input type="number" className="form-control" id="minimumNights" value={minimumNights} onChange={(e) => setMinimumNights(e.target.value)} />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
      </form>
    </div>
  );
};
