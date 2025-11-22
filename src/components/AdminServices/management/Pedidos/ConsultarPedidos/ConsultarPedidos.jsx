import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TablaPedidos from './TablaPedidos/TablaPedidos.jsx';
import pedidosService from '../../../../../services/pedidos.services';
import restaurantesService from '../../../../../services/restaurantes.services.js';
import { useForm } from "react-hook-form";
import mesasService from '../../../../../services/mesas.services.js';

export default function ConsultarPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [restos, setRestos] = useState([]);
  //const idRestoLoggeado = 1; //suponemos que es el 1
  const { register, handleSubmit} = useForm()

  useEffect(() => {
    fetchPedidos();
    fetchRestos();
  }, []);

  const fetchPedidos = async () => {
    try {
      // REVISAR SI QUEREMOS TRAER SOLO LOS FINALIZADOS O TODOS
      //const response = await pedidosService.getPedidosFinalizados(idRestoLoggeado);
      const response = await pedidosService.getAllPedidos();
      setPedidos(response);
    } catch (error) {
      console.error('Error fetching pedidos:', error);
    }
  };

  const fetchRestos = async () => {
    try {
      const restos = await restaurantesService.getAllRestaurantes();
      setRestos(restos);
    } catch (error) {
      console.error('Error fetching restos:', error);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    const pedidosFiltrados = await pedidosService.getPedidosFiltrados(data);
    setPedidos(pedidosFiltrados);
  }

  return (
    <div>
      <div className="container mt-5">
        <h2>Gestión de Pedidos</h2>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
          <Link to="/pedidos" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left"></i> Volver
          </Link>
        </div>
        <p>Seleccione una acción para gestionar los Pedidos.</p>

        <div className="mt-4">
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="resto" className="form-label">Restaurante: </label>
                <select id="resto" className="form-select" {...register("idResto")}>
                  <option key="0" value="0">Todos</option>
                  {restos.map((resto) => (
                    <option key={resto.idResto} value={resto.idResto}>
                        {resto.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="fechaCreacionDesde" className="form-label">Desde: </label>
                <input
                    type="date"
                    className="form-control"
                    id="fechaCreacionDesde"
                    {...register("fechaCreacionDesde")}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="fechaCreacionHasta" className="form-label">Hasta: </label>
                <input
                    type="date"
                    className="form-control"
                    id="fechaCreacionHasta"
                    {...register("fechaCreacionHasta")}
                />
              </div>

              <div className="mb-4">
                <input className="form-check-input" type="checkbox" id="finalizados" {...register("noFinalizados")} />
                <label className="form-check-label" htmlFor="noFinalizados">&nbsp;Incluir pedidos no finalizados</label>
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Filtrar
                </button>
              </div>
            </form>
          </div>
          
          <h3>Listado de Pedidos</h3>
          <TablaPedidos pedidos={pedidos} fetchPedidos={fetchPedidos} /> {/* Pasar fetchPedidos como prop */}
        </div>
      </div>
    </div>
  );
}
