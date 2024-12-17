import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const DeleteCard = ({ data, setData, token }) => {
  const { id } = useParams();
  const card = data.find((item) => item.id === parseInt(id));

  const handleDelete = async () => {
    try {
      await axios.delete(`http://szallasjwt.sulla.hu/postszallas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData((prevData) => prevData.filter((item) => item.id !== id));
      alert('Card deleted successfully');
    } catch (error) {
      console.error('Failed to delete the card:', error);
      alert('Failed to delete the card');
    }
  };

  if (!card) {
    return <p>Card not found</p>;
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2>Delete Card</h2>
        </div>
        <div className="card-body">
          <p>Are you sure you want to delete the following card?</p>
          <p><strong>{card.name}</strong></p>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};
