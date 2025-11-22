import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import itemsServices from '../../../../../../services/items.services';
import categoriasService from '../../../../../../services/categorias.services';

export default function TablaItems({ items, fetchItems }) {
    const [categorias, setCategorias] = useState([]); // Inicializar como un array vacío

    const handleDelete = async (itemId) => {
        try {
            await itemsServices.deleteItemPorId({ idItem: itemId });
            fetchItems(); // Actualizar la lista de items después de la eliminación
            alert('Item eliminado exitosamente');
        } catch (error) {
            console.error('Error al eliminar item:', error);
            alert('Error al eliminar el item. Consulte la consola para más detalles.');
        }
    };

    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const response = await categoriasService.getAllCategorias();
                setCategorias(response);
            } catch (error) {
                console.error('Error fetching categorias:', error);
            }
        };
        obtenerCategorias();
    }, []);

    const matchCategoria = (catId) => {
        const categoria = categorias.find((c) => c.idCat === catId);
        return categoria ? categoria.nombre : 'Categoría desconocida';
    };

    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Categoria</th>
                        <th>Imagen</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.idItem}>
                            <td>{item.idItem}</td>
                            <td>{item.nombre}</td>
                            <td>{matchCategoria(item.categoria)}</td>
                            <td>
                                <img src={item.imgURL} alt={item.nombre} style={{ maxWidth: '100px', height: 'auto' }} />
                            </td>
                            <td>{item.descrip}</td>
                            <td>{item.precio}</td>
                            <td>
                                <div className='d-flex'>
                                <button className="btn btn-danger me-2" onClick={() => handleDelete(item.idItem)}>Eliminar</button>
                                <Link className="btn btn-warning me-2" to={`/actualizar-items/${item.idItem}`}>Actualizar</Link>
                                </div>                            
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
