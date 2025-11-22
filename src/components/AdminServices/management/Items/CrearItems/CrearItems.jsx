import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import itemsService from '../../../../../services/items.services';
import categoriasService from '../../../../../services/categorias.services';

export default function CrearItems() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [categorias, setCategorias] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await itemsService.postNuevoItem(data);
            console.log('Nuevo item creado:', response);
            alert('Item creado exitosamente');
            navigate('/consultar-items');
            reset();
        } catch (error) {
            console.error('Error al crear el item', error);
            alert('Error al crear el item. Consulte la consola para más detalles.');
        }
    };

    useEffect(() => {
        const fetchCategorias = async () => {
            setIsLoading(true);
            try {
                const data = await categoriasService.getAllCategorias();
                setCategorias(data);
            } catch (error) {
                console.error('Error fetching categorias:', error);
                // Aquí podríamos manejar el error de forma más amigable al usuario, por ejemplo, mostrando un mensaje de error en la interfaz.
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategorias();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Crear Item</h2>
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
                        {...register('precio', { required: true, min: 0, validate: value => !isNaN(parseFloat(value)) || 'Debe ser un número' })}
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
                        {...register('imgURL', {
                            required: true,
                            pattern: {
                                value: /^https?:\/\/.*/,
                                message: 'Debe ser una URL válida'
                            }
                        })}
                    />
                    {errors.imgURL && <div className="invalid-feedback">{errors.imgURL.message || 'URL de la Imagen es requerida.'}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="categoria" className="form-label">Categoría:</label>
                    <select
                        className={`form-control ${errors.categoria ? 'is-invalid' : ''}`}
                        id="categoria"
                        {...register('categoria', { required: true })}
                    >
                        <option value="">Seleccione una categoría</option>
                        {categorias.map(categoria => (
                            <option key={categoria.idCat} value={categoria.idCat}>{categoria.nombre}</option>
                        ))}
                    </select>
                    {errors.categoria && <div className="invalid-feedback">Categoría es requerida.</div>}
                </div>
                <button type="submit" className="btn btn-primary me-2">Crear Item</button>
                <Link to="/items" className="btn btn-secondary">Volver</Link>
            </form>
            {isLoading && <p>Cargando categorías...</p>}
        </div>
    );
}