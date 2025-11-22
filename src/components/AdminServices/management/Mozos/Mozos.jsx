import React from "react";
import { Link } from "react-router-dom";

const Mozos = () => {
  return (
    <div>
      <div className="container mt-5">
        <h2>Gestión de Mozos</h2>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
          <Link className="btn btn-primary me-md-2" to="/crear-mozos">
            Crear Mozo
          </Link>
          <Link className="btn btn-secondary me-md-2" to="/consultar-mozos">
            Consultar Mozos
          </Link>
        </div>
        <p>Seleccione una acción para gestionar los mozos.</p>
        <div>
          <Link className="btn btn-primary me-md-2" to="/administrar">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Mozos;
