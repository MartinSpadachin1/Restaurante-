import axios from "axios";
const baseURL = 'http://localhost:3001/api/mozos'


// GET - ALL

const getAllMozos = async () => {
    const respuesta = await axios.get(`${baseURL}`);
    return respuesta.data;
}

// GET -BY ID

const getMozoByID = async (idMozo) => {
    try {
      const res = await axios.get(`${baseURL}/${idMozo}`);
      return res.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

// GET con FILTRO:

const getMozosByFilter = async (filterText) => {
  const response = await axios.get(`${baseURL}?nombre=${filterText}`);
  return response.data;
};


// POST

const postNuevoMozo = async ( mozo ) => {

    const respuesta = await axios.post(`${baseURL}`, mozo);
    return respuesta.data;

}

// DELETE

const deleteMozoPorId = async ( mozo ) => {

    const respuesta = await axios.delete(`${baseURL}/${mozo.idMozo}`);
    return respuesta.data;

}

// UPDATE 

const updateMozo = async (idMozo, datosMozo) => {
    try {
      const respuesta = await axios.put(`${baseURL}/${idMozo}`, datosMozo);
      return respuesta.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };


const mozosService = { getAllMozos, getMozosByFilter, postNuevoMozo, deleteMozoPorId, updateMozo, getMozoByID };

export default mozosService;
