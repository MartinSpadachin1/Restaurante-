import React, { useEffect, useState } from 'react';
import { useParams, Link ,useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import restaurantesService from '../../../../../services/restaurantes.services';

export default function ActualizarRestaurante() {
    const { idResto } = useParams();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [restaurante, setRestaurante] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchRestaurante = async (idResto) => {
            try {
                const data = await restaurantesService.getRestauranteByID(idResto);
                setRestaurante(data);
                reset(data); // Resetea el formulario con los datos del Restaurante
            } catch (error) {
                console.error('Error fetching restaurante:', error);
            }
        };

        fetchRestaurante(idResto);
    }, [idResto, reset]);

    const onSubmit = async (data) => {
        try {
            const response = await restaurantesService.updateRestaurante(idResto, data)
            console.log('Restaurante actualizado:', response);
            alert('Restaurante actualizado exitosamente');
            navigate('/consultar-restaurantes');
        } catch (error) {
            console.error('Error al actualizar el restaurante:', error);
            alert('Error al actualizar el restaurante. Consulte la consola para más detalles.');
        }
    };

    if (!restaurante) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <div className="container mt-5">
                <h2>Actualizar Restaurante</h2>
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
                        <label htmlFor="horaApertura" className="form-label">horaApertura:</label>
                        <input
                            type="time"
                            className={`form-control ${errors.horaApertura ? 'is-invalid' : ''}`}
                            id="horaApertura"
                            {...register('horaApertura', { required: true })}
                        />
                        {errors.horaApertura && <div className="invalid-feedback">horaApertura es requerido.</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="horaCierre" className="form-label">horaCierre:</label>
                        <input
                            type="time"
                            className={`form-control ${errors.horaCierre ? 'is-invalid' : ''}`}
                            id="horaCierre"
                            {...register('horaCierre', { required: true })}
                        />
                        {errors.horaCierre && <div className="invalid-feedback">horaCierre es requerida y debe tener un máximo de 100 caracteres.</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="usuario" className="form-label">usuario:</label>
                        <input
                            type="text"
                            className={`form-control ${errors.usuario ? 'is-invalid' : ''}`}
                            id="usuario"
                            {...register('usuario', { required: true })}
                        />
                        {errors.usuario && <div className="invalid-feedback">usuario es requerido.</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="direc" className="form-label">direccion:</label>
                        <input
                            type="text"
                            className={`form-control ${errors.direc ? 'is-invalid' : ''}`}
                            id="direc"
                            {...register('direc', { required: true })}
                        />
                        {errors.direc && <div className="invalid-feedback">direccion es requerida.</div>}
                    </div>
                    
                    <button type="submit" className="btn btn-primary me-2">Actualizar Restaurante</button>
                    <Link to="/restaurantes" className="btn btn-secondary">Volver</Link>
                </form>
            </div>
        </div>
    );
}
