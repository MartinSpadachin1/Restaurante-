import React from "react";
import { Link } from "react-router-dom";

export default function Restaurante({ restaurante }) {
  return (
    <div>
      <Link
        to={`/consultar-mesas/resto/${restaurante.idResto}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="card" style={{ width: "21rem" }}>
          <div className="card-body text-center">
            {restaurante ? (
              <div className="d-flex flex-column align-items-center">
                <h6 className="display-7 mb-3" style={{ fontWeight: 'bold', marginTop: '10px' }}>{restaurante.nombre}</h6>
                <p className="mb-1">Horario: {restaurante.horaApertura} - {restaurante.horaCierre}</p>
                <p className="mb-0">Dirección: {restaurante.direc}</p>
                <div className="mt-3" style={{ width: "12rem" }}>
                  <Link
                    to={`/consultar-mesas/resto/${restaurante.idResto}`}
                    className="btn btn-primary me-2"
                    style={{ width: "10rem" }}
                  >
                    Iniciar Servicio
                  </Link>
                </div>
              </div>
            ) : (
              <h1>No se encuentra el restaurante</h1>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
