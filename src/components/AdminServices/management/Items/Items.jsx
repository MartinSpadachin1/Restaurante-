import React from "react";
import { Link } from "react-router-dom";
const Items = () => {
  return (
    <div>
      <div className="container mt-5">
        <h2>Gestión Items</h2>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
          <Link className="btn btn-primary me-md-2" to="/crear-items">
            Crear Items
          </Link>
          <Link className="btn btn-secondary me-md-2" to="/consultar-items">
            Consultar Items
          </Link>
        </div>
        <p>Seleccione una acción para gestionar los items.</p>
        <div>
          <Link className="btn btn-primary me-md-2" to="/administrar">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Items;
