import axios from "axios";
const baseURL = "http://localhost:3001/api/detalles";

// GET ALL de un PEDIDO

const getDetallesDePedido = async (idPedido) => {
  try {
    const res = await axios.get(`${baseURL}/${idPedido}`);
    const detalles = res.data;
    detalles.forEach((detalle) => {
        detalle.subTotal = detalle.cantidad * detalle.precioUnitario;
    });
    return detalles;
  } catch (error) {
    console.error("Error:", error);
  }
};

// GET-BY-ID
const getUnDetalleDePedido = async (idPedido, idItem) => {
    try {
      const res = await axios.get(`${baseURL}/${idPedido}/${idItem}`);
      return res.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

// POST  
const postNuevoDetalle = async (detalle) => {
    try {
      const respuesta = await axios.post(`${baseURL}`, detalle);
      return respuesta.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
// DELETE  
const deleteDetalle = async (idPedido, idItem) => {
    try {
      const respuesta = await axios.delete(`${baseURL}/${idPedido}/${idItem}`);
      return respuesta.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
// UPDATE - Éste lo implementan uds.
const updateDetalle = async (idPedido, idItem, detalle) => {
    try {
      const respuesta = await axios.put(`${baseURL}/${idPedido}/${idItem}`, detalle);
      return respuesta.data;
    } catch (error) {
      console.error("Error:", error);
      throw error; // Lanzar el error para que pueda ser manejado por el código que llama a esta función
    }
  };
  
const detallesService = {
  getDetallesDePedido,
  getUnDetalleDePedido,
  postNuevoDetalle,
  updateDetalle,
  deleteDetalle
};

export default detallesService;
