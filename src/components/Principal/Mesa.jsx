import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pedidosService from "../../services/pedidos.services";
import mozosService from "../../services/mozos.services";
import mesasService from "../../services/mesas.services";
import moment from 'moment-timezone';

export const Mesa = ({ idResto, mesa, pedidos, fetchPedidos }) => {
  const [mozoName, setMozoName] = useState("");
  console.log(pedidos)
  const pedido = pedidos.find((pedido) => pedido.nmesa === mesa.nmesa);
  const idRestoLoggeado = idResto;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMozos = async () => {
      const data = await mozosService.getMozoByID(mesa.idMozo);
      setMozoName(data.nombre);
    };

    fetchMozos();
  }, [mesa.idMozo]);

  const handleFinalizar = async () => {
    const fechaHoraActual = new Date();
    await pedidosService.updatePedido(pedido.codigo, {
      fechaHoraCobro: moment().tz('America/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss'),
    });
    // Actualizamos la mesa
    const aux = await mesasService.updateMesa(mesa.nmesa, mesa.idResto, {
      estaLibre: true,
    });
    // Actualizamos el total del pedido
    const res = await pedidosService.registrarTotalPedido(pedido.codigo);
    alert('Se ha finalizado el pedido correctamente')
    fetchPedidos();
  };

  const handleComenzar = async () => {
    const res = await pedidosService.postNuevoPedido({
      idResto: idRestoLoggeado,
      nmesa: mesa.nmesa,
    });
    const aux = await mesasService.updateMesa(mesa.nmesa, mesa.idResto, {
      estaLibre: false,
    });
    fetchPedidos();
    navigate(`/modificar-pedidos/${res.codigo}`);
  };

  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body text-center">
          <h1 className="display-4">Mesa {mesa.nmesa}</h1>
          <p>Mozo: {mozoName} </p>
          <p>Cantidad de personas: {mesa.cantPersonas}</p>
          {pedido ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h2>#Pedido {pedido.codigo}</h2>
              <div
                className="d-flex justify-content-center"
                style={{ width: "12rem" }}
              >
                <Link
                  to={`/consultar-detalles/${pedido.codigo}`}
                  className="btn btn-primary me-2"
                  style={{ width: "10rem" }}
                >
                  Consultar pedido
                </Link>
                <Link
                  to={`/modificar-pedidos/${pedido.codigo}`}
                  className="btn btn-primary me-2"
                  style={{ width: "10rem" }}
                >
                  Modificar pedido
                </Link>
              </div>
              <button
                className="btn btn-danger mt-2"
                onClick={handleFinalizar}
                style={{ width: "10rem" }}
              >
                Finalizar pedido
              </button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={handleComenzar}>
              Comenzar pedido
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
