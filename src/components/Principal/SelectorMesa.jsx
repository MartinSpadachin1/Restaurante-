import React, { useEffect, useState } from 'react';
import mesasService from '../../services/mesas.services.js';
import pedidosService from '../../services/pedidos.services.js';
import { Mesa } from './Mesa.jsx';
import { useParams } from 'react-router-dom';
import restaurantesService from '../../services/restaurantes.services.js';

export const SelectorMesa = () => {
    const [mesas, setMesas] = useState([]);
    const [pedidosNoFinalizados, setPedidosNoFinalizados] = useState([]);
    const { idResto } = useParams();
    const [resto, setResto] = useState(null);

    useEffect(() => {
        fetchResto(idResto);
        fetchPedidos();
        fetchMesas();
    }, []);

    const fetchResto = async (idResto) => {
        const data = await restaurantesService.getRestauranteByID(idResto);
        setResto(data);
    };

    const fetchMesas = async () => {
        const data = await mesasService.getAllMesasDeResto(idResto);
        setMesas(data);
    };

    const fetchPedidos = async () => {
        const data = await pedidosService.getPedidosNoFinalizados(idResto);
        setPedidosNoFinalizados(data);
    };

    return (
        <div className="container">
            {resto &&
                <>
                    <div className="row mb-4">
                        <h1>{resto.nombre}</h1>

                        <p><strong>Horario:</strong> {resto.horaApertura} - {resto.horaCierre}</p>
                        <h2>Gestión de mesas</h2>
                        <hr />
                    </div>
                    
                </>
            }
            
            <div className="row">
                {mesas.map((mesa) => (
                    <div key={mesa.nmesa} className="col-md-4 mb-4">
                        <Mesa idResto={idResto} mesa={mesa} pedidos={pedidosNoFinalizados} fetchPedidos={fetchPedidos} />
                    </div>
                ))}
            </div>
        </div>
    );
};
