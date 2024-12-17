import React from 'react';
import { useParams } from 'react-router-dom';

export const ViewCard = ({ data }) => {
  const { id } = useParams();
  const card = data.find((item) => item.id === parseInt(id));

  if (!card) {
    return <p>Card not found</p>;
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
