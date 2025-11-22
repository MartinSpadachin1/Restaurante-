import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import restaurantesService from '../../../../../services/restaurantes.services';


export default function CrearRestaurantes() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await restaurantesService.postNuevoRestaurante(data);
            console.log('Nuevo restaurante creado:', response);
            alert('Restaurante creado exitosamente');
            navigate('/consultar-restaurantes');
            reset();
        } catch (error) {
            console.error('Error al crear el restaurante', error);
            alert('Error al crear el restaurante. Consulte la consola para más detalles.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Crear Restaurante</h2>
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
                        <label htmlFor="horaApertura" className="form-label">Hora Apertura:</label>
                        <input
                            type="time"
                            className={`form-control ${errors.horaApertura ? 'is-invalid' : ''}`}
                            id="horaApertura"
                            {...register('horaApertura', { required: true })}
                        />
                        {errors.horaApertura && <div className="invalid-feedback">horaApertura es requerido.</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="horaCierre" className="form-label">Hora Cierre:</label>
                        <input
                            type="time"
                            className={`form-control ${errors.horaCierre ? 'is-invalid' : ''}`}
                            id="horaCierre"
                            {...register('horaCierre', { required: true })}
                        />
                        {errors.horaCierre && <div className="invalid-feedback">horaCierre es requerida y debe tener un máximo de 100 caracteres.</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="usuario" className="form-label">Usuario:</label>
                        <input
                            type="text"
                            className={`form-control ${errors.usuario ? 'is-invalid' : ''}`}
                            id="usuario"
                            {...register('usuario', { required: true })}
                        />
                        {errors.usuario && <div className="invalid-feedback">usuario es requerido.</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contraseña" className="form-label">Contraseña:</label>
                        <input
                            type="password"
                            className={`form-control ${errors.contraseña ? 'is-invalid' : ''}`}
                            id="contraseña"
                            {...register('contraseña', { required: true })}
                        />
                        {errors.contraseña && <div className="invalid-feedback">contraseña es requerida.</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="direc" className="form-label">Direccion:</label>
                        <input
                            type="text"
                            className={`form-control ${errors.direc ? 'is-invalid' : ''}`}
                            id="direc"
                            {...register('direc', { required: true })}
                        />
                        {errors.direc && <div className="invalid-feedback">direccion es requerida.</div>}
                    </div>
                    
                    <button type="submit" className="btn btn-primary me-2">Crear Restaurante</button>
                    <Link to="/restaurantes" className="btn btn-secondary">Volver</Link>
                </form>
        </div>
    );
}