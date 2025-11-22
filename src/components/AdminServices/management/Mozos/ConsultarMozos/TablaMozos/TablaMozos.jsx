import React from 'react';
import { Link } from 'react-router-dom';
import mozosService from '../../../../../../services/mozos.services';

const TablaMozos = ({ mozos, fetchMozos }) => { // Recibir fetchMozos como prop

  const handleDelete = async (mozoId) => {
    try {
      await mozosService.deleteMozoPorId({ idMozo: mozoId });
      fetchMozos(); // Actualizar la lista de mozos después de la eliminación
      alert('Mozo eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el mozo:', error);
      alert('Error al eliminar el mozo. Consulte la consola para más detalles.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha de Ingreso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mozos.map(mozo => (
            <tr key={mozo.idMozo}>
              <td>{mozo.idMozo}</td>
              <td>{mozo.nombre}</td>
              <td>{formatDate(mozo.fechaIngreso)}</td>
              <td>
                <button className="btn btn-danger me-2" onClick={() => handleDelete(mozo.idMozo)}>Eliminar</button>
                <Link className="btn btn-warning me-2" to={`/actualizar-mozo/${mozo.idMozo}`}>Actualizar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaMozos;
