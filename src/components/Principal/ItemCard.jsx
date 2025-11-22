import React, { useState, useEffect } from 'react';
import detalleService from '../../services/detallesPedidos.services';

const ItemCard = ({ item, codigo, fetchDetalles }) => {
  const [cantidad, setCantidad] = useState(0);
  const [initialCantidad, setInitialCantidad] = useState(0);
  const [detalleExistente, setDetalleExistente] = useState(false);

  useEffect(() => {
    const fetchCantidad = async () => {
      const detalle = await detalleService.getUnDetalleDePedido(codigo, item.idItem);
      if (detalle) {
        setCantidad(detalle.cantidad);
        setInitialCantidad(detalle.cantidad);
        setDetalleExistente(true);
      } else {
        setCantidad(0);
        setInitialCantidad(0);
        setDetalleExistente(false);
      }
    };

    fetchCantidad();
  }, [codigo, item.idItem]);

  const handleCantidadChange = (delta) => {
    const nuevaCantidad = cantidad + delta;
    setCantidad(nuevaCantidad >= 0 ? nuevaCantidad : 0);
  };

  const handleAgregarItem = async () => {
    console.log(`Agregar item: ${item.nombre} con cantidad: ${cantidad}`);
    // Lógica para agregar el item
    const newDetalle = {
        idPedido: codigo,
        idItem: item.idItem,
        cantidad: cantidad,
        precioUnitario: item.precio
    }
    const data = await detalleService.postNuevoDetalle(newDetalle);
    setInitialCantidad(cantidad);
    setDetalleExistente(true);
    fetchDetalles(); //renderizamos
    alert(`Item: ${item.nombre} agregado con cantidad: ${cantidad}`)
  };

  const handleEliminarItem = async () => {
    console.log(`Eliminar item: ${item.nombre}`);
    // Lógica para eliminar el item
    const data = await detalleService.deleteDetalle(codigo, item.idItem)
    setCantidad(0);
    setDetalleExistente(false);
    fetchDetalles(); //renderizamos
    alert(`Item ${item.nombre} eliminado.`)
  };

  const handleModificarItem = async () => {
    console.log(`Modificar item: ${item.nombre} con cantidad: ${cantidad}`);
    // Lógica para modificar el item
    const data = await detalleService.updateDetalle(codigo, item.idItem, {cantidad: cantidad})
    setInitialCantidad(cantidad)
    fetchDetalles(); //renderizamos
    alert(`Cantidad de item ${item.nombre} modificada a cantidad ${cantidad}`)
  };

  return (
    <div className="col-md-6 mb-3">
      <div className="card h-100">
        <div className="row g-0 align-items-center">
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <img
              src={item.imgURL}
              className="img-fluid rounded-start"
              alt={item.nombre}
              style={{ maxHeight: '150px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title">{item.nombre}</h5>
                <p className="card-text">{item.descrip}</p>
                <p className="card-text"><strong>Precio:</strong> ${item.precio}</p>
              </div>
              <div>
                <div className="input-group mb-3">
                  <button className="btn btn-outline-secondary" type="button" onClick={() => handleCantidadChange(-1)}>-</button>
                  <input type="text" className="form-control text-center" value={cantidad} readOnly />
                  <button className="btn btn-outline-secondary" type="button" onClick={() => handleCantidadChange(1)}>+</button>
                </div>
                {detalleExistente ? (
                  <>
                    {cantidad !== initialCantidad && (
                      <button className="btn btn-primary me-2" onClick={handleModificarItem}>Modificar</button>
                    )}
                    <button className="btn btn-danger" onClick={handleEliminarItem}>Eliminar</button>
                  </>
                ) : (
                  cantidad > 0 && (
                    <button className="btn btn-primary" onClick={handleAgregarItem}>Agregar</button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
