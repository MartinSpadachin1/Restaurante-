import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Restaurantes = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container mt-5">
        <h2>Gestión Restaurantes</h2>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
          <Link className="btn btn-primary me-md-2" to="/crear-restaurantes">
            Crear Restaurantes
          </Link>
          <Link className="btn btn-secondary me-md-2" to="/consultar-restaurantes">
            Consultar Restaurantes
          </Link>
        </div>
        <p>Seleccione una acción para gestionar los restaurantes.</p>
        <div>
          <button className="btn btn-primary me-md-2" onClick={()=>{navigate(-1)}}>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Restaurantes;
