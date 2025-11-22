import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import restaurantesService from '../../../../../../services/restaurantes.services.js';

export default function TablaRestaurantes({ restaurantes, fetchRestaurantes }) {

    const handleDelete = async (idResto) => {
        try {
            await restaurantesService.deleteRestaurante(idResto);
            fetchRestaurantes(); // Actualizar la lista de items después de la eliminación
            alert('Restaurante eliminado exitosamente');
        } catch (error) {
            console.error('Error al eliminar restaurante:', error);
            alert('Error al eliminar el restaurante. Consulte la consola para más detalles.');
        }
    };

    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Hora Apertura</th>
                        <th>Hora Cierre</th>
                        <th>Usuario</th>
                        <th>Direccion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurantes.map((restaurante) => (
                        <tr key={restaurante.idResto}>
                            <td>{restaurante.idResto}</td>
                            <td>{restaurante.nombre}</td>
                            <td>{restaurante.horaApertura}</td>
                            <td>{restaurante.horaCierre}</td>
                            <td>{restaurante.usuario}</td>
                            <td>{restaurante.direc}</td>
                            <td>
                                <div className='d-flex'>
                                <button className="btn btn-danger me-2" onClick={() => handleDelete(restaurante.idResto)}>Eliminar</button>
                                <Link className="btn btn-warning me-2" to={`/actualizar-restaurantes/${restaurante.idResto}`}>Actualizar</Link>
                                </div>                            
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
