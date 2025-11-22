import axios from "axios";
const baseURL = "http://localhost:3001/api/mesas";

// GET - ALL

const getAllMesas = async () => {
  const respuesta = await axios.get(`${baseURL}`);
  return respuesta.data;
};

// GET DE RESTO
const getAllMesasDeResto = async (idResto) => {
  try {
    const res = await axios.get(`${baseURL}/deResto/${idResto}`);
    return res.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// GET -BY ID

const getMesaByID = async (idMesa, idRes) => {
  try {
    const res = await axios.get(`${baseURL}/${idMesa}/${idRes}`);
    return res.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
//GET ultima mesa creada de restaurante
const getUltimaMesaByID = async (idRes) => {
  try {
    const res = await axios.get(`${baseURL}/deResto/ultimo/${idRes}`);
    return res.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
// POST

const postNuevaMesa = async (mesa) => {
  const respuesta = await axios.post(`${baseURL}`, mesa);
  return respuesta.data;
};

// DELETE

const deleteMesaPorId = async ( idmesa, idRes ) => {
  const respuesta = await axios.delete(`${baseURL}/${idmesa}/${idRes}`);
  return respuesta.data;
};

// UPDATE

const updateMesa = async (idMesa, idRes, datosMesa) => {
  try {
    const respuesta = await axios.put(
      `${baseURL}/${idMesa}/${idRes}`,
      datosMesa
    );
    return respuesta.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// GET BY FILTER

const obtenerMesasFiltradas = async(mozo, resto)=>{
  try{
  const res = await axios.get(`${baseURL}?idMozo=${mozo}&idResto=${resto}`);
  return res.data
  }
  catch(error){
      console.error("Error:",error)
  }
}


const mesasService = {
  getAllMesas,
  postNuevaMesa,
  deleteMesaPorId,
  updateMesa,
  getMesaByID,
  getUltimaMesaByID, 
  getAllMesasDeResto,
  obtenerMesasFiltradas
};

export default mesasService;
