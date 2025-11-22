import Restaurantes from "../models/restaurantes.js";

const SALTROUNDS = 10;

// ABM

// GET DE TODO

export const getrestaurantes = async () => {
    const restaurantes = await Restaurantes.findAll();
    return restaurantes
}
// GET BY ID

export const getRestauranteById = async(idResto) => {
    const restos = await Restaurantes.findByPk(idResto)
    return restos
}

// POST --> Registrar un restaurante


export const registrarRestaurante = async ( datos ) => {
    return Restaurantes.create(datos);
}


// UPDATE --> Actualizar un restaurante segun su id


export const actualizarRestaurante = async ( datos, idRestoSeleccionado ) => {

    const RestoEncontrado = await Restaurantes.findOne({ where : { idResto : idRestoSeleccionado }});

    if (RestoEncontrado) {
        return Restaurantes.update( datos, { where : { idResto : idRestoSeleccionado}});
    }

}


// DELETE --> Borrar un restaurante 
// Dudas : Cuando borramos un restaurante se borra todo lo que contenga como x ejemplo sus mesas ?
// o no podemos eliminar un restaurante que tenga cosas adentro ???????

export async function borrarRestaurante(idRes){
    const existe = await Restaurantes.findByPk(idRes)
    if(existe){
         return Restaurantes.destroy({where:{idResto: idRes}})
    }
}




