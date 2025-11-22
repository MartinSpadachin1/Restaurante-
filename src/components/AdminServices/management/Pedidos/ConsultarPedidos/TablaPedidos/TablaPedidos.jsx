import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pedidosService from "../../../../../../services/pedidos.services.js";
import restaurantesService from "../../../../../../services/restaurantes.services.js";

export default function TablaPedidos({ pedidos, fetchPedidos }) {
    const [restos, setRestos] = useState([]);

    useEffect( () => {
        fetchRestos();
    }, [])

    const fetchRestos = async () => {
        try {
          const response = await restaurantesService.getAllRestaurantes();
          setRestos(response);
        } catch (error) {
          console.error('Error fetching restaurantes:', error);
        }
      };

  const handleDelete = async (pedidoId) => {
    try {
      await pedidosService.deletePedidoPorCodigo(pedidoId);
      fetchPedidos(); // Actualizar la lista de pedidos después de la eliminación
      alert("Pedido eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar el pedido:", error);
      alert(
        "Error al eliminar el pedido. Consulte la consola para más detalles."
      );
    }
  };

  function obtenerNombreResto(idResto) {
    if (restos) {
        const resto = restos.find(restaurante => restaurante.idResto == idResto);
        if (resto){
          return resto.nombre
        } else {
          return "Resto no identificado"
        }
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>CODIGO</th>
            <th>N° Mesa</th>
            <th>Nombre Restaurante</th>
            <th>Fecha Hora Creacion</th>
            <th>Fecha-Hora Cobro</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos && pedidos.map((pedido) => (
            <tr key={pedido.codigo}>
              <td>{pedido.codigo}</td>
              <td>{pedido.nmesa}</td>
              <td>{obtenerNombreResto(pedido.idResto)}</td>
              <td>{pedido.fechaHoraCreacion}</td>
              <td>{pedido.fechaHoraCobro}</td>
              <td>{pedido.total}</td>
              <td>
                <div className="d-flex">
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => handleDelete(pedido.codigo)}
                  >
                    Eliminar
                  </button>
                  <Link
                    className="btn btn-warning me-2"
                    to={`/actualizar-pedidos/${pedido.codigo}`}
                  >
                    Actualizar
                  </Link>
                  <Link
                    className="btn btn-secondary me-md-2"
                    to={`/consultar-detalles/${pedido.codigo}`}
                  >
                    Ver Detalles
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
