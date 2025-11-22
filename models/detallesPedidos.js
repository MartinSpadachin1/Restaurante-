import sequelize from "../data/db.js";
import DataTypes from "sequelize";
import Pedidos from "./pedidos.js";
import Items from "./items.js";

// Vamos a hacer este con todo

const DetallesPedidos =  sequelize.define("DetallePedidos",{
    idPedido:{
        type:DataTypes.INTEGER,
        field: "id_pedido",
        allowNull: false,
        primaryKey: true,
        references:{
            model:Pedidos,
            key:"codigo"
        },
    },
    idItem:{
        type:DataTypes.INTEGER,
        field: "id_item",
        allowNull: false,
        primaryKey: true,
        references:{
            model:Items,
            key:"idItem"
        }
    },
    cantidad:{
        type: DataTypes.INTEGER,
        field: "cantidad",
    },
    precioUnitario:{
        type: DataTypes.FLOAT,
        field: "precio_unitario"
    },
},{
    "timestamps": false,
    "tableName": "DetallesPedidos"
})

// Asociaciones


// Del Pedido: 1 Pedido tiene 1..* DetallePedido - Un Detalle corresponde a un Pedido

DetallesPedidos.belongsTo(Pedidos, { foreignKey : 'idPedido', onUpdate: 'CASCADE', onDelete: 'CASCADE' });

// Del Item: 1 DetallePedido tiene 1 Item - Un Detalle corresponde a un Ítem

DetallesPedidos.belongsTo(Items, { foreignKey : 'idItem', onUpdate: 'CASCADE', onDelete: 'CASCADE' });

export default DetallesPedidos;