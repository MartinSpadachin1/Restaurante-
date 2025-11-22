import Mozos from "../models/mozos.js";
import { Op } from "sequelize";

// GET all - Conseguir todos los datos de todos los mozos

export const getAllMozos = async () => {

    const conseguirMozos = await Mozos.findAll();
    return conseguirMozos;

}

// GET mozo - Conseguir todos los datos del mozo segun su id

export const getMozoEspecifico = async ( idMozo ) => {
    return await Mozos.findByPk(idMozo);
}

// GET mozos con filtros... - Conseguir listar mozos según nombre...
export const getMozosByFilter = async (filterText) => {
    try {
        // Apartado de inicialización...
        const filterConditions = [];

        // Apartado de filtros...
        if (filterText) {
            filterConditions.push({
                nombre: { [Op.like]: `%${filterText}%` }
            });
        }

        // Verificamos que al menos, un filtro esté presente...
        if (filterConditions.length === 0) {
            return { error: "Se necesita al menos pasar un parámetro de filtro..." };
        }

        console.log("Filter conditions:", filterConditions);

        // Ahora hacemos un .findAll() pero con las condiciones de filtrado...
        const mozosFiltrados = await Mozos.findAll({
            where: {
                [Op.and]: filterConditions
            },
            order: [["nombre", "ASC"]]
        });

        return mozosFiltrados;
    } catch (error) {
        console.error("Error: " + error);
        return { error: "Ha ocurrido un error al obtener los mozos." };
    }
};



// POST - Crear un Mozo

export const crearMozo = async ( datosMozo ) => {
    return Mozos.create(datosMozo);
}

// UPDATE - Actualizar datos del Mozo...

export const actualizarMozo = async ( datosMozo, idMozo ) => {

    const detalleMozo = await Mozos.findOne({ where : { idMozo : idMozo }});

    if (detalleMozo) {
        return Mozos.update( datosMozo, { where : { idMozo : idMozo }});
    }

}


// DELETE - Borrar un Mozo...

export const borrarMozo = async ( idMozo ) => {

    const detalleMozo = await Mozos.findOne({ where : { idMozo : idMozo }});

    if (detalleMozo) {
        return Mozos.destroy({ where : { idMozo: idMozo }})
    }
}
