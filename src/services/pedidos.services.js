import axios from "axios";
import detallesService from "./detallesPedidos.services.js";
import mesasService from "./mesas.services.js";
const baseURL = "http://localhost:3001/api/pedidos";


// GET - ALL
const getAllPedidos = async () => {
  try {
    const res = await axios.get(`${baseURL}`);
    const pedidos = res.data;
    await Promise.all(pedidos.map(async (pedido) => {
      // Si tiene el total como null, es un pedido no finalizado y lo calculamos segun sus detalles
        if (!pedido.total) {
          pedido.total = await getTotalPedido(pedido.codigo);
        }
      }));
    return pedidos;
  } catch (error) {
    console.error("Error:", error);
  }
};

// GET-BY-ID
const getPedidoByCodigo = async (codigo) => {
  try {
    const res = await axios.get(`${baseURL}/${codigo}`);
    const pedido = res.data;
    // Si tiene el total como null, es un pedido no finalizado y lo calculamos segun sus detalles
    if (!pedido.total) {
      pedido.total = await getTotalPedido(pedido.codigo);
    }
    return pedido;
  } catch (error) {
    console.error("Error:", error);
  }
};

// POST
const postNuevoPedido = async (pedido) => {
  try {
    const respuesta = await axios.post(`${baseURL}`, pedido);
    return respuesta.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// DELETE
const deletePedidoPorCodigo = async (codigo) => {
  try {
    const respuesta = await axios.delete(`${baseURL}/${codigo}`);
    return respuesta.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// UPDATE
const updatePedido = async (codigo, pedido) => {
  try {
    if (pedido.fechaHoraCobro) {
      registrarTotalPedido(codigo);
      mesasService.updateMesa(pedido.nmesa, pedido.idResto, {estaLibre: true});
    }
    const respuesta = await axios.put(`${baseURL}/${codigo}`, pedido);
    return respuesta.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Lanzar el error para que pueda ser manejado por el código que llama a esta función
  }
};


// GET PEDIDOS DE RESTO
const getPedidosDeResto = async (idResto) => {
  try {
      const res = await axios.get(`${baseURL}/byFilters?idResto=${idResto}`);
      const pedidos = res.data;
      // Si tiene el total como null, es un pedido no finalizado y lo calculamos segun sus detalles
      await Promise.all(pedidos.map(async (pedido) => {
          pedido.total = await getTotalPedido(pedido.codigo);
        }));
      return pedidos;
    } catch (error) {
      console.error("Error:", error);
  }
}


const getPedidosFiltrados = async (filtro) => {
  const params = {}
  
  if (filtro.idResto != '0')
    params.idResto = filtro.idResto;
  if (filtro.nmesa) 
    params.nmesa = filtro.nmesa;
  if (filtro.fechaCreacionDesde)
    params.fechaInf = filtro.fechaCreacionDesde;
  if (filtro.fechaCreacionHasta)
    params.fechaSup = filtro.fechaCreacionHasta
  if (!filtro.noFinalizados)
    params.noFinalizados = 'false'
  
  const response = await axios.get(`${baseURL}/byFilters`, { params });
  const pedidos = response.data;
  await Promise.all(pedidos.map(async (pedido) => {
    // Si tiene el total como null, es un pedido no finalizado y lo calculamos segun sus detalles
      if (!pedido.total) {
        pedido.total = await getTotalPedido(pedido.codigo);
      }
    }));
  return pedidos;

};


// GET PEDIDOS NO FINALIZADOS
const getPedidosNoFinalizados = async (idResto) => {
  const pedidos = await getPedidosDeResto(idResto);
  const pedidosNoFinalizados = pedidos.filter( (pedido) => ! pedido.fechaHoraCobro);
  return pedidosNoFinalizados;
};

// GET PEDIDOS  FINALIZADOS
const getPedidosFinalizados = async (idResto) => {
  const pedidosFinalizados = await axios.get(`${baseURL}/byFilters?idResto=${idResto}&noFinalizados=false`);
  return pedidosFinalizados.data;
};


const getTotalPedido = async (codigo) => {
    try {
        const detalles = await detallesService.getDetallesDePedido(codigo);
        let total = 0;
        detalles.forEach( (detalle) => {
            total = total + detalle.subTotal;
        })
        return total;
    } catch (error) {
        console.error("Error:", error);
    }
  };


const registrarTotalPedido = async (codigo) => {
  try {
    const total = await getTotalPedido(codigo);
    const respuesta = await axios.put(`${baseURL}/${codigo}`, {total: total});
    return respuesta.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Lanzar el error para que pueda ser manejado por el código que llama a esta función
  }
}

const pedidosService = {
  getAllPedidos,
  postNuevoPedido,
  deletePedidoPorCodigo,
  getPedidoByCodigo,
  updatePedido,
  getTotalPedido,
  getPedidosDeResto,
  getPedidosNoFinalizados,
  getPedidosFinalizados,
  registrarTotalPedido,
  getPedidosFiltrados
};

export default pedidosService;
