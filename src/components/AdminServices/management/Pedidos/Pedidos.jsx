import React from 'react';
import { Link } from 'react-router-dom';

const Pedidos = () => {

    return (
        <div>
          <div className="container mt-5">
            <h2>Gestión Pedidos</h2>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
            <Link className="btn btn-primary me-md-2" to="/consultar-pedidos">Consultar Pedidos</Link>
            </div>
            <p>Seleccione una acción para gestionar los pedidos.</p>
            <div>
            <Link className="btn btn-primary me-md-2" to="/administrar">Volver</Link> 
            </div>
          </div>
        </div>
      );
}

export default Pedidos;
