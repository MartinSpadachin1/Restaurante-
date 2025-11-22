import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import mesasService from '../../../../../services/mesas.services';
import mozosService from '../../../../../services/mozos.services';

export default function ActualizarMesas() {
    const { nmesa, idResto } = useParams();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const [mesa, setMesa] = useState(null);
    const [mozos, setMozos] = useState([]);

    useEffect(() => {
        const fetchMesa = async (nmesa, idResto) => {
            try {
                const data = await mesasService.getMesaByID(nmesa, idResto);
                setMesa(data);
                reset(data); // Resetea el formulario con los datos de la mesa
            } catch (error) {
                console.error('Error fetching mesa:', error);
            }
        };

        fetchMesa(nmesa, idResto);
    }, [nmesa, idResto, reset]);

    useEffect(() => {
        const fetchMozos = async () => {
            try {
                const response = await mozosService.getAllMozos();
                setMozos(response);
            } catch (error) {
                console.error('Error fetching mozos:', error);
            }
        };

        fetchMozos();
    }, []);

    const onSubmit = async (data) => {
        try {
            const response = await mesasService.updateMesa(nmesa, idResto, data);
            console.log('Mesa actualizada:', response);
            alert('Mesa actualizada exitosamente');
            navigate('/consultar-mesas');
        } catch (error) {
            console.error('Error al actualizar la mesa:', error);
            alert('Error al actualizar la mesa. Consulte la consola para más detalles.');
        }
    };

    if (!mesa || mozos.length === 0) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <div className="container mt-5">
                <h2>Actualizar Mesa</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="cantPersonas" className="form-label">Cantidad de Personas:</label>
                        <input
                            type="number"
                            className={`form-control ${errors.cantPersonas ? 'is-invalid' : ''}`}
                            id="cantPersonas"
                            {...register('cantPersonas', { required: true })}
                        />
                        {errors.cantPersonas && <div className="invalid-feedback">Cantidad de personas es requerida.</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="idMozo" className="form-label">Mozo:</label>
                        <select
                            className={`form-control ${errors.idMozo ? 'is-invalid' : ''}`}
                            id="idMozo"
                            {...register('idMozo', { required: true })}
                        >
                            <option value="">Seleccione un mozo</option>
                            {mozos.map(mozo => (
                                <option key={mozo.idMozo} value={mozo.idMozo}>
                                    {mozo.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.idMozo && <div className="invalid-feedback">Mozo es requerido.</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="estaLibre" className="form-label">¿Está Libre?</label>
                        <select
                            className={`form-control ${errors.estaLibre ? 'is-invalid' : ''}`}
                            id="estaLibre"
                            {...register('estaLibre', { required: true })}
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="true">Sí</option>
                            <option value="false">No</option>
                        </select>
                        {errors.estaLibre && <div className="invalid-feedback">Este campo es requerido.</div>}
                    </div>
                    <button type="submit" className="btn btn-primary me-2">Actualizar Mesa</button>
                    <Link to="/consultar-mesas" className="btn btn-secondary">Volver</Link>
                </form>
            </div>
        </div>
    );
}

