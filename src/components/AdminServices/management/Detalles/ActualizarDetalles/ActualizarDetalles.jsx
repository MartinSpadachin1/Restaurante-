import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import detallesService from '../../../../../services/detallesPedidos.services.js';
import itemsService from '../../../../../services/items.services.js';

export default function ActualizarDetalle() {
    const { idPedido, idItem } = useParams();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [detalle, setDetalle] = useState(null);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetalle = async () => {
            try {
                const data = await detallesService.getUnDetalleDePedido(idPedido, idItem);
                setDetalle(data);
                reset(data); // Resetea el formulario con los datos del item
            } catch (error) {
                console.error('Error fetching detalle:', error);
            }
        };

        const obtenerItems = async () => {
            try {
                const data = await itemsService.getAllItems();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchDetalle();
        obtenerItems();
    }, [idPedido, idItem, reset]);

    const matchItem = (idItem) => {
        const item = items.find((i) => i.idItem === idItem);
        return item ? item.nombre : 'Item desconocido';
    };

    const onSubmit = async (data) => {
        try {
            const response = await detallesService.updateDetalle(idPedido, idItem, data);
            console.log('Detalle actualizado:', response);
            alert('Detalle actualizado exitosamente');
            navigate(`/consultar-detalles/${idPedido}`);
        } catch (error) {
            console.error('Error al actualizar el detalle:', error);
            alert('Error al actualizar el detalle. Consulte la consola para más detalles.');
        }
    };

    if (!detalle || items.length === 0) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <div className="container mt-5">
                <h2>Actualizar Detalle de pedido #{idPedido}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="idItem" className="form-label">Id Item:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="idItem"
                            disabled
                            value={matchItem(detalle.idItem)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cantidad" className="form-label">Cantidad:</label>
                        <input
                            type="number"
                            className={`form-control ${errors.cantidad ? 'is-invalid' : ''}`}
                            id="cantidad"
                            {...register('cantidad', { required: true, min: 1 })}
                        />
                        {errors.cantidad && <div className="invalid-feedback">Cantidad es requerida y debe ser mayor que 0.</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="precioUnitario" className="form-label">Precio Unitario:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="precioUnitario"
                            disabled
                            value={detalle.precioUnitario}
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary me-2">Actualizar Detalle</button>
                    <Link to={`/consultar-detalles/${idPedido}`} className="btn btn-secondary">Volver</Link>
                </form>
            </div>
        </div>
    );
}
