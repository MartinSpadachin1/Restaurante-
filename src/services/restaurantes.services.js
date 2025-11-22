import axios from "axios";
const baseURL = "http://localhost:3001/api/restaurantes";

// GET - ALL

const getAllRestaurantes = async () => {
  try {
    const res = await axios.get(`${baseURL}`);
    return res.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// GET -BY ID

const getRestauranteByID = async (idResto) => {
  try {
    const res = await axios.get(`${baseURL}/${idResto}`);
    return res.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// POST

const postNuevoRestaurante = async (restaurante) => {
  const respuesta = await axios.post(`${baseURL}`, restaurante);
  return respuesta.data;
};

// DELETE

const deleteRestaurante = async ( idResto ) => {
  const respuesta = await axios.delete(`${baseURL}/${idResto}`);
  return respuesta.data;
};

// UPDATE

const updateRestaurante = async (idResto, datosResto) => {
  try {
    const respuesta = await axios.put(
      `${baseURL}/${idResto}`,
      datosResto
    );
    return respuesta.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};


const restaurantesService = {
  getAllRestaurantes,
  getRestauranteByID,
  deleteRestaurante,
  updateRestaurante,
  postNuevoRestaurante
};

export default restaurantesService;
