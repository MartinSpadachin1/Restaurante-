import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import categoriasService from '../../../../../services/categorias.services';
export default function CrearCategorias() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await categoriasService.postNuevaCategoria(data);
      console.log('Nueva categoría creada:', response);
      alert('Categoria creada exitosamente');
      navigate('/consultar-categorias');
      reset();
    } catch (error) {
      console.error('Error al crear la categoría:', error);
      alert('Error al crear la categoria. Consulte la consola para más detalles.');
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <h2>Crear Categoría</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <button type="submit" className="btn btn-primary me-2">Crear Categoria</button>
          <Link to="/categorias" className="btn btn-secondary">Volver</Link>
        </form>
      </div>
    </div>
  );
}
