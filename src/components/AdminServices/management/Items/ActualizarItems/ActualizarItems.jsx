import React, { useEffect, useState } from 'react';
import { useParams, Link ,useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import categoriasService from '../../../../../services/categorias.services';
import itemsService from '../../../../../services/items.services';

export default function ActualizarItem() {
    const { idItem } = useParams();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [item, setItem] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchItem = async (idItem) => {
            try {
                const data = await itemsService.getItemByID(idItem);
                setItem(data);
                reset(data); // Resetea el formulario con los datos del item
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };

        const fetchCategorias = async () => {
            try {
                const data = await categoriasService.getAllCategorias();
                setCategorias(data);
            } catch (error) {
                console.error('Error fetching categorias:', error);
            }
        };

        fetchItem(idItem);
        fetchCategorias();
    }, [idItem, reset]);

    const onSubmit = async (data) => {
        try {
            const response = await itemsService.updateItem(idItem, data);
            console.log('Item actualizado:', response);
            alert('Item actualizado exitosamente');
            navigate('/consultar-items');
        } catch (error) {
            console.error('Error al actualizar el item:', error);
            alert('Error al actualizar el item. Consulte la consola para más detalles.');
        }
    };

    if (!item) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <div className="container mt-5">
                <h2>Actualizar Item</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre:</label>
                        <input
                            type="text"
                            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                            id="nombre"
                            {...register('nombre', { required: true, maxLength: 30 })}
                        />
                        {errors.nombre && <div className="invalid-feedback">Nombre es requerido y debe tener un máximo de 30 caracteres.</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="precio" className="form-label">Precio:</label>
                        <input
                            type="number"
                            className={`form-control ${errors.precio ? 'is-invalid' : ''}`}
                            id="precio"
                            {...register('precio', { required: true })}
                        />
                        {errors.precio && <div className="invalid-feedback">Precio es requerido.</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descrip" className="form-label">Descripción:</label>
                        <input
                            type="text"
                            className={`form-control ${errors.descrip ? 'is-invalid' : ''}`}
                            id="descrip"
                            {...register('descrip', { required: true, maxLength: 100 })}
                        />
                        {errors.descrip && <div className="invalid-feedback">Descripción es requerida y debe tener un máximo de 100 caracteres.</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="imgURL" className="form-label">URL de la Imagen:</label>
                        <input
                            type="text"
                            className={`form-control ${errors.imgURL ? 'is-invalid' : ''}`}
                            id="imgURL"
                            {...register('imgURL', { required: true })}
                        />
                        {errors.imgURL && <div className="invalid-feedback">URL de la Imagen es requerida.</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categoria" className="form-label">Categoría:</label>
                        <select
                            className={`form-control ${errors.categoria ? 'is-invalid' : ''}`}
                            id="categoria"
                            {...register('categoria', { required: true })}
                        >
                            {categorias.map(categoria => (
                                <option key={categoria.idCat} value={categoria.idCat}>{categoria.nombre}</option>
                            ))}
                        </select>
                        {errors.categoria && <div className="invalid-feedback">Categoría es requerida.</div>}
                    </div>
                    <button type="submit" className="btn btn-primary me-2">Actualizar Item</button>
                    <Link to="/items" className="btn btn-secondary">Volver</Link>
                </form>
            </div>
        </div>
    );
}
