import DetallesPedidos from "../models/detallesPedidos.js"; // El .js!!!!!!!!!!!
import { Op } from "sequelize";

// GET DE TODOS

export const getAllDetalles = async () => {

    const conseguirDetalles = await DetallesPedidos.findAll();
    return conseguirDetalles;

}

// GET TODOS LOS DETALLES SEGÚN EL idPedido SOLICITADO

export const getDetallesPedidoEspecifico = async ( idPedido ) => {
    return await DetallesPedidos.findAll({

        where : {
            idPedido : idPedido
        }

    });

}

// GET DETALLE ESPECIFICO
export const getDetalleEspecifico = async ( idPedido, idItem ) => {
    console.log(idPedido)
    return await DetallesPedidos.findOne({
        where : {
            idPedido : idPedido,
            idItem: idItem
        }
    });
}


// POST - CREAR UN DETALLE DE PEDIDO...

export const crearDetallePedido = async ( datos ) => {
    return DetallesPedidos.create(datos);
}

// UPDATE - ACTUALIZAR UN DETALLE DE PEDIDO...

export const actualizarDetallePedido = async ( datos, idPedidoSeleccionado, idItemSeleccionado ) => {

    const detallePedidoEncontrado = await DetallesPedidos.findOne({ where : { idPedido : idPedidoSeleccionado, idItem : idItemSeleccionado }});

    if (detallePedidoEncontrado) {
        return DetallesPedidos.update( datos, { where : { idPedido : idPedidoSeleccionado, idItem : idItemSeleccionado }});
    }

}


// DELETE - BORRAR UN DETALLE DE PEDIDO...

export const borrarDetallePedido = async ( idPedidoSeleccionado, idItemSeleccionado ) => {

    const detallePedidoEncontrado = await DetallesPedidos.findOne({ where : { idPedido : idPedidoSeleccionado, idItem : idItemSeleccionado }});

    if (detallePedidoEncontrado) {
        return DetallesPedidos.destroy({ where : { idPedido: idPedidoSeleccionado, idItem: idItemSeleccionado }})
    }



}