import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const ViewCard = ({ token }) => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`http://szallasjwt.sulla.hu/data/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCard(response.data);
      } catch (err) {
        setError('Nem tudom megjeleníteni');
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id, token]);

  if (loading) {
    return <p>Betöltés...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!card) {
    return <p>Nem található a szállás.</p>;
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2>{card.name}</h2>
        </div>
        <div className="card-body">
          <p className="card-text">Hostname: {card.hostname}</p>
          <p className="card-text">Location: {card.location}</p>
          <p className="card-text">Price: {card.price}</p>
          <p className="card-text">Minimum nights: {card.minimum_nights}</p>
        </div>
      </div>
    </div>
  );
};
