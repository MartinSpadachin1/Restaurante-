import axios from "axios";
const baseURL = "http://localhost:3001/api/items";

// GET - ALL

const getAllItems = async () => {
  try {
    const res = await axios.get(`${baseURL}`);
    return res.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
// GET-BY-ID
const getItemByID = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

//GET BY FILTERS - IDCAT
const getItemByCategoria = async (idCat) => {
  try {
    const res = await axios.get(`${baseURL}/byFilters/${idCat}`);
    return res.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// POST

const postNuevoItem = async (items) => {
  try {
    const respuesta = await axios.post(`${baseURL}`, items);
    return respuesta.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// DELETE

const deleteItemPorId = async (item) => {
  try {
    const respuesta = await axios.delete(`${baseURL}/${item.idItem}`);
    return respuesta.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// UPDATE - Éste lo implementan uds.
const updateItem = async (idItem, item) => {
  try {
    const respuesta = await axios.put(`${baseURL}/${idItem}`, item);
    return respuesta.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Lanzar el error para que pueda ser manejado por el código que llama a esta función
  }
};
const itemsService = {
  getAllItems,
  postNuevoItem,
  deleteItemPorId,
  getItemByID,
  updateItem,
  getItemByCategoria
};

export default itemsService;
