import React, { useEffect, useState } from "react";
import Restaurante from "./Restaurante";
import restaurantesService from "../../services/restaurantes.services";
import Navbar from "../shared/Navbar/Navbar";

export default function Principal() {
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    const fetchRestaurantes = async () => {
      try {
        const response = await restaurantesService.getAllRestaurantes();
        setRestaurantes(response);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurantes();
  }, []);

  return (
    <div className="container">
        <h2 className="text-center">Bienvenido...</h2>
        <h4 className="text-center">Seleccione una sucursal</h4>
        <hr></hr>
      <div className="row">
        {restaurantes.map((restaurante) => (
          <div key={restaurante.idResto} className="col-md-4 mb-4">
            <Restaurante restaurante={restaurante} />
          </div>
        ))}
      </div>
    </div>
  );
}
