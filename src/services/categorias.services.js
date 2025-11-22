import axios from "axios";
const baseURL = "http://localhost:3001/api/categorias";

// GET - ALL

const getAllCategorias = async () => {
  try {
    const res = await axios.get(`${baseURL}`);
    return res.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
// GET-BY-ID
const getCategoriaByID = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// GET con FILTRO:

const getCategoriasByFilter = async (filterText) => {
  const response = await axios.get(`${baseURL}?nombre=${filterText}`);
  return response.data;
};



// POST

const postNuevaCategoria = async (categoria) => {
  try {
    const respuesta = await axios.post(`${baseURL}`, categoria);
    return respuesta.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// DELETE

const deleteCategoriaPorId = async (categoria) => {
  try {
    const respuesta = await axios.delete(`${baseURL}/${categoria.idCat}`);
    return respuesta.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// UPDATE - Éste lo implementan uds.
const updateCategoria = async (idCat, nombre) => {
  try {
    const respuesta = await axios.put(`${baseURL}/${idCat}`, { nombre });
    return respuesta.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Lanzar el error para que pueda ser manejado por el código que llama a esta función
  }
};
const categoriasService = {
  getAllCategorias,
  postNuevaCategoria,
  deleteCategoriaPorId,
  getCategoriaByID,
  updateCategoria,
  getCategoriasByFilter
};

export default categoriasService;
