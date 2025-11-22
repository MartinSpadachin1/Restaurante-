import React, { useEffect, useState } from 'react';
import { useParams, Link ,useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import pedidosService from '../../../../../services/pedidos.services.js';
import mesasService from '../../../../../services/mesas.services.js';
import moment from 'moment-timezone';

export default function ActualizarPedido() {
    const { codigo } = useParams();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [pedido, setPedido] = useState(null);
    const [mesas, setMesas] = useState([]); //seran las mesas correspondientes al idResto del pedido (se puede modificar la mesa pero solo si es del mismo resto)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPedido = async (codigo) => {
            try {
                const data = await pedidosService.getPedidoByCodigo(codigo);
                setPedido(data);
                reset(data); // Resetea el formulario con los datos del pedido
            } catch (error) {
                console.error('Error fetching pedido:', error);
            }
        };
        fetchPedido(codigo);
    }, [codigo, reset]); //revisar porque reset

    useEffect(()=> {
        const fetchMesas = async (idResto) => {
            try {
                const data = await mesasService.getAllMesasDeResto(idResto);
                setMesas(data);
            } catch (error) {
                console.error('Error fetching mesas:', error);
            }
        };
        if (pedido && pedido.idResto) {
            fetchMesas(pedido.idResto);
        }
    }, [pedido])

    const onSubmit = async (data) => {
        try {
            // Modificamos el formato de la fecha
            //if (data.fechaHoraCreacion) {
            //    data.fechaHoraCreacion = moment(data.fechaHoraCreacion).tz('America/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss')
            //}
            const response = await pedidosService.updatePedido(codigo, data);
            console.log('Pedido actualizado:', response);
            alert('Pedido actualizado exitosamente');
            navigate('/consultar-pedidos');
        } catch (error) {
            console.error('Error al actualizar el pedido:', error);
            alert('Error al actualizar el pedido. Consulte la consola para más detalles.');
        }
    };

    if (!pedido) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <div className="container mt-5">
                <h2>Actualizar Pedido</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="codigo" className="form-label">Codigo:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="codigo"
                            value={pedido.codigo}
                            disabled
                        />
                    
                    <label htmlFor="idResto" className="form-label">Id Resto:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="idResto"
                            value={pedido.idResto}
                            disabled
                        />

                    <label htmlFor="fechaHoraCreacion" className="form-label">Fecha-Hora Creacion:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="fechaHoraCreacion"
                            value={pedido.fechaHoraCreacion}
                            disabled
                        />

                    <label htmlFor="nmesa">Seleccione nuevo N° Mesa</label>
                    <select className="form-select" id='nmesa' {...register("nmesa")}>
                        <option value={pedido.nmesa} disabled>{pedido.nmesa}</option>
                        {mesas.filter(mesa => mesa.nmesa !== pedido.nmesa).map((mesa) => (
                            <option key={mesa.nmesa} value={mesa.nmesa}>
                                {mesa.nmesa}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="fechaHoraCobro" className="form-label">Ingrese la nueva fecha-hora de Cobro:</label>
                        <input
                            type="datetime-local"
                            className={`form-control`}
                            id="fechaHoraCobro"
                            {...register('fechaHoraCobro')}
                        />
                    
                    <label htmlFor="total" className="form-label">Total:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="total"
                            value={pedido.total}
                            disabled
                        />
                        
                    <br></br>
                    <button type="submit" className="btn btn-primary me-2">Actualizar Pedido</button>
                    <Link to="/consultar-pedidos" className="btn btn-secondary">Volver</Link>
                </form>
            </div>
        </div>
    );
}
