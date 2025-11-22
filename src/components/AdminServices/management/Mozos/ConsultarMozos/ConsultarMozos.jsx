import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TablaMozos from './TablaMozos/TablaMozos';
import mozosService from '../../../../../services/mozos.services';

function ConsultarMozos() {
  const [mozos, setMozos] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchMozos();
  }, []);

  const fetchMozos = async () => {
    try {
      const response = await mozosService.getAllMozos();
      setMozos(response);
    } catch (error) {
      console.error('Error fetching mozos:', error);
    }
  };

  const fetchFilteredMozos = async (filterText) => {
    try {
      const response = await mozosService.getMozosByFilter(filterText);
      setMozos(response);
    } catch (error) {
      console.error('Error fetching filtered mozos:', error);
    }
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
    if (value) {
      fetchFilteredMozos(value);
    } else {
      fetchMozos();
    }
  };

  const handleNuevoMozo = async (data) => {
    try {
      const response = await mozosService.postNuevoMozo(data);
      console.log('Nuevo mozo creado:', response);
      // Actualizar la lista de mozos después de la creación
      fetchMozos();
      alert('Mozo creado exitosamente');
    } catch (error) {
      console.error('Error al crear el mozo:', error);
      alert('Error al crear el mozo. Consulte la consola para más detalles.');
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <h2>Gestión de Mozos</h2>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
          <Link className="btn btn-primary me-md-2" to="/crear-mozos">Crear Mozo</Link>
          <Link to="/mozos" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left"></i> Volver
          </Link>
        </div>
        <p>Seleccione una acción para gestionar los mozos.</p>

        <div className="mt-4">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Buscar por nombre"
            value={searchText}
            onChange={handleSearchChange}
          />
          <h3>Listado de Mozos</h3>
          <TablaMozos mozos={mozos} fetchMozos={fetchMozos} /> {/* Pasar fetchMozos como prop */}
        </div>
      </div>
    </div>
  );
}

export default ConsultarMozos;