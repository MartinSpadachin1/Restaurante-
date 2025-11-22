import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import mozosService from '../../../../../services/mozos.services';

function CrearMozos() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await mozosService.postNuevoMozo(data);
      console.log('Nuevo mozo creado:', response);
      alert('Mozo creado exitosamente');
      navigate('/consultar-mozos');
      reset();
    } catch (error) {
      console.error('Error al crear el mozo:', error);
      alert('Error al crear el mozo. Consulte la consola para más detalles.');
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <h2>Crear Mozo</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="fechaIngreso" className="form-label">Fecha de Ingreso</label>
            <input
              type="date"
              className={`form-control ${errors.fechaIngreso ? 'is-invalid' : ''}`}
              id="fechaIngreso"
              {...register('fechaIngreso', { required: true })}
            />
            {errors.fechaIngreso && <div className="invalid-feedback">Fecha de ingreso es requerida.</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
              id="nombre"
              {...register('nombre', { required: true, maxLength: 30 })}
            />
            {errors.nombre && <div className="invalid-feedback">Nombre es requerido y debe tener un máximo de 30 caracteres.</div>}
          </div>
          <button type="submit" className="btn btn-primary me-2">Crear Mozo</button>
          <Link to="/mozos" className="btn btn-secondary">Volver</Link>
        </form>
      </div>
    </div>
  );
}

export default CrearMozos;
