import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const DeleteCard = ({ data, setData, token }) => {
  const { id } = useParams();
  const card = data.find((item) => item.id === parseInt(id));

  const handleDelete = async () => {
    try {
      await axios.delete(`http://szallasjwt.sulla.hu/data/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData((prevData) => prevData.filter((item) => item.id !== id));
      alert('Sikeres törlés');
    } catch (error) {
      alert('Hiba a törlés során');
    }
  };

  if (!card) {
    return <p>Nem létezik ilyen szállás</p>;
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2>Szállás törlése</h2>
        </div>
        <div className="card-body">
          <p>Biztosan törölni akarja?</p>
          <p><strong>{card.name}</strong></p>
          <button className="btn btn-danger" onClick={handleDelete}>Törlés</button>
        </div>
      </div>
    </div>
  );
};
