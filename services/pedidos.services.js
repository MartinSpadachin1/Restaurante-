import { Op } from "sequelize";
import Pedidos from "../models/pedidos.js"

export const getAllPedidos = async () => {
    const pedidos = await Pedidos.findAll({
        order: [["fechahora_cobro", "DESC"]],
        limit: 15
    });
    return pedidos
};

export const getPedidosFiltrados = async (idResto, nmesa, fechaInf, fechaSup, noFinalizados) => {
    const whereOptions = {};
    if (idResto) {
        whereOptions.idResto = idResto
    }
    // Como los numeros de mesa dependen del resto, si o si debemos tener el idResto
    if (nmesa && !idResto) {
        throw new Error("Error, falta idResto")
    }; 
    if (nmesa && idResto) {
        whereOptions.nmesa = nmesa
    }
    if (fechaInf && fechaSup) {
        //const dateInf = Date(fechaInf);
        //const dateSup = Date(fechaSup);
        whereOptions.fechaHoraCreacion = {
            [Op.between]: [fechaInf, fechaSup]
        };
    }
    if (fechaInf && !fechaSup) {
        //const dateInf = Date(fechaInf);
        whereOptions.fechaHoraCreacion = {
            [Op.gt]: [fechaInf]
        };
    }
    if (!fechaInf && fechaSup) {
        //const dateInf = Date(fechaInf);
        whereOptions.fechaHoraCreacion = {
            [Op.lt]: [fechaSup]
        };
    }
    if (noFinalizados == 'false') {
        console.log(noFinalizados)
        whereOptions.fechaHoraCobro = {
            [Op.not]: null
        };
    }

    const pedidosFiltrados = await Pedidos.findAll({
        where: whereOptions,
        order: [["fechahora_creacion", "DESC"]],
    })
    return pedidosFiltrados;
}

export const getPedidosEsteResto = async (idResto) => {
    const pedidosResto = await Pedidos.findAll({
        where: {
            idResto: idResto
        }
    })
    return pedidosResto;
};

export const getPedidoByCodigo = async (codigoPedido) => {
    const pedido = await Pedidos.findByPk(codigoPedido);
    return pedido
};


export const getPedidosMesaResto = async (nmesa, idResto) => {
    if (!nmesa && !idResto) {
        return await getAllPedidos();
    };

    if (!nmesa && idResto) {
        return await getPedidosEsteResto(idResto);
    };

    // Como los numeros de mesa dependen del resto, si o si debemos tener el idResto
    if (nmesa && !idResto) {
        throw new Error("Error, falta idResto")
    }; 

    if (nmesa && idResto) {
        const pedidosFiltrados = await Pedidos.findAll({
            where: {
                nmesa: nmesa,
                idResto: idResto
            }
        })
        return pedidosFiltrados
    }
};

/*
export const getPedidosRangoFechaCreacion = async (fechaInf, fechaSup) => {
    const pedidos = await getAllPedidos();
    if (!fechaInf && !fechaSup) {
        return await pedidos;
    }

    const dateInf = new Date(fechaInf);
    const dateSup = new Date(fechaSup);

    const pedidosRangoFechas = pedidos.filter(p => dateInf <= (new Date(p.fechaHoraCreacion)) && (new Date(p.fechaHoraCreacion)) <= dateSup );
    return pedidosRangoFechas;
};
*/

export const createPedido = async (data) => {
    const pedidoCreado = Pedidos.create(data);
    return pedidoCreado;
}; 

export const updatePedido = async (codigoPedido, data) => {
    const pedido = await Pedidos.findByPk(codigoPedido);

    if (!pedido) {
        throw new Error("Error, no existe ese pedido")
    };

    return Pedidos.update( data, { where : {
        codigo : codigoPedido }
    });
};

export const deletePedido = async (idPedido) => {
    const pedido = await Pedidos.findByPk(idPedido);

    if (!pedido) {
        throw new Error("Error, no existe ese pedido")
    };

    return pedido.destroy();
};

