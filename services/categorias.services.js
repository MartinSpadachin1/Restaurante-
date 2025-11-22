import Categorias from "../models/categorias.js";
import { Op } from "sequelize";

// GET DE TODOS

export const getAllCategorias = async () => {

    const conseguirCategorias = await Categorias.findAll();
    return conseguirCategorias;

}

// GET CATEGORÍA SEGÚN EL id ESPECIFICADO 

export const getCategoriaEspecifica = async ( idCategoria ) => {
    return await Categorias.findOne({

        where : {
            idCat : idCategoria
        }

    });

}


// GET categorias con filtros... - Conseguir listar categorias según nombre...
export const getCategoriasByFilter = async (filterText) => {
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
        const categoriasFiltradas = await Categorias.findAll({
            where: {
                [Op.and]: filterConditions
            },
            order: [["nombre", "ASC"]]
        });

        return categoriasFiltradas;
    } catch (error) {
        console.error("Error: " + error);
        return { error: "Ha ocurrido un error al obtener las categorias." };
    }
};

// POST - CREAR UNA CATEGORÍA...

export const crearCategoria = async ( datos ) => {
    return Categorias.create(datos);
}

// UPDATE - ACTUALIZAR UNA CATEGORÍA...

export const actualizarCategoria = async ( datos, idCategoria ) => {

    const categoriaEncontrada = await Categorias.findOne({ where : { idCat : idCategoria }});

    if (categoriaEncontrada) {
        return Categorias.update( datos, { where : { idCat : idCategoria }});
    }

}


// DELETE - BORRAR UNA CATEGORÍA...

export const borrarCategoria = async ( idCategoria ) => {

    const categoriaEncontrada = await Categorias.findOne({ where : { idCat : idCategoria }});

    if (categoriaEncontrada) {
        return Categorias.destroy({ where : { idCat: idCategoria }})
    }

}