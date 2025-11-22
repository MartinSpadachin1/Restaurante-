import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate} from 'react-router-dom';
import TablaDetalles from './TablaDetalles/TablaDetalles.jsx';
import detallesPedidosService from '../../../../../services/detallesPedidos.services.js';

export default function ConsultarDetalles() {
    const [detalles, setDetalles] = useState([]);
    const {codigo} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        fetchDetalles(codigo);
    }, []);

    const fetchDetalles = async (codigo) => {
        try {
            const response = await detallesPedidosService.getDetallesDePedido(codigo);
            setDetalles(response);
        } catch (error) {
            console.error('Error fetching Detalles:', error);
        }
    };

    return (
        <div>
            <div className="container mt-5">
                <h2>Gestión de Detalles de pedido #{codigo}</h2>
                <div className="d-flex justify-content-end mb-4">
                    <Link className="btn btn-primary me-2" to={`/crear-detalles/${codigo}`}>Crear Detalle</Link>
                    <button className="btn btn-outline-secondary" onClick={()=>{navigate(-1)}}>Volver</button>
                </div>
                <p>Seleccione una acción para gestionar los Detalles.</p>

                <div className="mt-4">
                    <h3>Listado de Detalles de pedido #{codigo}</h3>
                    <TablaDetalles detalles={detalles} fetchDetalles={fetchDetalles} />
                </div>
            </div>
        </div>
    );
} 
