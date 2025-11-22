import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TablaMesa from './TablaMesas/TablaMesas';
import mesasService from '../../../../../services/mesas.services';

function Mesas() {
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    fetchMesa();
  }, []);

  const fetchMesa = async () => {
    try {
      const response = await mesasService.getAllMesas();
      console.log(response);
      setMesas(response);
    } catch (error) {
      console.error('Error fetching mozos:', error);
    }
  };

  const handleNuevaMesa = async (data) => {
    try {
      const response = await mesasService.postNuevaMesa(data);
      console.log('Nueva mesa creada:', response);
      // Actualizar la lista de mesas después de la creación
      fetchMesa();
      alert('Mesa creada exitosamente');
    } catch (error) {
      console.error('Error al crear la mesa:', error);
      alert('Error al crear la mesa. Consulte la consola para más detalles.');
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <h2>Gestión de Mesas</h2>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
          <Link className="btn btn-primary me-md-2" to="/crear-mesas">Crear Mesa</Link>
          <Link to="/mesas" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left"></i> Volver
                    </Link>
        </div>
        <p>Seleccione una acción para gestionar las mesas.</p>

        <div className="mt-4">
          <h3>Listado de Mesas</h3>
          <TablaMesa mesas={mesas} fetchMesa={fetchMesa} /> {/* Pasar fetchMozos como prop */}
        </div>
      </div>
    </div>
  );
}

export default Mesas;