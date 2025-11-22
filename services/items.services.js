import Items from "../models/items.js";

//Consulta a la base de datos para traer todas las filas de la tabla
//items
export async function obtenerItems(){
    return  Items.findAll({order:["nombre"]})
}

//Consulta para obtener un Item en particular
export async function obtenerItemPorId(idItem){
    return  Items.findByPk(idItem)
}

//Crear un nuevo item
export async function crearItem(data){
    return Items.create(data)
}

//Actualizar datos de un item en particular 
export async function actualizarItem (id,datos){
    const existe = await Items.findOne({where:{idItem:id}})
    if(existe){
    return Items.update(datos,{where:{idItem: id}})
    }      
}

//Borrar un Item en particular 
export async function borrarItem(id){
    const existe = await Items.findByPk(id)
    if(existe){
         return Items.destroy({where:{idItem: id}})
    }
}

export async function getItemCategoria(id){
    const existe = await Items.findOne({where:{categoria:id}});
    if(existe){
    return Items.findAll({where:{categoria:id}})}

    throw new Error("No hay items con esta categoría.")
    }

