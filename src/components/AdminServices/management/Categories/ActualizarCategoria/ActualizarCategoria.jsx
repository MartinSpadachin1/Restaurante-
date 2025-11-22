import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import categoriasService from '../../../../../services/categorias.services';

export default function ActualizarCategoria() {
    const { idCat } = useParams();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [categoria, setCategoria] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCategoria = async (idCat) => {
            try {
                const data = await categoriasService.getCategoriaByID(idCat);
                setCategoria(data);
                reset(data); // Resetea el formulario con los datos de la categoría
            } catch (error) {
                console.error('Error fetching categoria:', error);
            }
        };
        fetchCategoria(idCat);
    }, [idCat, reset]);

    const onSubmit = async (data) => {
        try {
            const response = await categoriasService.updateCategoria(idCat, data.nombre);
            console.log('Categoria actualizada:', response);
            alert('Categoria actualizada exitosamente');
            navigate('/consultar-categorias');
        } catch (error) {
            console.error('Error al actualizar la categoría:', error);
            alert('Error al actualizar la categoria. Consulte la consola para más detalles.');
        }
    };

    if (!categoria) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <div className="container mt-5">
                <h2>Actualizar Categoría</h2>
                <h3>Nombre Actual: {categoria.nombre}</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Ingrese el nuevo nombre:</label>
                        <input
                            type="text"
                            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                            id="nombre"
                            {...register('nombre', { required: true, maxLength: 30 })}
                        />
                        {errors.nombre && <div className="invalid-feedback">Nombre es requerido y debe tener un máximo de 30 caracteres.</div>}
                    </div>
                    <button type="submit" className="btn btn-primary me-2">Actualizar Categoria</button>
                    <Link to="/categorias" className="btn btn-secondary">Volver</Link>
                </form>
            </div>
        </div>
    );
}
