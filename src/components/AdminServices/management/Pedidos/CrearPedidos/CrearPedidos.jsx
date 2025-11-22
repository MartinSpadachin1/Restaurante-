import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import pedidosService from '../../../../../services/pedidos.services.js';
import restaurantesService from '../../../../../services/restaurantes.services.js';


// REEMPLAZAR POR LAS MESAS DEL RESTO ELEGIDO
const mesas = [1,2,3,4,5,6,7,8,9,10]

export default function CrearPedidos() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [restos, setRestos] = useState([]);

  useEffect( () => {
    const fetchRestaurantes = async () => {
        const data = await restaurantesService.getAllRestaurantes();
        setRestos(data);
    }
    fetchRestaurantes();
  }, [])

  const onSubmit = async (data) => {
    try {
      const response = await pedidosService.postNuevoPedido(data);
      console.log('Nuevo pedido creado:', response);
      alert('Pedido creado exitosamente');
      navigate('/consultar-pedidos');
      reset();
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      alert('Error al crear el pedido. Consulte la consola para más detalles.');
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <h2>Crear Pedido</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
          <label htmlFor="idResto">Restaurante</label>
                <select className="form-select" id='idResto' {...register("idResto")}>
                    <option key={0}>Seleccione un resto...</option>
                    {restos && restos.map((resto) => (
                        <option key={resto.idResto} value={resto.idResto}>
                            {resto.nombre}
                        </option>
                    ))}
                </select>

            <label htmlFor="nmesas">N° Mesa</label>
                    <select className="form-select" id='nmesas' {...register("nmesa")}>
                        <option key={0}>Seleccione una mesa...</option>
                        {mesas.map((mesa) => (
                        <option key={mesa} value={mesa}>
                            {mesa}
                        </option>
                        ))}
                    </select>

            <label htmlFor="fechaHoraCobro" className="form-label">Fecha-Hora de Cobro:</label>
                <input
                    type="datetime-local"
                    className="form-control"
                    id="fechaHoraCobro"
                    {...register("fechaHoraCobro")}
                />
                        
          </div>
          <button type="submit" className="btn btn-primary me-2">Crear Pedido</button>
          <Link to="/pedidos" className="btn btn-secondary">Volver</Link>
        </form>
      </div>
    </div>
  );
}
