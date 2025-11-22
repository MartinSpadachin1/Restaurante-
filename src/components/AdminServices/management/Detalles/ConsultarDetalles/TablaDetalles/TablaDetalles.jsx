import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import detallesPedidosServices from '../../../../../../services/detallesPedidos.services.js';
import itemsService from '../../../../../../services/items.services.js';
export default function TablaDetalles({ detalles, fetchDetalles }) {
    const [items,setItems]= useState([]);
    useEffect(() => {

        const obtenerItems = async () => {
            try {
                const data = await itemsService.getAllItems();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        obtenerItems();
    }, []);
    const matchItem = (idItem) => {
        const item = items.find((i) => i.idItem === idItem);
        return item ? item.nombre : 'Item desconocido';
    };

    const handleDelete = async (idPedido, idItem) => {
        try {
            await detallesPedidosServices.deleteDetalle(idPedido, idItem);
            fetchDetalles(idPedido); // Actualizar la lista de items después de la eliminación
            alert('Detalle eliminado exitosamente');
        } catch (error) {
            console.error('Error al eliminar detalle:', error);
            alert('Error al eliminar el detalle. Consulte la consola para más detalles.');
        }
    };

    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID item</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>SubTotal</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {detalles && detalles.map((detalle) => (
                        <tr key={detalle.idItem}>
                            <td>{matchItem(detalle.idItem)}</td>
                            <td>{detalle.cantidad}</td>
                            <td>{detalle.precioUnitario}</td>
                            <td>{detalle.subTotal}</td>
                            <td>
                                <div className='d-flex'>
                                <button className="btn btn-danger me-2" onClick={() => handleDelete(detalle.idPedido, detalle.idItem)}>Eliminar</button>
                                <Link className="btn btn-warning me-2" to={`/actualizar-detalles/${detalle.idPedido}/${detalle.idItem}`}>Actualizar</Link>
                                </div>                            
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
