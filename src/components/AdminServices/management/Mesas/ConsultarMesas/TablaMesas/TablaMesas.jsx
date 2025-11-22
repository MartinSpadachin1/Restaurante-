import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import mesasService from '../../../../../../services/mesas.services';
import mozosService from '../../../../../../services/mozos.services';
import restaurantesService from '../../../../../../services/restaurantes.services'; // Importa el servicio de restaurantes

const TablaMesa = () => {
  const [mesas, setMesas] = useState([]);
  const [mozos, setMozos] = useState([]);
  const [restaurantes, setRestaurantes] = useState([]);
  const [filtro, setFiltro] = useState({ idMozo: '', idResto: '' });

  useEffect(() => {
    fetchMesas();
    fetchMozos();
    fetchRestaurantes();
  }, []);

  const fetchMesas = async () => {
    try {
      const response = await mesasService.getAllMesas();
      setMesas(response);
    } catch (error) {
      console.error('Error fetching mesas:', error);
    }
  };

  const fetchMozos = async () => {
    try {
      const response = await mozosService.getAllMozos();
      setMozos(response);
    } catch (error) {
      console.error('Error fetching mozos:', error);
    }
  };

  const fetchRestaurantes = async () => {
    try {
      const response = await restaurantesService.getAllRestaurantes();
      setRestaurantes(response);
    } catch (error) {
      console.error('Error fetching restaurantes:', error);
    }
  };

  const handleDelete = async (mesaId, restoId) => {
    try {
      await mesasService.deleteMesaPorId(mesaId, restoId);
      fetchMesas(); // Actualiza la lista de mesas después de la eliminación
      alert('Mesa eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar la mesa:', error);
      alert('Error al eliminar la mesa. Consulte la consola para más detalles.');
    }
  };

  const getNombreMozo = (idMozo) => {
    const mozo = mozos.find(m => m.idMozo === idMozo);
    return mozo ? mozo.nombre : 'No asignado';
  };

  const getNombreRestaurante = (idResto) => {
    const restaurante = restaurantes.find(r => r.idResto === idResto);
    return restaurante ? restaurante.nombre : 'No asignado';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed - Name: ${name}, Value: ${value}`);
    setFiltro({ ...filtro, [name]: value });
  };

  const handleFiltrar = async (e) => {
    e.preventDefault();
    console.log('Filtrar button clicked');
    console.log('Filtro:', filtro);
    try {
      const mesasFiltradas = await mesasService.obtenerMesasFiltradas(filtro.idMozo, filtro.idResto);
      console.log('Mesas filtradas:', mesasFiltradas);
      setMesas(mesasFiltradas);
    } catch (error) {
      console.error('Error al filtrar mesas:', error);
    }
  };

  const handleLimpiarFiltros = () => {
    setFiltro({ idMozo: '', idResto: '' });
    fetchMesas(); // Vuelve a cargar todas las mesas sin filtros
  };

  return (
    <div className="table-responsive">
      <form onSubmit={handleFiltrar} className="mb-3">
        <div className="row">
          <div className="col">
            <label htmlFor="idMozo" className="form-label">Nombre Mozo:</label>
            <select id="idMozo" name="idMozo" className="form-select" value={filtro.idMozo} onChange={handleInputChange}>
              <option value="">Seleccionar Mozo</option>
              {mozos.map(mozo => (
                <option key={mozo.idMozo} value={mozo.idMozo}>{mozo.nombre}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <label htmlFor="idResto" className="form-label">Nombre Restaurante:</label>
            <select id="idResto" name="idResto" className="form-select" value={filtro.idResto} onChange={handleInputChange}>
              <option value="">Seleccionar Restaurante</option>
              {restaurantes.map(restaurante => (
                <option key={restaurante.idResto} value={restaurante.idResto}>{restaurante.nombre}</option>
              ))}
            </select>
          </div>
          <div className="col align-self-end">
            <button type="submit" className="btn btn-primary me-2">Filtrar</button>
            <button type="button" className="btn btn-secondary" onClick={handleLimpiarFiltros}>Limpiar</button>
          </div>
        </div>
      </form>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID Mesa</th>
            <th>Restaurante</th>
            <th>Cantidad de Personas</th>
            <th>Mozo</th>
            <th>¿Está Libre?</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mesas && mesas.map(mesa => (
            <tr key={`${mesa.nmesa}-${mesa.idResto}`}>
              <td>{mesa.nmesa}</td>
              <td>{getNombreRestaurante(mesa.idResto)}</td>
              <td>{mesa.cantPersonas}</td>
              <td>{getNombreMozo(mesa.idMozo)}</td>
              <td>{mesa.estaLibre ? 'Sí' : 'No'}</td>
              <td>
                <button className="btn btn-danger me-2" onClick={() => handleDelete(mesa.nmesa, mesa.idResto)}>Eliminar</button>
                <Link className="btn btn-warning me-2" to={`/actualizar-mesa/${mesa.nmesa}/${mesa.idResto}`}>Actualizar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaMesa;