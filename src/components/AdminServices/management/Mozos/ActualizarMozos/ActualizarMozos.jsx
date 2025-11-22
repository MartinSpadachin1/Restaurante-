import React, { useEffect, useState } from 'react';
import { useParams, Link ,useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import mozosService from '../../../../../services/mozos.services';

export default function ActualizarMozos() {
    const { idMozo } = useParams();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [mozo, setmozo] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchMozo = async (idMozo) => {
            try {
                const data = await mozosService.getMozoByID(idMozo);
                if (data.fechaIngreso) {
                    data.fechaIngreso = new Date(data.fechaIngreso).toISOString().split('T')[0];
                }
                setmozo(data);
                reset(data); // Resetea el formulario con los datos del mozo
            } catch (error) {
                console.error('Error fetching mozo:', error);
            }
        };

        fetchMozo(idMozo);
    }, [idMozo, reset]);

    const onSubmit = async (data) => {
        try {
            const response = await mozosService.updateMozo(idMozo, data);
            console.log('Mozo actualizado:', response);
            alert('Mozo actualizado exitosamente');
            navigate('/consultar-mozos');
        } catch (error) {
            console.error('Error al actualizar el mozo:', error);
            alert('Error al actualizar el mozo. Consulte la consola para más detalles.');
        }
    };

    if (!mozo) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <div className="container mt-5">
                <h2>Actualizar Mozo</h2>
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
                        <label htmlFor="fechaIngreso" className="form-label">Fecha de Ingreso (opcional):</label>
                        <input
                            type="date"
                            className={`form-control ${errors.fechaIngreso ? 'is-invalid' : ''}`}
                            id="fechaIngreso"
                            {...register('fechaIngreso')}
                        />
                        {errors.fechaIngreso && <div className="invalid-feedback">{errors.fechaIngreso.message}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary me-2">Actualizar Mozo</button>
                    <Link to="/consultar-mozos" className="btn btn-secondary">Volver</Link>
                </form>
            </div>
        </div>
    );
}