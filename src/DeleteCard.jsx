import React from 'react';
import { useParams, Link } from 'react-router-dom';
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
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <h2 className="text-center mb-4">Szállás törlése</h2>
          <div className="card">
            <div className="card-header text-center">
              <p>Biztosan törölni akarja?</p>
            </div>
            <div className="card-body">
              <h2 className="text-center"><strong>{card.name}</strong></h2>
              <p className="card-text">Hostname: {card.hostname}</p>
              <p className="card-text">Location: {card.location}</p>
              <p className="card-text">Price: {card.price}</p>
              <p className="card-text">Minimum nights: {card.minimum_nights}</p>
              <div className="d-flex justify-content-center gap-3">
                <Link to="/getszallasok" className="btn btn-secondary">
                  Vissza
                </Link>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Törlés
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};