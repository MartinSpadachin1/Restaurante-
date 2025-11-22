import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TablaRestaurantes from './TablaRestaurantes/TablaRestaurantes';
import restaurantesService from '../../../../../services/restaurantes.services.js';

export default function ConsultarRestaurantes() {
    const [restaurantes, setRestaurantes] = useState([]);

    useEffect(() => {
        fetchRestaurantes();
    }, []);

    const fetchRestaurantes = async () => {
        try {
            const response = await restaurantesService.getAllRestaurantes();
            setRestaurantes(response);
        } catch (error) {
            console.error('Error fetching restaurantes:', error);
        }
    };

    return (
        <div>
            <div className="container mt-5">
                <h2>Gestión de Restaurantes</h2>
                <div className="d-flex justify-content-end mb-4">
                    <Link className="btn btn-primary me-2" to="/crear-restaurantes">Crear Restaurantes</Link>
                    <Link to="/restaurantes" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left"></i> Volver
                    </Link>
                </div>
                <p>Seleccione una acción para gestionar los restaurantes.</p>

                <div className="mt-4">
                    <h3>Listado de Restaurantes</h3>
                    <TablaRestaurantes restaurantes={restaurantes} fetchRestaurantes={fetchRestaurantes} />
                </div>
            </div>
        </div>
    );
}
