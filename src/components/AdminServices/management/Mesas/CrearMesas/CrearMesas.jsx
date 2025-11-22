import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import mesasService from '../../../../../services/mesas.services';
import mozosService from '../../../../../services/mozos.services';

export default function CrearMesa() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [mozos, setMozos] = useState([]);

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

  // Función asincrónica para obtener el último ID de mesa
  const obtenerUltimoIdMesa = async (idResto) => {
    try {
      const res = await mesasService.getUltimaMesaByID(idResto);
      return res; // Devuelve el número de mesa obtenido (asumo que res.data contiene el número de mesa)
    } catch (error) {
      console.error('Error al obtener el último ID de mesa:', error);
      throw new Error('Error al obtener el último ID de mesa');
    }
  };

  const onSubmit = async (data) => {
    try {
      const idResto = parseInt(data.idResto); // Aseguramos que idResto sea un número entero
      const nmesa = await obtenerUltimoIdMesa(idResto) + 1; // Obtenemos el último ID de mesa de manera asincrónica
      console.log('Número de mesa obtenido:', nmesa); // Verificar el número de mesa en la consola

      const nuevaMesa = { ...data, nmesa }; // Creamos un nuevo objeto de mesa con el número de mesa obtenido
      await mesasService.postNuevaMesa(nuevaMesa); // Llamamos al servicio para crear la nueva mesa
      alert('Mesa creada exitosamente');
      navigate('/consultar-mesas');
    } catch (error) {
      console.error('Error al crear la mesa:', error);
      alert('Error al crear la mesa. Consulte la consola para más detalles.');
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <h2>Crear Mesa</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="idResto" className="form-label">ID de Restaurante</label>
            <input
              type="number"
              className={`form-control ${errors.idResto ? 'is-invalid' : ''}`}
              id="idResto"
              {...register('idResto', { required: true })}
            />
            {errors.idResto && <div className="invalid-feedback">ID de restaurante es requerido.</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="cantPersonas" className="form-label">Cantidad de Personas</label>
            <input
              type="number"
              className={`form-control ${errors.cantPersonas ? 'is-invalid' : ''}`}
              id="cantPersonas"
              {...register('cantPersonas', { required: true })}
            />
            {errors.cantPersonas && <div className="invalid-feedback">Cantidad de personas es requerida.</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="idMozo" className="form-label">Mozo</label>
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
          <button type="submit" className="btn btn-primary me-2">Crear Mesa</button>
          <Link to="/mesas" className="btn btn-secondary">Volver</Link>
        </form>
      </div>
    </div>
  );
}
