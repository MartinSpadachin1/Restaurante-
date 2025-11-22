import Mesas from "../models/mesas.js";
import sequelize from "../data/db.js"; // PONERLE EL .JS A TODOOOOOOOOOO
import { Op, where } from "sequelize";

// Método findAll para conseguir y traer todos los registros...
// Ahora lo modificamos :)

//Obtener todas las mesas
export async function obtenerMesas(){
    return Mesas.findAll()
}
//Obtener id de la ultima mesa
export const obtenerUltimoIdYSumarUno = async (idRes) => {
    try {
        // Consultar el último ID de mesa existente
        const ultimaMesa = await Mesas.findOne({
            where: { idResto: idRes },
            order: [['nmesa', 'DESC']] // Ordena por nmesa en orden descendente
        });

        // Si no hay mesas aún, empezar desde 1
        if (!ultimaMesa) {
            return 1; // Cambiado de 0 a 1 para comenzar desde el número 1
        }
        // Sumar uno al último ID de mesa encontrado
        const siguienteId = ultimaMesa.nmesa;

        return siguienteId;
    } catch (error) {
        console.error('Error al obtener el último ID de mesa:', error);
        throw new Error('Error al obtener el último ID de mesa');
    }
};
//Obtener todas las mesas de un resto
export async function obtenerMesasDeResto(idResto){
    return Mesas.findAll({
        where: {
            idResto: idResto
        }
    })
}

//Obtener una mesa en particular 
export async function obtenerMesa(idMesa, idRes){
    return await Mesas.findOne({where:{nmesa: idMesa, idResto: idRes}})    
}

//Actualizar una mesa 
export async function actualizarMesa(idMesa,idRes,datos){
    const existe = await Mesas.findOne({where:{nmesa: idMesa, idResto: idRes}})
    if(existe){
        return Mesas.update(datos,{where:{nmesa: idMesa,idResto: idRes}});
    }
}

//Crear una mesa
export async function crearMesa(datos){
    return Mesas.create(datos)
}

//Eliminar una mesa
export async function borrarMesa(idMesa, idRes) {
    try {
        console.log(`Intentando eliminar mesa con nmesa ${idMesa} y idResto ${idRes}`);
        const mesa = await Mesas.findOne({ where: { nmesa: idMesa, idResto: idRes } });
        console.log('Mesa encontrada:', mesa);

        if (!mesa) {
            throw new Error(`La mesa ${idMesa} del restaurante ${idRes} no existe`);
        }

        console.log(`Mesa ${idMesa} del restaurante ${idRes} eliminada correctamente`);
        return Mesas.destroy({ where: { nmesa: idMesa, idResto: idRes } });

        
    } catch (error) {
        console.error('Error al intentar eliminar la mesa:', error);
        throw new Error(`Error al intentar eliminar la mesa: ${error.message}`);
    }
}

// Mesas por restaurante --> FILTRO

export const getMesaByFilter = async (idMozo, idResto) => {
    try {
        const filterConditions = {};

        if (idMozo) {
            filterConditions.idMozo = idMozo;
        }

        if (idResto) {
            filterConditions.idResto = idResto;
        }

        // Verificar que al menos un filtro esté presente
        if (Object.keys(filterConditions).length === 0) {
            return { error: "At least one filter parameter must be provided." };
        }

        // Consultar la base de datos con las condiciones de filtro
        const mesas = await Mesas.findAll({
            where: filterConditions,
            order: [["nmesa", "DESC"]], // Corregido el formato del ordenamiento
        });

        return mesas;
    } catch (error) {
        return { error: error.message };
    }
};

