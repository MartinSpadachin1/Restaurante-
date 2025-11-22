import React, { useEffect, useState } from 'react';
import itemsService from '../../services/items.services.js';

const DetalleCard = ({ idItem, cantidad }) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    const fetchedItem = await itemsService.getItemByID(idItem);
    setItem(fetchedItem);
  };

  if (!item) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="card border mb-3" style={{ maxWidth: '18rem' }}>
      <div className="row g-0">
        <div className="col-md-3">
          <img
            src={item.imgURL}
            style={{ maxWidth: '80px', maxHeight: '80px' }}
            className="img-thumbnail"
            alt={`Foto de ${item.nombre}`}
          />
        </div>
        <div className="col-md-9">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title fs-6 mb-0">{item.nombre}</h5>
              <div className="bg-light p-2 ms-2" style={{ whiteSpace: 'nowrap' }}>
                <small className="text-muted">Cantidad: {cantidad}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleCard;
